import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { Schema } from './Schema';
/**
 * Used to validate maps, as well as the data type of their keys and values.
 */
export declare class MapSchema extends Schema {
    private _keyType;
    private _valueType;
    /**
     * Creates a new MapSchema object which can validate map objects using the
     * set rules. The keys' and values' data types will also be validated if
     * their [[TypeCode types]] are set.
     *
     * @param required      defines whether or not values that are not maps
     *                      should cause validation to fail (as a
     *                      [[ValidationResultType.Error validation error]]).
     * @param rules         the [[IValidationRule rules]] to set for this Schema.
     * @param keyType       the [[TypeCode data type]] to check for when validating a map's keys.
     *                      Can be set later on using [[setKeyType]].
     * @param valueType     the [[TypeCode data type]] to check for when validating a map's values.
     *                      Can be set later on using [[setValueType]].
     *
     * @see [[IValidationRule]]
     * @see [[TypeCode]]
     */
    constructor(required?: boolean, rules?: IValidationRule[], keyType?: any, valueType?: any);
    /**
     * @returns the [[TypeCode data type]] that this MapSchema will check for when validating keys.
     */
    getKeyType(): any;
    /**
     * @param value     the [[TypeCode data type]] that this MapSchema should check for when validating keys.
     */
    setKeyType(value: any): void;
    /**
     * @returns the [[TypeCode data type]] that this MapSchema will check for when validating values.
     */
    getValueType(): any;
    /**
     * @param value     the [[TypeCode data type]] that this MapSchema should check for when validating values.
     */
    setValueType(value: any): void;
    /**
     * Validates the given 'value' using [[Schema.performValidation]] and, if 'value' is a map,
     * additionally validates that all keys and values are of the data types [[getKeyType keyType]]
     * and [[getValueType valueType]], respectively.
     *
     * @param path      the dot notation path to the value that is to be validated.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation. If 'value' is not a map and this schema is
     *                  set as 'required', then the results will contain a
     *                  [[ValidationResultType.Error validation error]].
     */
    protected performValidation(path: string, value: any, results: ValidationResult[]): void;
}
