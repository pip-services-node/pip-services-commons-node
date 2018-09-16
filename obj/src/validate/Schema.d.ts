import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { ValidationException } from './ValidationException';
/**
 * Allows for the creation of various schemas, which can be used for validating a wide variety
 * of objects.
 */
export declare class Schema {
    private _required;
    private _rules;
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
    constructor(required?: boolean, rules?: IValidationRule[]);
    /**
     * @returns whether or not <code>null</code> values will cause validation to fail
     * (as a [[ValidationResultType.Error validation error]]).
     */
    isRequired(): boolean;
    /**
     * Changes whether or not <code>null</code> values should cause validation to fail
     * (as a [[ValidationResultType.Error validation error]]).
     *
     * @param value     defines whether or not this Schema is required.
     */
    setRequired(value: boolean): void;
    /**
     * @returns an array, containing the validation rules that are included in this Schema.
     */
    getRules(): IValidationRule[];
    /**
     * Changes this Schema's validation rules to the ones passed.
     *
     * @param value     the array of validation rules to include in this Schema.
     */
    setRules(value: IValidationRule[]): void;
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
    makeRequired(): Schema;
    /**
     * Makes this Schema optional (required = false) and returns it.
     *
     * When a Schema is optional, <code>null</code> values pass validation.
     *
     * @returns this Schema object as an optional Schema.
     *
     * @see [[makeRequired]]
     */
    makeOptional(): Schema;
    /**
     * Adds a validation rule to this Schema.
     *
     * @param rule  the validation rule to add to this Schema's rules.
     */
    withRule(rule: IValidationRule): Schema;
    /**
     * Validates the given 'value' using the rules that are set. If this schema is set as
     * 'required', then 'value' must not be null for validation to pass.
     *
     * @param path      the dot notation path to the value that is to be validated.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    protected performValidation(path: string, value: any, results: ValidationResult[]): void;
    private typeToString;
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
    protected performTypeValidation(path: string, type: any, value: any, results: ValidationResult[]): void;
    /**
     * Validates the given value using this class's [[performValidation]] method.
     *
     * @param value     the value to validate using this Schema's rules.
     * @returns an array of ValidationResults
     *
     * @see [[ValidationResult]]
     */
    validate(value: any): ValidationResult[];
    /**
     * Validates the given value and returns any exceptions that were raised.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param value             the value to validate using this Schema's rules.
     * @param strict            defines whether or not "Warnings" should raise exceptions.
     */
    validateAndReturnException(correlationId: string, value: any, strict?: boolean): ValidationException;
    /**
     * Validates the given value and, if an exception was raised, throws the exception using
     * [[ValidationException.throwExceptionIfNeeded]].
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param value             the value to validate using this Schema's rules.
     * @param strict            defines whether or not "Warnings" should raise exceptions.
     *
     * @see [[ValidationException.throwExceptionIfNeeded]]
     */
    validateAndThrowException(correlationId: string, value: any, strict?: boolean): void;
}
