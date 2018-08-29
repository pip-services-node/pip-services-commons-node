/** @module data */
/** @hidden */ 
let _ = require('lodash');

import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';
import { StringConverter } from '../convert/StringConverter';
import { BooleanConverter } from '../convert/BooleanConverter';
import { IntegerConverter } from '../convert/IntegerConverter';
import { LongConverter } from '../convert/LongConverter';
import { FloatConverter } from '../convert/FloatConverter';
import { DoubleConverter } from '../convert/DoubleConverter';
import { DateTimeConverter } from '../convert/DateTimeConverter';
import { MapConverter } from '../convert/MapConverter';
import { AnyValue } from './AnyValue';
import { AnyValueArray } from './AnyValueArray';
import { AnyValueMap } from './AnyValueMap';

/**
 * Class that allows for usage of abstract, portable string-value maps. Stores a set of values using string keys. The values that are
 * stored can be retrieved in various ways with the help of numerous converters.
 * 
 * StringValueMap is crucial to the PipServices framework, as it is used to create serializable objects. [[ConfigParams]], 
 * [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/connect.connectionparams.html ConnectionParams]], 
 * [[FilterParams]], and many other PipServices classes extend StringValueMap.
 * 
 * @see [[StringConverter]]
 * @see [[TypeConverter]]
 * @see [[BooleanConverter]]
 * @see [[IntegerConverter]]
 * @see [[LongConverter]]
 * @see [[DoubleConverter]]
 * @see [[FloatConverter]]
 * @see [[DateTimeConverter]]
 * 
 * ### Examples ###
 * public MyMethod (map: any) {
 * 		let map1 = StringValueMap.fromTuples(
			"key1", 123,
			"key2", "ABC"
		);
 * 		...
 * 
 *      let map2 = new StringValueMap(map);
 *      ...
 * }
 */
export class StringValueMap {

    /**
     * Creates a new object and sets its values to the 'values' passed
     * as a parameter. If 'values' are omitted, they can be set later on using 
     * [[setAsObject]] or [[append]].
     * 
     * @param values    the values to store in this StringValueMap.
     */
    public constructor(map: any = null) {
        if (map != null)
    	    this.append(map);
    }
    
    /**
     * Returns the item stored by the given key.
     * 
     * @param key       key of the item to retrieve from this StringValueMap.
     * @returns         the item stored by the given key.
     */
    public get(key: string): string {
        return this[key] || null;
    }

    /** 
     * Returns keyset that are contained in this StringValueMap as a list of strings. 
     * 
     * @returns all of the keys that are contained in this StringValueMap as a list of strings. 
     */
	public getKeys(): string[] {
        let keys: string[] = [];
		
		for (let key in this) {
            if (this.hasOwnProperty(key)) {
                keys.push(key);
            }
        }

        return keys;
    }            
    
    /**
     * Puts the value into this StringValueMap by the given key.
     * 
     * @param key       the key by which to insert the given value.
     * @param value     the value to insert into this StringValueMap by the given key.
     */
	public put(key: string, value: any): any {
        this[key] = StringConverter.toNullableString(value);
    }

    /**
     * Removes item by the key from this StringValueMap.
     * 
     * @param key       key of the item to remove.
     */
    public remove(key: string): void {
        delete this[key];
    }
    
    /**
     * Appends map of items to this StringValueMap.
     * 
     * @param map   map of items to append to this StringValueMap.
     */
    public append(map: any): void {
    	if (map == null) return;
    	
		for (let key in map) {
            let value = map[key];
            if (map.hasOwnProperty(key))
                this[key] = StringConverter.toNullableString(value);
		}
    }

    /** Removes all values from this StringValueMap. */
    public clear(): any {
    	for (let key in this) {
            let value = this[key];
            if (this.hasOwnProperty(key))
    		    delete this[key];
    	}
    }

    /** 
     * Returns the number of key-value mappings in this map.
     *  
     * @returns the number of key-value pairs stored in this StringValueMap. 
     */
    public length(): number {
        let count: number = 0;
        for (let key in this) {
            if (this.hasOwnProperty(key))
                count ++;
        }        
        return count;
    } 
        
