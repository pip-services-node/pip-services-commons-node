/** @module validate */
import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { Schema } from './Schema';
/**
 * Used to validate object properties, as well as their type. Using in [[ObjectSchema ObjectSchemas]].
 *
 * @see [[ObjectSchema]]
 */
export declare class PropertySchema extends Schema {
    private _name;
    private _type;
    /**
     * Creates a new PropertySchema object which can validate an object's property using the
     * set rules. The data type of the property will also be validated if a [[TypeCode type]] is set.
     *
     * @param required      defines whether or not <code>null</code> values
     *                      should cause validation to fail (as
     *                      a [[ValidationResultType.Error validation error]]).
     * @param rules         the [[IValidationRule rules]] to set for this Schema.
     * @param name          the name of the property that is to be validated.
     *                      Can be set later on using [[setName]].
     * @param type          the [[TypeCode data type]] to check for when validating an object's property.
     *                      Can be set later on using [[setType]].
     *
     * @see [[IValidationRule]]
     * @see [[TypeCode]]
     */
    constructor(required?: boolean, rules?: IValidationRule[], name?: string, type?: any);
    /**
     * @returns the name of the property that this PropertySchema validates.
     */
    getName(): string;
    /**
     * @param value     the name of the property that this PropertySchema should validate.
     */
    setName(value: string): void;
    /**
     * @returns the [[TypeCode data type]] that this PropertySchema checks for when validating a property.
     */
    getType(): any;
    /**
     * @param value     the [[TypeCode data type]] that this PropertySchema should check for when
     * validating a property.
     */
    setType(value: any): void;
    /**
     * Validates the given 'value' using [[Schema.performValidation]] and, if a [[getType type]] is a set,
     * additionally validates that the passed value (property) is of the correct data type.
     *
     * @param path      the name of the value that is to be validated.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    performValidation(path: string, value: any, results: ValidationResult[]): void;
}
