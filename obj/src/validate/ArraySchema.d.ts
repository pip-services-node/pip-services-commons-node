import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
/**
 * Used to validate arrays, as well as their values' data types.
 */
export declare class ArraySchema extends Schema {
    private _valueType;
    /**
     * Creates a new ArraySchema, which can be used to validate arrays that contain
     * values of the data type 'valueType'.
     *
     * @param valueType     the [[TypeCode data type]] to check for when validating an array's values.
     *
     * @see [[TypeCode]]
     */
    constructor(valueType: any);
    /**
     * @returns the [[TypeCode data type]] for which this Schema checks when validating an array's values.
     */
    getValueType(): any;
    /**
     * Validates the given 'value' using [[Schema.performValidation]] and, if 'value' is an array,
     * additionally validates that all values stored are objects of the data type
     * [[valueType that is set]] in this ArraySchema object.
     *
     * @param path      the dot notation path to the value that is to be validated.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation. If 'value' is not an array - the
     *                  results will contain a [[ValidationResultType.Error validation error]].
     *
     * @see [[Schema.performValidation]]
     * @see [[valueType]]
     * @see [[ValidationResultType.Error]]
     */
    protected performValidation(path: string, value: any, results: ValidationResult[]): void;
}