    /**
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key without any conversions or
     *                  all items (if 'key' is undefined or omitted).
     */    
    public getAsObject(key: string = undefined): any {
        if (key === undefined) {
            let result: any = {};
            for (let key in this) {
                let value = this[key];
                if (this.hasOwnProperty(key))
                    result[key] = value;
            }
            return result;
        } else {
            return this.get(key);
        }
    }
    
    /**
     * @param key       the key by which to set the 'value' passed.
     * @param value     the value to set in this StringValueMap at the given 'key'. 
     *                  If 'key' is omitted, then this StringValueMap will be set (cleared and
     *                  filled anew) using 'value'. In this case 'value' will be converted to 
     *                  a map using "MapConverter.toMap(value)" and set to this StringValueMap.
     * 
     * @see [[MapConverter.toMap]]
     */
    public setAsObject(key: any, value: any = undefined): void {
        if (value === undefined) {
            value = key
            this.clear();
            let values = MapConverter.toMap(value);
            this.append(values);
        } else {
            this.put(key, value);
        }
    }
    
    /** 
     * Converts item at the given key into a nullable string object using
     * [[StringConverter.toNullableString]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable string. 
     * 
     * @see [[StringConverter.toNullableString]]
     */
    public getAsNullableString(key: string): string {
        let value = this.get(key);
        return StringConverter.toNullableString(value);
    }

    /** 
     * Converts item at the given key into a default string object using
     * [[StringValueMap.getAsStringWithDefault]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a string (or null as the default). 
     * 
     * @see [[getAsStringWithDefault]]
     */
    public getAsString(key: string): string {
        return this.getAsStringWithDefault(key, null);
    }

    /**
     * Converts item at the given key into a default string object using
     * [[StringConverter.toStringWithDefault]] and returns it.
     * 
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a string or the
     *                          defaultValue (if conversion is not possible).
     * 
     * @see [[StringConverter.toStringWithDefault]]
     */
    public getAsStringWithDefault(key: string, defaultValue: string): string {
        let value = this.get(key);
        return StringConverter.toStringWithDefault(value, defaultValue);
    }
    
    /** 
     * Converts item at the given key into a nullable boolean object using
     * [[BooleanConverter.toNullableBoolean]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable boolean. 
     * 
     * @see [[BooleanConverter.toNullableBoolean]]
     */
    public getAsNullableBoolean(key: string): boolean {
        let value = this.get(key);
        return BooleanConverter.toNullableBoolean(value);
    }

    /** 
     * Converts item at the given key into a default boolean object using
     * [[StringValueMap.getAsBooleanWithDefault]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a boolean (or false as the default). 
     * 
     * @see [[getAsBooleanWithDefault]]
     */
    public getAsBoolean(key: string): boolean {
        return this.getAsBooleanWithDefault(key, false);
    }

    /**
     * Converts item at the given key into a default boolean object using
     * [[BooleanConverter.toBooleanWithDefault]] and returns it.
     * 
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a boolean or the
     *                          defaultValue (if conversion is not possible).
     * 
     * @see [[BooleanConverter.toBooleanWithDefault]]
     */
    public getAsBooleanWithDefault(key: string, defaultValue: boolean): boolean {
        let value = this.get(key);
        return BooleanConverter.toBooleanWithDefault(value, defaultValue);
    }

    /** 
     * Converts item at the given key into a nullable integer object using
     * [[IntegerConverter.toNullableInteger]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable integer. 
     * 
     * @see [[IntegerConverter.toNullableInteger]]
     */
    public getAsNullableInteger(key: string): number {
        let value = this.get(key);
        return IntegerConverter.toNullableInteger(value);
    }

    /** 
     * Converts item at the given key into a default integer object using
     * [[StringValueMap.getAsIntegerWithDefault]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as an integer (or 0 as the default). 
     * 
     * @see [[getAsIntegerWithDefault]]
     */
    public getAsInteger(key: string): number {
        return this.getAsIntegerWithDefault(key, 0);
    }

    /**
     * Converts item at the given key into a default integer object using
     * [[IntegerConverter.toIntegerWithDefault]] and returns it.
     * 
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as an integer or the
     *                          defaultValue (if conversion is not possible).
     * 
     * @see [[IntegerConverter.toIntegerWithDefault]]
     */
    public getAsIntegerWithDefault(key: string, defaultValue: number): number {
        let value = this.get(key);
        return IntegerConverter.toIntegerWithDefault(value, defaultValue);
    }

