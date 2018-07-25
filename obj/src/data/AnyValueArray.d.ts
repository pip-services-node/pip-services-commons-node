import { TypeCode } from '../convert/TypeCode';
import { ICloneable } from './ICloneable';
import { AnyValue } from './AnyValue';
import { AnyValueMap } from './AnyValueMap';
/**
 * Class that allows for usage of abstract, portable arrays. Stores a set of values, which can be retrieved
 * in various ways with the help of numerous converters.
 *
 * @see [[StringConverter]]
 * @see [[TypeConverter]]
 * @see [[BooleanConverter]]
 * @see [[IntegerConverter]]
 * @see [[LongConverter]]
 * @see [[DoubleConverter]]
 * @see [[FloatConverter]]
 * @see [[DateTimeConverter]]
 * @see [[ICloneable]]
 */
export declare class AnyValueArray extends Array<any> implements ICloneable {
    /**
     * Creates a new instance and sets its values to the 'values' passed
     * as a parameter. If 'values' are omitted, they can be set later on using
     * [[setAsObject]] or [[append]].
     *
     * @param values    the values to store in this AnyValueArray.
     */
    constructor(values?: any[]);
    /**
     * @param index     index of the item to retrieve from this AnyValueArray.
     * @returns         the item that is located at the given index.
     */
    get(index: number): any;
    /**
     * @param index     the index at which to insert the given value.
     * @param value     the value to insert into this AnyValueArray at the given index.
     */
    put(index: number, value: any): void;
    /**
     * @param index     index of the item to remove.
     */
    remove(index: number): void;
    /**
     * @param elements  items to append to this AnyValueArray.
     */
    append(elements: any[]): void;
    /** Removes all items from this AnyValueArray. */
    clear(): void;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index without any conversions or
     *                  all items, if 'index' is undefined or omitted.
     */
    getAsObject(index?: number): any;
    /**
     * @param index     the position in this AnyValueArray to set the value at.
     * @param value     the value to set in this AnyValueArray at the given 'index'.
     *                  If 'index' is omitted, then this AnyValueArray will be set (cleared and
     *                  filled anew) using 'value'. In this case 'value' will be converted to
     *                  an array using "ArrayConverter.toArray(value)" and set to this AnyValueArray.
     *
     * @see [[ArrayConverter.toArray]]
     */
    setAsObject(index: any, value?: any): void;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable string.
     *
     * @see [[StringConverter.toNullableString]]
     */
    getAsNullableString(index: number): string;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a string (or null as the default).
     *
     * @see [[getAsStringWithDefault]]
     */
    getAsString(index: number): string;
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a string or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[StringConverter.toStringWithDefault]]
     */
    getAsStringWithDefault(index: number, defaultValue: string): string;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable boolean.
     *
     * @see [[BooleanConverter.toNullableBoolean]]
     */
    getAsNullableBoolean(index: number): boolean;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a boolean (or false as the default).
     *
     * @see [[getAsBooleanWithDefault]]
     */
    getAsBoolean(index: number): boolean;
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a boolean or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[BooleanConverter.toBooleanWithDefault]]
     */
    getAsBooleanWithDefault(index: number, defaultValue: boolean): boolean;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable integer.
     *
     * @see [[IntegerConverter.toNullableInteger]]
     */
    getAsNullableInteger(index: number): number;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an integer (or 0 as the default).
     *
     * @see [[getAsIntegerWithDefault]]
     */
    getAsInteger(index: number): number;
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as an integer or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[IntegerConverter.toIntegerWithDefault]]
     */
    getAsIntegerWithDefault(index: number, defaultValue: number): number;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable long.
     *
     * @see [[LongConverter.toNullableLong]]
     */
    getAsNullableLong(index: number): number;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a long (or 0 as the default).
     *
     * @see [[getAsLongWithDefault]]
     */
    getAsLong(index: number): number;
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a long or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[LongConverter.toLongWithDefault]]
     */
    getAsLongWithDefault(index: number, defaultValue: number): number;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable float.
     *
     * @see [[FloatConverter.toNullableFloat]]
     */
    getAsNullableFloat(index: number): number;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a float (or 0 as the default).
     *
     * @see [[getAsFloatWithDefault]]
     */
    getAsFloat(index: number): number;
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a float or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[FloatConverter.toFloatWithDefault]]
     */
    getAsFloatWithDefault(index: number, defaultValue: number): number;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable double.
     *
     * @see [[DoubleConverter.toNullableDouble]]
     */
    getAsNullableDouble(index: number): number;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a double (or 0 as the default).
     *
     * @see [[getAsDoubleWithDefault]]
     */
    getAsDouble(index: number): number;
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a double or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[DoubleConverter.toDoubleWithDefault]]
     */
    getAsDoubleWithDefault(index: number, defaultValue: number): number;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable Datetime.
     *
     * @see [[DateTimeConverter.toNullableDateTime]]
     */
    getAsNullableDateTime(index: number): Date;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a Datetime (or null as the default).
     *
     * @see [[getAsDateTimeWithDefault]]
     */
    getAsDateTime(index: number): Date;
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a Datetime or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[DateTimeConverter.toDateTimeWithDefault]]
     */
    getAsDateTimeWithDefault(index: number, defaultValue: Date): Date;
    /**
     * Converts the item at the given index into a nullable object of type 'type' using
     * [[TypeConverter.toNullableType]] and returns it.
     *
     * @param type      the TypeCode to be used in TypeConverter.toNullableType<T>(TypeCode, value);
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable object of type 'type'.
     *
     * @see [[TypeConverter.toNullableType]]
     */
    getAsNullableType<T>(type: TypeCode, index: number): T;
    /**
     * Converts the item at the given index into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     *
     * @param type      the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, null);
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an object of type 'type' (or null as the default).
     *
     * @see [[getAsTypeWithDefault]]
     */
    getAsType<T>(type: TypeCode, index: number): T;
    /**
     * Converts the item at the given index into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     *
     * @param type              the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, defaultValue);
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as an object of type 'type' or the defaultValue,
     *                          if conversion is not possible.
     *
     * @see [[TypeConverter.toTypeWithDefault]]
     */
    getAsTypeWithDefault<T>(type: TypeCode, index: number, defaultValue: T): T;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an AnyValue object.
     *
     * @see [[AnyValue]]
     * @see [[AnyValue.AnyValue]]
     */
    getAsValue(index: number): AnyValue;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable AnyValueArray object (returns
     *                  null if the item at the given index is null).
     *
     * @see [[fromValue]]
     */
    getAsNullableArray(index: number): AnyValueArray;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an AnyValueArray object.
     *
     * @see [[fromValue]]
     */
    getAsArray(index: number): AnyValueArray;
    /**
     * @param index         index of the item to retrieve.
     * @param defaultValue  value to use if the item at the given index cannot be converted
     *                      into an AnyValueArray.
     * @returns             the item at the given index as an AnyValueArray object or 'defaultValue',
     *                      if conversion is not possible.
     *
     * @see [[getAsNullableArray]]
     */
    getAsArrayWithDefault(index: number, defaultValue: AnyValueArray): AnyValueArray;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable AnyValueMap object (returns
     *                  null if the item at the given index is null).
     *
     * @see [[AnyValueMap]]
     * @see [[AnyValueMap.fromValue]]
     */
    getAsNullableMap(index: number): AnyValueMap;
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an AnyValueMap object.
     *
     * @see [[AnyValueMap]]
     * @see [[AnyValueMap.fromValue]]
     */
    getAsMap(index: number): AnyValueMap;
    /**
     * @param index         index of the item to retrieve.
     * @param defaultValue  value to use if the item at the given index cannot be converted
     *                      into an AnyValueMap.
     * @returns             the item at the given index as an AnyValueMap object or 'defaultValue',
     *                      if conversion is not possible.
     *
     * @see [[getAsNullableMap]]
     */
    getAsMapWithDefault(index: number, defaultValue: AnyValueMap): AnyValueMap;
    /**
     * @param value     value to search for in this AnyValueArray.
     * @returns         whether or not this AnyValueArray contains the given value.
     */
    contains(value: any): boolean;
    /**
     * Checks whether or not this AnyValueArray contains a certain value as an object of type 'type'.
     * The value passed will be converted using [[TypeConverter.toType]], where as this AnyValueArray's
     * values will be converted using [[TypeConverter.toNullableType]]. After conversion, the value is searched
     * for amongst the AnyValueArray's converted values.
     *
     * @param type      the TypeCode to use for converting 'value' into an object of type 'type' using the
     *                  TypeConverter class.
     * @param value     the value to search for amongst this AnyValueArray's values after conversion.
     * @returns         whether or not this AnyValueArray contains the given value as an object of type
     *                  'type'. If both converted values are null, true will be returned.
     *
     * @see [[TypeConverter.toType]]
     * @see [[TypeConverter.toNullableType]]
     */
    containsAsType<T>(type: TypeCode, value: any): boolean;
    /** @returns a clone of this object. */
    clone(): any;
    /**
     * @returns this AnyValueArray as a comma-separated values string.
     *
     * Example: "value1,,value3".
     */
    toString(): string;
    /**
     * Static method for creating an AnyValueArray from the values passed as parameters.
     *
     * @param values    the values to initialize the AnyValueArray with, which are passed as parameters.
     * @returns         the AnyValueArray created and filled by the values provided.
     */
    static fromValues(...values: any[]): AnyValueArray;
    /**
     * Static method for creating an AnyValueArray from a value using [[ArrayConverter.toNullableArray]].
     *
     * @param value     value to convert to a nullable array and initialize the new AnyValueArray with.
     * @returns         the AnyValueArray that was created and filled by 'value'.
     *
     * @see [[ArrayConverter.toNullableArray]]
     */
    static fromValue(value: any): AnyValueArray;
    /**
     * Static method for creating an AnyValueArray from a string of 'values', separated using the char passed as
     * 'separator'.
     *
     * @param values            string of values, separated by the char passed as 'separator'
     * @param separator         char that is used to separate the values in the string passed as 'values'.
     * @param removeDuplicates  (optional) boolean that defines whether or not duplicate items should be removed.
     * @returns                 the AnyValueArray that was created and filled by 'values'.
     */
    static fromString(values: string, separator: string, removeDuplicates?: boolean): AnyValueArray;
}
