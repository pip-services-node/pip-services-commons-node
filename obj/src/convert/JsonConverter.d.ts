import { TypeCode } from './TypeCode';
/**
 * Provides methods for conversion between various data types and Javascript's object notation.
 */
export declare class JsonConverter {
    /**
     * Static method for converting JSON strings to nullable objects of type T.
     *
     * @param type 		the TypeCode for the data type into which 'value' is to be converted.
     * @param value 	the JSON string to convert.
     * @returns			'value' as an object of type T. If 'value' was null - null will be returned .
     */
    static fromJson<T>(type: TypeCode, value: string): T;
    /**
     * Static method for converting objects in to JSON strings.
     *
     * @param value 	the value to convert.
     * @returns			the string generated using JSON.stringify().
     *
     * @see https://www.w3schools.com/js/js_json_stringify.asp
     */
    static toJson(value: any): string;
    static fromToObject(value: any): any;
    /**
     * Static method for converting JSON strings to nullable maps. Uses
     * {@link https://www.w3schools.com/js/js_json_parse.asp JSON.parse()}
     * and {@link MapConverter#toNullableMap}.
     *
     * @param value 	the JSON string to convert.
     * @returns			the map created. If 'value' is null or the conversion
     * 					fails - null will be returned.
     *
     * @see https://www.w3schools.com/js/js_json_parse.asp JSON.parse()
     * @see MapConverter#toNullableMap
     */
    static toNullableMap(value: string): any;
    /**
     * Static method for converting JSON strings to maps using {@link #toNullableMap}.
     * An empty map will be used as the default value for the conversion.
     *
     * @param value 	the JSON string to convert.
     *
     * @see #toNullableMap
     */
    static toMap(value: string): any;
    /**
     * Static method for converting JSON strings to maps using {@link #toNullableMap}.
     * If null is returned by the conversion, then this method will return the default
     * value passed.
     *
     * @param value         the JSON string to convert.
     * @param defaultValue  the default value to return if the conversion returns null.
     *
     * @see #toNullableMap
     */
    static toMapWithDefault(value: string, defaultValue: any): any;
}