    /** 
     * Converts item at the given key into a nullable long object using
     * [[LongConverter.toNullableLong]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable long. 
     * 
     * @see [[LongConverter.toNullableLong]]
     */
    public getAsNullableLong(key: string): number {
        let value = this.get(key);
        return LongConverter.toNullableLong(value);
    }

    /** 
     * Converts item at the given key into a default long object using
     * [[StringValueMap.getAsLongWithDefault]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a long (or 0 as the default). 
     * 
     * @see [[getAsLongWithDefault]]
     */
    public getAsLong(key: string): number {
        return this.getAsLongWithDefault(key, 0);
    }

    /**
     * Converts item at the given key into a default long object using
     * [[LongConverter.toLongWithDefault]] and returns it.
     * 
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a long or the
     *                          defaultValue (if conversion is not possible).
     * 
     * @see [[LongConverter.toLongWithDefault]]
     */
    public getAsLongWithDefault(key: string, defaultValue: number): number {
        let value = this.get(key);
        return LongConverter.toLongWithDefault(value, defaultValue);
    }

    /** 
     * Converts item at the given key into a nullable float object using
     * [[FloatConverter.toNullableFloat]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable float. 
     * 
     * @see [[FloatConverter.toNullableFloat]]
     */
    public getAsNullableFloat(key: string): number {
        let value = this.get(key);
        return FloatConverter.toNullableFloat(value);
    }

    /** 
     * Converts item at the given key into a default float object using
     * [[StringValueMap.getAsFloatWithDefault]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a float (or 0 as the default). 
     * 
     * @see [[getAsFloatWithDefault]]
     */
    public getAsFloat(key: string): number {
        return this.getAsFloatWithDefault(key, 0);
    }

    /**
     * Converts item at the given key into a default float object using
     * [[FloatConverter.toFloatWithDefault]] and returns it.
     * 
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a float or the
     *                          defaultValue (if conversion is not possible).
     * 
     * @see [[FloatConverter.toFloatWithDefault]]
     */
    public getAsFloatWithDefault(key: string, defaultValue: number): number {
        let value = this.get(key);
        return FloatConverter.toFloatWithDefault(value, defaultValue);
    }

    /** 
     * Converts item at the given key into a nullable double object using
     * [[DoubleConverter.toNullableDouble]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable double. 
     * 
     * @see [[DoubleConverter.toNullableDouble]]
     */
    public getAsNullableDouble(key: string): number {
        let value = this.get(key);
        return DoubleConverter.toNullableDouble(value);
    }

    /** 
     * Converts item at the given key into a default double object using
     * [[StringValueMap.getAsDoubleWithDefault]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a double (or 0 as the default). 
     * 
     * @see [[getAsDoubleWithDefault]]
     */
    public getAsDouble(key: string): number {
        return this.getAsDoubleWithDefault(key, 0);
    }

    /**
     * Converts item at the given key into a default double object using
     * [[DoubleConverter.toDoubleWithDefault]] and returns it.
     * 
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a double or the
     *                          defaultValue (if conversion is not possible).
     * 
     * @see [[DoubleConverter.toDoubleWithDefault]]
     */
    public getAsDoubleWithDefault(key: string, defaultValue: number): number {
        let value = this.get(key);
        return DoubleConverter.toDoubleWithDefault(value, defaultValue);
    }

    /** 
     * Converts item at the given key into a nullable Datetime object using
     * [[DateTimeConverter.toNullableDateTime]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable Datetime. 
     * 
     * @see [[DateTimeConverter.toNullableDateTime]]
     */
    public getAsNullableDateTime(key: string): Date {
        let value = this.get(key);
        return DateTimeConverter.toNullableDateTime(value);
    }

    /** 
     * Converts item at the given key into a default Datetime object using
     * [[StringValueMap.getAsDateTimeWithDefault]] and returns it.
     * 
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a Datetime (or null as the default). 
     * 
     * @see [[getAsDateTimeWithDefault]]
     */
    public getAsDateTime(key: string): Date {
        return this.getAsDateTimeWithDefault(key, null);
    }

