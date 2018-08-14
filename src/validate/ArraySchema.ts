/** @module validate */
/** @hidden */ 
let _ = require('lodash');

import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { ObjectReader } from '../reflect/ObjectReader';
import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';

/**
 * Used to validate arrays, as well as their values' data types.
 */
export class ArraySchema extends Schema {
    private _valueType: any;

    /**
     * Creates a new ArraySchema, which can be used to validate arrays that contain 
     * values of the data type 'valueType'.
     * 
     * @param valueType     the [[TypeCode data type]] to check for when validating an array's values.
     * 
     * @see [[TypeCode]]
     */
    public constructor(valueType: any) {
        super();

        this._valueType = valueType;
    }

    /**
     * @returns the [[TypeCode data type]] for which this Schema checks when validating an array's values.
     */
    public getValueType(): any {
        return this._valueType;
    }

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
    protected performValidation(path: string, value: any, results: ValidationResult[]): void {
        let name = path || "value";
        value = ObjectReader.getValue(value);

        super.performValidation(path, value, results);

        if (!value) return;

        if (_.isArray(value)) {
            for (let index = 0; index < value.length; index++) {
                let elementPath = path != "" ? path + "." + index : index.toString();
                this.performTypeValidation(elementPath, this.getValueType(), value[index], results);
            }
        } else {
            results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_ISNOT_ARRAY",
                    name + " type must to be List or Array",
                    TypeCode.Array,
                    TypeConverter.toTypeCode(value)
                )
            );
        }
    }

}
