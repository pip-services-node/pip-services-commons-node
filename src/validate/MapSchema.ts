/** @module validate */
/** @hidden */ 
let _ = require('lodash');

import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { Schema } from './Schema';
import { ObjectReader } from '../reflect/ObjectReader';
import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';
import { StringConverter } from '../convert/StringConverter';

/**
 * Used to validate maps, as well as the data type of their keys and values.
 */
export class MapSchema extends Schema {
    private _keyType: any;
    private _valueType: any;
    
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
    public constructor(required?: boolean, rules?: IValidationRule[], keyType?: any, valueType?: any) {
        super(required, rules);

        this._keyType = keyType;
        this._valueType = valueType;
    }

    /**
     * @returns the [[TypeCode data type]] that this MapSchema will check for when validating keys.
     */
    public getKeyType(): any {
        return this._keyType; 
    }

    /**
     * @param value     the [[TypeCode data type]] that this MapSchema should check for when validating keys.
     */
    public setKeyType(value: any) {
        this._keyType = value; 
    }

    /**
     * @returns the [[TypeCode data type]] that this MapSchema will check for when validating values.
     */
    public getValueType(): any {
        return this._valueType; 
    }

    /**
     * @param value     the [[TypeCode data type]] that this MapSchema should check for when validating values.
     */
    public setValueType(value: any) {
        this._valueType = value; 
    }

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
    protected performValidation(path: string, value: any, results: ValidationResult[]): void {
        value = ObjectReader.getValue(value);

        super.performValidation(path, value, results);

        if (!value) return;

        let name = path || "value";
        let valueType: TypeCode = TypeConverter.toTypeCode(value);
        let map: any = valueType === TypeCode.Map ? value : null;

        if (map) {
            for (var key in map) {
                var elementPath = path != "" ? path + "." + key : StringConverter.toString(key);

                this.performTypeValidation(elementPath, this.getKeyType(), key, results);
                this.performTypeValidation(elementPath, this.getValueType(), map[key], results);
            }
        } else {
            if (this.isRequired) {
                results.push(new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_ISNOT_MAP",
                    name + " type must be Map",
                    TypeCode.Map,
                    valueType
                ));
            }
        }
    }

}
