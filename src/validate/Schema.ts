/** @module validate */
/** @hidden */ 
let _ = require('lodash');

import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { ValidationException } from './ValidationException';
import { ObjectReader } from '../reflect/ObjectReader';
import { TypeMatcher } from '../reflect/TypeMatcher';
import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';

/**
 * Allows for the creation of various schemas, which can be used for validating a wide variety 
 * of objects.
 */
export class Schema {
    private _required: boolean;
    private _rules: IValidationRule[];

    /**
     * Creates a new general Schema object.
     * 
     * @param required  (optional) defines whether or not <code>null</code> 
     *                  values should cause validation to fail (as   
     *                  a [[ValidationResultType.Error validation error]]). 
     *                  Can be set later on using [[setRequired]].
     * @param rules     (optional) the the [[IValidationRule validation rules]] to 
     *                  include in this Schema. Can be set later on using [[setRules]].
     * 
     * @see [[IValidationRule]]
     */
    public constructor(required?: boolean, rules?: IValidationRule[]) {
        this._required = required;
        this._rules = rules;
    }
    
    /**
     * @returns whether or not <code>null</code> values will cause validation to fail 
     * (as a [[ValidationResultType.Error validation error]]).
     */
    public isRequired(): boolean {
        return this._required;
    }

    /**
     * Changes whether or not <code>null</code> values should cause validation to fail 
     * (as a [[ValidationResultType.Error validation error]]).
     * 
     * @param value     defines whether or not this Schema is required.
     */
    public setRequired(value: boolean) {
        this._required = value;
    }

    /**
     * @returns an array, containing the validation rules that are included in this Schema.
     */
    public getRules(): IValidationRule[] {
        return this._rules;
    }

    /**
     * Changes this Schema's validation rules to the ones passed.
     * 
     * @param value     the array of validation rules to include in this Schema.
     */
    public setRules(value: IValidationRule[]) {
        this._rules = value;
    }

    /**
     * Makes this Schema required (required = true) and returns it.
     * 
     * When a Schema is required, <code>null</code> values cause 
     * validation to fail (as a [[ValidationResultType.Error validation error]]).
     * 
     * @returns this Schema object as a required Schema.
     * 
     * @see [[makeOptional]]
     */
    public makeRequired(): Schema {
        this._required = true;
        return this;
    }

    /**
     * Makes this Schema optional (required = false) and returns it.
     * 
     * When a Schema is optional, <code>null</code> values pass validation.
     * 
     * @returns this Schema object as an optional Schema.
     * 
     * @see [[makeRequired]]
     */
    public makeOptional(): Schema {
        this._required = false;
        return this;
    }

    /**
     * Adds a validation rule to this Schema.
     * 
     * @param rule  the validation rule to add to this Schema's rules.
     */
    public withRule(rule: IValidationRule): Schema {
        this._rules = this._rules || [];
        this._rules.push(rule);
        return this;
    }

    /**
     * Validates the given 'value' using the rules that are set. If this schema is set as 
     * 'required', then 'value' must not be null for validation to pass.
     * 
     * @param path      the dot notation path to the value that is to be validated.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    protected performValidation(path: string, value: any, results: ValidationResult[]): void {
        let name = path || "value";

        if (value == null) {
            if (this.isRequired()) {
                results.push(new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_IS_NULL",
                    name + " must not be null",
                    "NOT NULL",
                    null
                ));
            }
        } else {
            value = ObjectReader.getValue(value);

            // Check validation rules
            if (this._rules != null) {
                for (var i = 0; i < this._rules.length; i++) {
                    let rule: IValidationRule = this._rules[i];
                    rule.validate(path, this, value, results);
                }
            }
        }
    }

    private typeToString(type: any): string {
        if (type == null)
            return "unknown";
        if (_.isNumber(type))
            return TypeConverter.toString(type);
        return type.toString();
    }

    /**
     * Validates that the passed 'value' is an object of the given 'type'. If 'type' is an instance of 
     * Schema - 'value' will be validated using the Schema's [[performValidation]] method. The type 
     * of 'value' is determined using [[TypeConverter.toTypeCode]] and is compared to 'type' using
     * [[TypeMatcher.matchType]]
     * 
     * @param path      the dot notation path to the value that is to be validated.
     * @param type      the type to validate against.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     * 
     * @see [[performValidation]]
     * @see [[TypeConverter.toTypeCode]]
     * @see [[TypeMatcher.matchType]]
     */
    protected performTypeValidation(path: string, type: any, value: any, results: ValidationResult[]): void {
        // If type it not defined then skip
        if (type == null) return;

        // Perform validation against the schema
        if (type instanceof Schema) {
            let schema: Schema = type as Schema;
            schema.performValidation(path, value, results);
            return;
        }

        // If value is null then skip
        value = ObjectReader.getValue(value);
        if (value == null) return;

        let name = path || "value";
        let valueType: TypeCode = TypeConverter.toTypeCode(value);

        // Match types
        if (TypeMatcher.matchType(type, valueType))
            return;

        results.push(
            new ValidationResult(
                path,
                ValidationResultType.Error,
                "TYPE_MISMATCH",
                name + " type must be " + this.typeToString(type) + " but found " + this.typeToString(valueType),
                type,
                valueType.toString()
            )
        );
    }

    /**
     * Validates the given value using this class's [[performValidation]] method.
     * 
     * @param value     the value to validate using this Schema's rules.
     * @returns an array of ValidationResults
     * 
     * @see [[ValidationResult]]
     */
    public validate(value: any): ValidationResult[] {
        let results: ValidationResult[] = [];
        this.performValidation("", value, results);
        return results;
    }

    /**
     * Validates the given value and returns any exceptions that were raised.
     * 
     * @param correlationId     optional transaction id to trace calls across components.
     * @param value             the value to validate using this Schema's rules.
     * @param strict            defines whether or not "Warnings" should raise exceptions.
     */
    public validateAndReturnException(correlationId: string, value: any, strict: boolean = false): ValidationException {
        let results: ValidationResult[] = this.validate(value);
        return ValidationException.fromResults(correlationId, results, strict);
    }

    /**
     * Validates the given value and, if an exception was raised, throws the exception using 
     * [[ValidationException.throwExceptionIfNeeded]].
     * 
     * @param correlationId     optional transaction id to trace calls across components.
     * @param value             the value to validate using this Schema's rules.
     * @param strict            defines whether or not "Warnings" should raise exceptions.
     * 
     * @see [[ValidationException.throwExceptionIfNeeded]]
     */
    public validateAndThrowException(correlationId: string, value: any, strict: boolean = false): void {
        let results: ValidationResult[] = this.validate(value);
        ValidationException.throwExceptionIfNeeded(correlationId, results, strict);
    }

}
