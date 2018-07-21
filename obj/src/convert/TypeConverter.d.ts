import { TypeCode } from './TypeCode';
/**
 * Class that contains "soft" data converters. Soft data converters differ from the data conversion algorithms
 * found in typical programming language, due to the fact that they support rare conversions between various data
 * types (such as integer to timespan, timespan to string, and so on).
 *
 * @see TypeCode
 */
export declare class TypeConverter {
    /**
     * Static method that resolves the TypeCode that corresponds to the passed object's type.
     *
     * @param value 	object whose TypeCode is to be resolved.
     * @returns			the TypeCode that corresponds to the passed object's type.
     */
    static toTypeCode(value: any): TypeCode;
    /**
     * Static method that converts the object passed as 'value' to a nullable object of type T.
     *
     * @param type 		the TypeCode for the data type into which 'value' is to be converted.
     * @param value 	the value to convert.
     * @returns			'value' as an object of type T. If 'value' is null - null will be returned.
     *
     * @see #toTypeCode
     */
    static toNullableType<T>(type: TypeCode, value: any): T;
    /**
     * Static method that converts the object passed as 'value' to an object of type T.
     *
     * @param type 		the TypeCode for the data type into which 'value' is to be converted.
     * @param value 	the value to convert.
     * @returns			'value' as an object of type T. If the result of the conversion using
     * 					TypeConverter.toNullableType<T>(type, value) is null, then a default
     * 					value for the given type will be returned.
     *
     * @see #toNullableType<T>
     * @see #toTypeCode
     */
    static toType<T>(type: TypeCode, value: any): T;
    /**
     * Static method that converts the object passed as 'value' to an object of type T or returns
     * a default value, if the conversion is not possible (when null is returned).
     *
     * @param type 			the TypeCode for the data type into which 'value' is to be converted.
     * @param value 		the value to convert.
     * @param defaultValue	the default value to return if conversion fails (returns null).
     * @returns				'value' as an object of type T or 'defaultValue', if the result of the
     * 						conversion using TypeConverter.toNullableType<T>(type, value) is null.
     *
     * @see #toNullableType<T>
     * @see #toTypeCode
     */
    static toTypeWithDefault<T>(type: TypeCode, value: any, defaultValue: T): T;
    /**
     * Static method that converts a TypeCode into its string name.
     *
     * @param type 	the TypeCode to convert into a string.
     * @returns		the name of the TypeCode passed as a string value.
     */
    static toString(type: TypeCode): string;
}
