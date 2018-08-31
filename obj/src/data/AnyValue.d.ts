/** @module data */
import { TypeCode } from '../convert/TypeCode';
import { ICloneable } from './ICloneable';
import { AnyValueArray } from './AnyValueArray';
import { AnyValueMap } from './AnyValueMap';
/**
 * Class that allows for usage of abstract, portable data types. Stores a value in its
 * 'value' field, which can be retrieved in various ways with the help of numerous converters.
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
 *
 * ### Examples ###
 *
 * public MyMethod (value: any) {
 * 		let anyValue = new AnyValue(value);
 * 		...
 * }
 */
export declare class AnyValue implements ICloneable {
    /** The value stored by this object. */
    value: any;
    /**
     * Creates a new object and sets its 'value' field to the value passed
     * as a parameter. If 'value' is omitted, it can be set later on using
     * [[setAsObject]].
     *
     * @param value     value to store in this object's 'value' field. If this
     *                  parameter is an instance of AnyValue, its 'value' field will
     *                  be stored instead.
     */
    constructor(value?: any);
    /**
     * Converts this object's 'value' field into a TypeCode object using
     * [[TypeConverter.toTypeCode]] and returns it.
     *
     * @returns this object's 'value' field as a TypeCode.
     *
     * @see [[TypeConverter.toTypeCode]]
     */
    getTypeCode(): TypeCode;
    /** @returns this object's 'value' field without any conversions. */
    getAsObject(): any;
    /**
     * Sets 'value' instead of existing value if this parameter is an instance of AnyValue.
     *
     * @param value     value to store in this object's 'value' field. If this
     *                  parameter is an instance of AnyValue, its 'value' field will
     *                  be stored instead.
     */
    setAsObject(value: any): any;
    /**
     * Converts this object's 'value' field into a nullable string object using
     * [[StringConverter.toNullableString]] and returns it.
     *
     * @returns this object's 'value' field as a nullable string.
     *
     * @see [[StringConverter.toNullableString]]
     */
    getAsNullableString(): string;
    /**
     * Converts this object's 'value' field into a default string object using
     * [[AnyValue.getAsStringWithDefault]] and returns this object's 'value' field as a string (or null as the default).
     *
     * @returns this object's 'value' field as a string (or null as the default).
     *
     * @see [[getAsStringWithDefault]]
     */
    getAsString(): string;
    /**
     * Converts this object's 'value' field into a default string object using
     * [[StringConverter.toStringWithDefault]] and returns this object's 'value' field as a string or the defaultValue.
     *
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as a string or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[StringConverter.toStringWithDefault]]
     */
    getAsStringWithDefault(defaultValue: string): string;
    /**
     * Converts this object's 'value' field into a nullable boolean object using
     * [[BooleanConverter.toNullableBoolean]] and returns it.
     *
     * @returns this object's 'value' field as a nullable boolean.
     *
     * @see [[BooleanConverter.toNullableBoolean]]
     */
    getAsNullableBoolean(): boolean;
    /**
     * Converts this object's 'value' field into a default boolean object using
     * [[AnyValue.getAsBooleanWithDefault]] and returns this object's 'value' field as a boolean (or false as the default).
     *
     * @returns this object's 'value' field as a boolean (or false as the default).
     *
     * @see [[getAsBooleanWithDefault]]
     */
    getAsBoolean(): boolean;
    /**
     * Converts this object's 'value' field into a default boolean object using
     * [[BooleanConverter.toBooleanWithDefault]] and returns this object's 'value' field as a boolean or the defaultValue.
     *
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as a boolean or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[BooleanConverter.toBooleanWithDefault]]
     */
    getAsBooleanWithDefault(defaultValue: boolean): boolean;
    /**
     * Converts this object's 'value' field into a nullable integer object using
     * [[IntegerConverter.toNullableInteger]] and returns it.
     *
     * @returns this object's 'value' field as a nullable integer.
     *
     * @see [[IntegerConverter.toNullableInteger]]
     */
    getAsNullableInteger(): number;
    /**
     * Converts this object's 'value' field into a default integer object using
     * [[AnyValue.getAsIntegerWithDefault]] and returns this object's 'value' field as an integer (or 0 as the default).
     *
     * @returns this object's 'value' field as an integer (or 0 as the default).
     *
     * @see [[getAsIntegerWithDefault]]
     */
    getAsInteger(): number;
    /**
     * Converts this object's 'value' field into a default integer object using
     * [[IntegerConverter.toIntegerWithDefault]] and returns this object's 'value' field as an integer or the defaultValue.
     *
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as an integer or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[IntegerConverter.toIntegerWithDefault]]
     */
    getAsIntegerWithDefault(defaultValue: number): number;
    /**
     * Converts this object's 'value' field into a nullable long object using
     * [[LongConverter.toNullableLong]] and returns it.
     *
     * @returns this object's 'value' field as a nullable long.
     *
     * @see [[LongConverter.toNullableLong]]
     */
    getAsNullableLong(): number;
    /**
     * Converts this object's 'value' field into a default long object using
     * [[AnyValue.getAsLongWithDefault]] and returns this object's 'value' field as a long (or 0 as the default).
     *
     * @returns this object's 'value' field as a long (or 0 as the default).
     *
     * @see [[getAsLongWithDefault]]
     */
    getAsLong(): number;
    /**
     * Converts this object's 'value' field into a default long object using
     * [[LongConverter.toLongWithDefault]] and returns this object's 'value' field as a long or the defaultValue.
     *
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as a long or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[LongConverter.toLongWithDefault]]
     */
    getAsLongWithDefault(defaultValue: number): number;
    /**
     * Converts this object's 'value' field into a nullable float object using
     * [[FloatConverter.toNullableFloat]] and returns it.
     *
     * @returns this object's 'value' field as a nullable float.
     *
     * @see [[FloatConverter.toNullableFloat]]
     */
    getAsNullableFloat(): number;
    /**
     * Converts this object's 'value' field into a default float object using
     * [[AnyValue.getAsFloatWithDefault]] and returns this object's 'value' field as a float (or 0 as the default).
     *
     * @returns this object's 'value' field as a float (or 0 as the default).
     *
     * @see [[getAsFloatWithDefault]]
     */
    getAsFloat(): number;
    /**
     * Converts this object's 'value' field into a default float object using
     * [[FloatConverter.toFloatWithDefault]] and returns this object's 'value' field as a float or the defaultValue.
     *
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as a float or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[FloatConverter.toFloatWithDefault]]
     */
    getAsFloatWithDefault(defaultValue: number): number;
    /**
     * Converts this object's 'value' field into a nullable double object using
     * [[DoubleConverter.toNullableDouble]] and returns it.
     *
     * @returns this object's 'value' field as a nullable double.
     *
     * @see [[DoubleConverter.toNullableDouble]]
     */
    getAsNullableDouble(): number;
    /**
     * Converts this object's 'value' field into a default double object using
     * [[AnyValue.getAsDoubleWithDefault]] and returns this object's 'value' field as a double (or 0 as the default).
     *
     * @returns this object's 'value' field as a double (or 0 as the default).
     *
     * @see [[getAsDoubleWithDefault]]
     */
    getAsDouble(): number;
    /**
     * Converts this object's 'value' field into a default double object using
     * [[DoubleConverter.toDoubleWithDefault]] and returns this object's 'value' field as a double or the defaultValue.
     *
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as a double or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[DoubleConverter.toDoubleWithDefault]]
     */
    getAsDoubleWithDefault(defaultValue: number): number;
    /**
     * Converts this object's 'value' field into a nullable Datetime object using
     * [[DateTimeConverter.toNullableDateTime]] and returns it.
     *
     * @returns this object's 'value' field as a nullable Datetime.
     *
     * @see [[DateTimeConverter.toNullableDateTime]]
     */
    getAsNullableDateTime(): Date;
    /**
     * Converts this object's 'value' field into a default Datetime object using
     * [[AnyValue.getAsDateTimeWithDefault]] and returns this object's 'value' field as a Datetime (or null as the default).
     *
     * @returns this object's 'value' field as a Datetime (or null as the default).
     *
     * @see [[getAsDateTimeWithDefault]]
     */
    getAsDateTime(): Date;
    /**
     * Converts this object's 'value' field into a default Datetime object using
     * [[DateTimeConverter.toDateTimeWithDefault]] and returns this object's 'value' field as a Datetime or the defaultValue.
     *
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as a Datetime or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[DateTimeConverter.toDateTimeWithDefault]]
     */
    getAsDateTimeWithDefault(defaultValue: Date): Date;
    /**
     * Converts this object's 'value' field into a nullable object of type 'type' using
     * [[TypeConverter.toNullableType]] and returns it.
     *
     * @param type      the TypeCode to be used in TypeConverter.toNullableType<T>(TypeCode, value);
     * @returns this object's 'value' field as a nullable object of type 'type'.
     *
     * @see [[TypeConverter.toNullableType]]
     */
    getAsNullableType<T>(type: TypeCode): T;
    /**
     * Converts this object's 'value' field into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     *
     * @param type      the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, null);
     * @returns this object's 'value' field as an object of type 'type' (or null as the default).
     *
     * @see [[getAsTypeWithDefault]]
     */
    getAsType<T>(type: TypeCode): T;
    /**
     * Converts this object's 'value' field into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     *
     * @param type              the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, defaultValue);
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as an object of type 'type' or the defaultValue,
     *                          if conversion is not possible.
     *
     * @see [[TypeConverter.toTypeWithDefault]]
     */
    getAsTypeWithDefault<T>(type: TypeCode, defaultValue: T): T;
    /**
     * Returns this object's 'value' field as an AnyValueArray.
     *
     * @returns this object's 'value' field as an AnyValueArray.
     *
     * @see [[AnyValueArray.fromValue]]
     */
    getAsArray(): AnyValueArray;
    /**
     * Returns this object's 'value' field as an AnyValueMap.
     *
     * @returns this object's 'value' field as an AnyValueMap.
     *
     * @see [[AnyValueMap.fromValue]]
     */
    getAsMap(): AnyValueMap;
    /**
     * Checks whether or not the parameter passed as 'obj' is equal to this object's
     * 'value' field.
     *
     * @param obj   the object to check against this object's 'value' field. If 'obj'
     *              is an instance of AnyValue, its 'value' field will be used.
     * @returns     whether or not this object's 'value' field and 'obj' are equal.
     *              If both items are null, true will be returned.
     */
    equals(obj: any): boolean;
    /**
     * Checks whether or not the parameter passed as 'obj' is equal to this object's
     * 'value' field after both are converted to the type passed as 'type' using
     * [[TypeConverter.toType]].
     *
     * @param type  the TypeCode to use in TypeConverter.toType<T>(TypeCode, value).
     * @param obj   the object to check against this object's 'value' field after
     *              conversion. If 'obj' is an instance of AnyValue, then its 'value'
     *              field will be used.
     * @returns     whether or not this object's 'value' field and 'obj' are equal
     *              as objects of type 'type'. If both items (or their converted versions)
     *              are null, true will be returned.
     *
     * @see [[TypeConverter.toType]]
     */
    equalsAsType<T>(type: TypeCode, obj: any): boolean;
    /** @returns a clone of this object. */
    clone(): any;
    /**
     * @returns this object's 'value' field as a string value using [[StringConverter.toString]].
     *
     * @see [[StringConverter.toString]]
     */
    toString(): any;
    /** @returns the hash code of this object's 'value' field. 0 is returned if the 'value' field is null. */
    hashCode(): number;
}
