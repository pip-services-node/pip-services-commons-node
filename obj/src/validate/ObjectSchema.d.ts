/** @module validate */
import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { Schema } from './Schema';
import { PropertySchema } from './PropertySchema';
/**
 * Used to validate objects, as well as their properties.
 */
export declare class ObjectSchema extends Schema {
    private _properties;
    private _allowUndefined;
    private _allowExtra;
    /**
     * Creates a new ObjectSchema, which can be used to validate objects using the given rules.
     * Object properties can be validated as well if [[PropertySchema PropertySchemas]] are added to
     * this ObjectSchema.
     *
     * @param allowExtraProperies      defines whether or not validation results should contain
     *                                  a [[ValidationResultType.Warning Warning]], when extra
     *                                  properties are detected.
     * @param required                  defines whether or not <code>null</code> object
     *                                  properties should cause validation to fail (as
     *                                  a [[ValidationResultType.Error validation error]]).
     * @param rules                     the [[IValidationRule rules]] to set for this Schema.
     *
     * @see [[IValidationRule]]
     */
    constructor(allowExtraProperies?: boolean, required?: boolean, rules?: IValidationRule[]);
    /**
     * @returns the array of PropertySchemas, which are to be used for object validation.
     *
     * @see [[PropertySchema]]
     */
    /**
    * @param value     the array of PropertySchemas to use for object validation.
    *
    * @see [[PropertySchema]]
    */
    properties: PropertySchema[];
    /**
     * @returns whether or not undefined properties are allowed to pass validation.
     */
    /**
    * @param value     whether or not undefined properties should be allowed to pass validation.
    */
    isUndefinedAllowed: boolean;
    /**
     * Sets 'isUndefinedAllowed' to the given 'value' and returns the modified ObjectSchema.
     *
     * @param value     whether or not undefined properties should be allowed to pass validation.
     * @returns this ObjectSchema with 'isUndefinedAllowed' set to the value that was passed.
     */
    allowUndefined(value: boolean): ObjectSchema;
    /**
     * Adds a [[PropertySchema]] to this ObjectSchema object, which will be used for validating
     * objects' properties.
     *
     * @param schema    the PropertySchema to add to this ObjectSchema.
     * @returns this ObjectSchema with the new PropertySchema added to its list of properties.
     *
     * @see [[PropertySchema]]
     */
    withProperty(schema: PropertySchema): ObjectSchema;
    /**
     * Adds a new [[PropertySchema]] to this ObjectSchema using the given parameters and makes it
     * required. When a Schema is required, <code>null</code> values cause validation to fail (as
     * a [[ValidationResultType.Error validation error]]).
     *
     * @param name      the name of the property that is to be validated.
     * @param type      the [[TypeCode data type]] to check for when validating an object's property.
     * @param rules     the [[IValidationRule rules]] to set for the property's schema.
     *
     * @see [[PropertySchema]]
     * @see [[TypeCode]]
     * @see [[IValidationRule]]
     */
    withRequiredProperty(name: string, type?: any, ...rules: IValidationRule[]): ObjectSchema;
    /**
     * Adds a new [[PropertySchema]] to this ObjectSchema using the given parameters and makes it
     * optional. When a Schema is optional, <code>null</code> values pass validation.
     *
     * @param name      the name of the property that is to be validated.
     * @param type      the [[TypeCode data type]] to check for when validating an object's property.
     * @param rules     the [[IValidationRule rules]] to set for the property's schema.
     *
     * @see [[PropertySchema]]
     * @see [[TypeCode]]
     * @see [[IValidationRule]]
     */
    withOptionalProperty(name: string, type?: any, ...rules: IValidationRule[]): ObjectSchema;
    /**
     * Validates the given 'value' using [[Schema.performValidation]] and, if
     * [[PropertySchema PropertySchemas]] were set, additionally validates value's properties.
     * If extra properties are not allowed and are detected - the validation results will
     * contain a [[ValidationResultType.Warning Warning]].
     *
     * @param path      the dot notation path to the value that is to be validated.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation. If extra properties are not allowed and
     *                  are detected, then the results will contain a [[ValidationResultType.Warning Warning]].
     *
     * @see [[PropertySchema]]
     */
    protected performValidation(path: string, value: any, results: ValidationResult[]): void;
}