    /**
     * Converts item at the given key into a default Datetime object using
     * [[DateTimeConverter.toDateTimeWithDefault]] and returns it.
     * 
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a Datetime or the
     *                          defaultValue (if conversion is not possible).
     * 
     * @see [[DateTimeConverter.toDateTimeWithDefault]]
     */
    public getAsDateTimeWithDefault(key: string, defaultValue: Date): Date {
        let value = this.get(key);
        return DateTimeConverter.toDateTimeWithDefault(value, defaultValue);
    }
    
    /** 
     * Converts the item at the given key into a nullable object of type 'type' using
     * [[TypeConverter.toNullableType]] and returns it.
     * 
     * @param type      the TypeCode to be used in TypeConverter.toNullableType<T>(TypeCode, value);
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as a nullable object of type 'type'.
     * 
     * @see [[TypeConverter.toNullableType]]
     */
    public getAsNullableType<T>(type: TypeCode, key: string): T {
        let value = this.get(key);
        return TypeConverter.toNullableType<T>(type, value);
    }

    /** 
     * Converts the item at the given key into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     * 
     * @param type      the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, null);
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as an object of type 'type' (or null as the default). 
     * 
     * @see [[getAsTypeWithDefault]]
     */
    public getAsType<T>(type: TypeCode, key: string): T {
        return this.getAsTypeWithDefault<T>(type, key, null);
    }

    /**
     * Converts the item at the given key into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     * 
     * @param type              the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, defaultValue);
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as an object of type 'type' or the defaultValue, 
     *                          if conversion is not possible.
     * 
     * @see [[TypeConverter.toTypeWithDefault]]
     */
    public getAsTypeWithDefault<T>(type: TypeCode, key: string, defaultValue: T): T {
        let value = this.get(key);
        return TypeConverter.toTypeWithDefault(type, value, defaultValue);
    }

    /** 
     * Returns the item at the given key as an AnyValue object.
     * 
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as an AnyValue object. 
     * 
     * @see [[AnyValue]]
     * @see [[AnyValue.constructor]]
     */
    public getAsValue(key: string): AnyValue {
        let value = this.get(key);
    	return new AnyValue(value);
    }

    /** 
     * Returns the item at the given key as a nullable AnyValueArray object.
     * 
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as a nullable AnyValueArray object (returns
     *                  null if the item at the given key is null).
     * 
     * @see [[AnyValueArray]]
     * @see [[AnyValueArray.fromValue]]
     */
    public getAsNullableArray(key: string): AnyValueArray {
        let value = this.get(key);
    	return value != null ? AnyValueArray.fromValue(value) : null;
    }

    /** 
     * Returns the item at the given key as an AnyValueArray object.
     * 
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as an AnyValueArray object. 
     * 
     * @see [[AnyValueArray]]
     * @see [[AnyValueArray.fromValue]]
     */
    public getAsArray(key: string): AnyValueArray {
        let value = this.get(key);
    	return AnyValueArray.fromValue(value);
    }
    
    /** 
     * Returns the item at the given key as an AnyValueArray object or 'defaultValue', if conversion is not possible.
     * 
     * @param key           key of the item to retrieve.
     * @param defaultValue  value to use if the item at the given key cannot be converted 
     *                      into an AnyValueArray.
     * @returns             the item at the given key as an AnyValueArray object or 'defaultValue',
     *                      if conversion is not possible. 
     * 
     * @see [[AnyValueArray]]
     * @see [[getAsNullableArray]]
     */
    public getAsArrayWithDefault(key: string, defaultValue: AnyValueArray): AnyValueArray {
    	let result = this.getAsNullableArray(key);
    	return result != null ? result : defaultValue;
    }

    /** 
     * Returns the item at the given key as a nullable AnyValueMap object.
     * 
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as a nullable AnyValueMap object (returns
     *                  null if the item at the given key is null).
     * 
     * @see [[fromValue]]
     */
    public getAsNullableMap(key: string): AnyValueMap {
        let value = this.get(key);
    	return value != null ? AnyValueMap.fromValue(value) : null;
    }

