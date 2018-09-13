import { TypeCode } from '../convert/TypeCode';
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
 *
 * Example StringValueMap object usage:
 *
 *     public MyMethod (map: any) {
 *         let map1 = StringValueMap.fromTuples(
 *             "key1", 123,
 *             "key2", "ABC"
 *         );
 *         ...
 *
 *         let map2 = new StringValueMap(map);
 *         ...
 *     }
 */
export declare class StringValueMap {
    /**
     * Creates a new object and sets its values to the 'values' passed
     * as a parameter. If 'values' are omitted, they can be set later on using
     * [[setAsObject]] or [[append]].
     *
     * @param values    the values to store in this StringValueMap.
     */
    constructor(map?: any);
    /**
     * Returns the item stored by the given key.
     *
     * @param key       key of the item to retrieve from this StringValueMap.
     * @returns         the item stored by the given key.
     */
    get(key: string): string;
    /**
     * Returns this StringValueMap's keyset as a list of strings.
     *
     * @returns all of the keys that are contained in this StringValueMap as a list of strings.
     */
    getKeys(): string[];
    /**
     * Puts a value into this StringValueMap by the given key.
     *
     * @param key       the key by which to insert the given value.
     * @param value     the value to insert into this StringValueMap by the given key.
     */
    put(key: string, value: any): any;
    /**
     * Removes an item by its key from this StringValueMap.
     *
     * @param key       the key of the item to remove.
     */
    remove(key: string): void;
    /**
     * Appends a map of items to this StringValueMap.
     *
     * @param map   the map of items to append to this StringValueMap.
     */
    append(map: any): void;
    /** Removes all values from this StringValueMap. */
    clear(): any;
    /**
     * Returns the number of key-value mappings present in this map.
     *
     * @returns the number of key-value pairs stored in this StringValueMap.
     */
    length(): number;
    /**
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key without any conversions or
     *                  all items (if 'key' is undefined or omitted).
     */
    getAsObject(key?: string): any;
    /**
     * @param key       the key by which to set the 'value' passed.
     * @param value     the value to set in this StringValueMap at the given 'key'.
     *                  If 'key' is omitted, then this StringValueMap will be set (cleared and
     *                  filled anew) using 'value'. In this case 'value' will be converted to
     *                  a map using "MapConverter.toMap(value)" and set to this StringValueMap.
     *
     * @see [[MapConverter.toMap]]
     */
    setAsObject(key: any, value?: any): void;
    /**
     * Converts the item at the given key into a nullable string object using
     * [[StringConverter.toNullableString]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable string.
     *
     * @see [[StringConverter.toNullableString]]
     */
    getAsNullableString(key: string): string;
    /**
     * Converts the item at the given key into a defaultable string object using
     * [[StringValueMap.getAsStringWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a string (or null as the default).
     *
     * @see [[getAsStringWithDefault]]
     */
    getAsString(key: string): string;
    /**
     * Converts the item at the given key into a defaultable string object using
     * [[StringConverter.toStringWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a string or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[StringConverter.toStringWithDefault]]
     */
    getAsStringWithDefault(key: string, defaultValue: string): string;
    /**
     * Converts the item at the given key into a nullable boolean object using
     * [[BooleanConverter.toNullableBoolean]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable boolean.
     *
     * @see [[BooleanConverter.toNullableBoolean]]
     */
    getAsNullableBoolean(key: string): boolean;
    /**
     * Converts the item at the given key into a defaultable boolean object using
     * [[StringValueMap.getAsBooleanWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a boolean (or false as the default).
     *
     * @see [[getAsBooleanWithDefault]]
     */
    getAsBoolean(key: string): boolean;
    /**
     * Converts the item at the given key into a defaultable boolean object using
     * [[BooleanConverter.toBooleanWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a boolean or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[BooleanConverter.toBooleanWithDefault]]
     */
    getAsBooleanWithDefault(key: string, defaultValue: boolean): boolean;
    /**
     * Converts the item at the given key into a nullable integer object using
     * [[IntegerConverter.toNullableInteger]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable integer.
     *
     * @see [[IntegerConverter.toNullableInteger]]
     */
    getAsNullableInteger(key: string): number;
    /**
     * Converts the item at the given key into a defaultable integer object using
     * [[StringValueMap.getAsIntegerWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as an integer (or 0 as the default).
     *
     * @see [[getAsIntegerWithDefault]]
     */
    getAsInteger(key: string): number;
    /**
     * Converts the item at the given key into a defaultable integer object using
     * [[IntegerConverter.toIntegerWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as an integer or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[IntegerConverter.toIntegerWithDefault]]
     */
    getAsIntegerWithDefault(key: string, defaultValue: number): number;
    /**
     * Converts the item at the given key into a nullable long object using
     * [[LongConverter.toNullableLong]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable long.
     *
     * @see [[LongConverter.toNullableLong]]
     */
    getAsNullableLong(key: string): number;
    /**
     * Converts the item at the given key into a defaultable long object using
     * [[StringValueMap.getAsLongWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a long (or 0 as the default).
     *
     * @see [[getAsLongWithDefault]]
     */
    getAsLong(key: string): number;
    /**
     * Converts the item at the given key into a defaultable long object using
     * [[LongConverter.toLongWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a long or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[LongConverter.toLongWithDefault]]
     */
    getAsLongWithDefault(key: string, defaultValue: number): number;
    /**
     * Converts the item at the given key into a nullable float object using
     * [[FloatConverter.toNullableFloat]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable float.
     *
     * @see [[FloatConverter.toNullableFloat]]
     */
    getAsNullableFloat(key: string): number;
    /**
     * Converts the item at the given key into a defaultable float object using
     * [[StringValueMap.getAsFloatWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a float (or 0 as the default).
     *
     * @see [[getAsFloatWithDefault]]
     */
    getAsFloat(key: string): number;
    /**
     * Converts the item at the given key into a defaultable float object using
     * [[FloatConverter.toFloatWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a float or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[FloatConverter.toFloatWithDefault]]
     */
    getAsFloatWithDefault(key: string, defaultValue: number): number;
    /**
     * Converts the item at the given key into a nullable double object using
     * [[DoubleConverter.toNullableDouble]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable double.
     *
     * @see [[DoubleConverter.toNullableDouble]]
     */
    getAsNullableDouble(key: string): number;
    /**
     * Converts the item at the given key into a defaultable double object using
     * [[StringValueMap.getAsDoubleWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a double (or 0 as the default).
     *
     * @see [[getAsDoubleWithDefault]]
     */
    getAsDouble(key: string): number;
    /**
     * Converts the item at the given key into a defaultable double object using
     * [[DoubleConverter.toDoubleWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a double or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[DoubleConverter.toDoubleWithDefault]]
     */
    getAsDoubleWithDefault(key: string, defaultValue: number): number;
    /**
     * Converts the item at the given key into a nullable Datetime object using
     * [[DateTimeConverter.toNullableDateTime]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable Datetime.
     *
     * @see [[DateTimeConverter.toNullableDateTime]]
     */
    getAsNullableDateTime(key: string): Date;
    /**
     * Converts the item at the given key into a defaultable Datetime object using
     * [[StringValueMap.getAsDateTimeWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a Datetime (or null as the default).
     *
     * @see [[getAsDateTimeWithDefault]]
     */
    getAsDateTime(key: string): Date;
    /**
     * Converts the item at the given key into a defaultable Datetime object using
     * [[DateTimeConverter.toDateTimeWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a Datetime or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[DateTimeConverter.toDateTimeWithDefault]]
     */
    getAsDateTimeWithDefault(key: string, defaultValue: Date): Date;
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
    getAsNullableType<T>(type: TypeCode, key: string): T;
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
    getAsType<T>(type: TypeCode, key: string): T;
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
    getAsTypeWithDefault<T>(type: TypeCode, key: string, defaultValue: T): T;
    /**
     * Returns the item at the given key as an AnyValue object.
     *
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as an AnyValue object.
     *
     * @see [[AnyValue]]
     * @see [[AnyValue.constructor]]
     */
    getAsValue(key: string): AnyValue;
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
    getAsNullableArray(key: string): AnyValueArray;
    /**
     * Returns the item at the given key as an AnyValueArray object.
     *
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as an AnyValueArray object.
     *
     * @see [[AnyValueArray]]
     * @see [[AnyValueArray.fromValue]]
     */
    getAsArray(key: string): AnyValueArray;
    /**
     * Returns the item at the given key as an AnyValueArray object
     * (or 'defaultValue' if conversion is not possible).
     *
     * @param key           key of the item to retrieve.
     * @param defaultValue  value to use if the item at the given key cannot be converted
     *                      into an AnyValueArray.
     * @returns             the item at the given key as an AnyValueArray object or 'defaultValue'
     *                      (if conversion is not possible).
     *
     * @see [[AnyValueArray]]
     * @see [[getAsNullableArray]]
     */
    getAsArrayWithDefault(key: string, defaultValue: AnyValueArray): AnyValueArray;
    /**
     * Returns the item at the given key as a nullable AnyValueMap object.
     *
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as a nullable AnyValueMap object (returns
     *                  null if the item at the given key is null).
     *
     * @see [[fromValue]]
     */
    getAsNullableMap(key: string): AnyValueMap;
    /**
     * Returns the item at the given key as an AnyValueMap object.
     *
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as an AnyValueMap object.
     *
     * @see [[fromValue]]
     */
    getAsMap(key: string): AnyValueMap;
    /**
     * Returns the item at the given key as an AnyValueMap object
     * (or 'defaultValue' if conversion is not possible).
     *
     * @param key           key of the item to retrieve.
     * @param defaultValue  value to use if the item at the given key cannot be converted
     *                      into an AnyValueMap.
     * @returns             the item at the given key as an AnyValueMap object or 'defaultValue'
     *                      (if conversion is not possible).
     *
     * @see [[getAsNullableMap]]
     */
    getAsMapWithDefault(key: string, defaultValue: AnyValueMap): AnyValueMap;
    /**
     * @returns this StringValueMap as a semicolon-separated values string.
     *
     * Example: "key1=value1;key2;key3=value3".
     */
    toString(): string;
    /** @returns a clone of this object. */
    clone(): any;
    /**
     * Static method for creating a StringValueMap from a value.
     *
     * @param value     the value to initialize the new StringValueMap with.
     * @returns         the StringValueMap that was created and initialized with 'value'.
     *
     * @see [[StringValueMap]]
     */
    static fromValue(value: any): StringValueMap;
    /**
     * Static method for creating a StringValueMap from the tuples that are passed as parameters.
     *
     * @param tuples    the key-value tuple parameters to initialize the new StringValueMap with.
     * @returns         the StringValueMap created and filled by the tuples provided.
     *
     * @see [[fromTuplesArray]]
     */
    static fromTuples(...tuples: any[]): StringValueMap;
    /**
     * Static method for creating a StringValueMap from an array of tuples.
     *
     * @param tuples    the key-value tuples array to initialize the new StringValueMap with.
     * @returns         the StringValueMap created and filled by the 'tuples' array provided.
     */
    static fromTuplesArray(tuples: any[]): StringValueMap;
    /**
     * Static method for creating StringValueMaps from semicolon-separated values strings.
     *
     * @param line      semicolon-separated values string containing keys and values.
     *                  Example string: "key1=value1;key2;key3=value3".
     * @returns         the StringValueMap created, using the key-value pairs in 'line'.
     */
    static fromString(line: string): StringValueMap;
    /**
     * Static method for creating a StringValueMap using the maps passed as parameters.
     *
     * @param maps  the maps passed to this method to create a StringValueMap with.
     * @returns     the StringValueMap created.
     */
    static fromMaps(...maps: any[]): StringValueMap;
}