    /** 
     * Returns the item at the given key as an AnyValueMap object.
     * 
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as an AnyValueMap object. 
     * 
     * @see [[fromValue]]
     */
    public getAsMap(key: string): AnyValueMap {
        let value = this.get(key);
    	return AnyValueMap.fromValue(value);
    }

    /** 
     * Returns the item at the given key as an AnyValueMap object or 'defaultValue', if conversion is not possible.
     * 
     * @param key           key of the item to retrieve.
     * @param defaultValue  value to use if the item at the given key cannot be converted 
     *                      into an AnyValueMap.
     * @returns             the item at the given key as an AnyValueMap object or 'defaultValue',
     *                      if conversion is not possible. 
     * 
     * @see [[getAsNullableMap]]
     */
    public getAsMapWithDefault(key: string, defaultValue: AnyValueMap): AnyValueMap {
        let result = this.getAsNullableMap(key);
    	return result != null ? result: defaultValue;
    }
    
    /** 
     * @returns this StringValueMap as a semicolon-separated values string.
     * 
     * Example: "key1=value1;key2;key3=value3".
     */
	public toString(): string {
		let builder = '';

		// Todo: User encoder
		for (let key in this) {
            if (this.hasOwnProperty(key)) {
                let value = this[key];

                if (builder.length > 0)
                    builder += ';';
                
                if (value != null)
                    builder += key + '=' + value;
                else
                    builder += key;
            }
		}
		
		return builder;
    }
    
    /** @returns a clone of this object. */
    public clone(): any {
    	return new StringValueMap(this);
    }   

    /**
     * Static method for creating a StringValueMap from a value.
     * 
     * @param value     the value to initialize the new StringValueMap with.
     * @returns         the StringValueMap that was created and initialized with 'value'.
     * 
     * @see [[StringValueMap]]
     */
    public static fromValue(value: any): StringValueMap {
        return new StringValueMap(value);
    }

    /**
     * Static method for creating a StringValueMap from the tuples that are passed as parameters.
     * 
     * @param tuples    the key-value tuple parameters to initialize the new StringValueMap with.
     * @returns         the StringValueMap created and filled by the tuples provided.
     * 
     * @see [[fromTuplesArray]]
     */
    public static fromTuples(...tuples: any[]): StringValueMap {
        return StringValueMap.fromTuplesArray(tuples);
    }
    
    /**
     * Static method for creating a StringValueMap from an array of tuples.
     * 
     * @param tuples    the key-value tuples array to initialize the new StringValueMap with.
     * @returns         the StringValueMap created and filled by the 'tuples' array provided.
     */
    public static fromTuplesArray(tuples: any[]): StringValueMap {
    	let result = new StringValueMap();
    	if (tuples == null || tuples.length == 0)
    		return result;
    	
        for (let index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length) break;

            let name = StringConverter.toString(tuples[index]);
            let value = StringConverter.toNullableString(tuples[index + 1]);

            result[name] = value;
        }
        
    	return result;
    }

    /** 
     * Static method for creating StringValueMaps from semicolon-separated values strings.
     * 
     * @param line      semicolon-separated values string containing keys and values. 
     *                  Example string: "key1=value1;key2;key3=value3".
     * @returns         the StringValueMap created, using the key-value pairs in 'line'.
     */
    public static fromString(line: string): StringValueMap {
    	let result = new StringValueMap();
		if (line == null || line.length == 0) 
			return result;
		
		// Todo: User tokenizer / decoder
		let tokens = line.split(";");
		
		for (let index = 0; index < tokens.length; index++) {
            let token = tokens[index];
			if (token.length == 0) continue;
			let pos = token.indexOf('=');
			let key = pos > 0 ? token.substring(0, pos).trim() : token.trim();
			let value = pos > 0 ? token.substring(pos + 1).trim() : null;
            result.put(key, value);
		}
		
		return result;
    }

    /**
     * Static method for creating a StringValueMap using the maps passed as parameters.
     * 
     * @param maps  the maps passed to this method to create a StringValueMap with.
     * @returns     the StringValueMap created.
     */
    public static fromMaps(...maps: any[]): StringValueMap {
    	let result = new StringValueMap();
    	if (maps != null && maps.length > 0) {
	    	for (let index = 0; index < maps.length; index++)
	    		result.append(maps[index]);
    	}
    	return result;
    }
}