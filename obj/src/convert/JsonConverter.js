"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeConverter_1 = require("./TypeConverter");
const MapConverter_1 = require("./MapConverter");
/**
 * Provides methods for conversion between various data types and Javascript's object notation.
 */
class JsonConverter {
    /**
     * Static method for converting JSON strings to nullable objects of type T.
     *
     * @param type 		the TypeCode for the data type into which 'value' is to be converted.
     * @param value 	the JSON string to convert.
     * @returns			'value' as an object of type T. If 'value' was null - null will be returned .
     */
    static fromJson(type, value) {
        if (value == null)
            return null;
        let temp = JSON.parse(value);
        return TypeConverter_1.TypeConverter.toType(type, temp);
    }
    /**
     * Static method for converting objects in to JSON strings.
     *
     * @param value 	the value to convert.
     * @returns			the string generated using the standard JSON stringify method.
     */
    static toJson(value) {
        if (value == null)
            return null;
        return JSON.stringify(value);
    }
    /**
     * Static method for converting JSON strings to nullable maps. Uses
     * the standard JSON parse method and [[MapConverter.toNullableMap]].
     *
     * @param value 	the JSON string to convert.
     * @returns			the map created. If 'value' is null or the conversion
     * 					fails - null will be returned.
     *
     * @see [[MapConverter.toNullableMap]]
     */
    static toNullableMap(value) {
        if (value == null)
            return null;
        try {
            let map = JSON.parse(value);
            return MapConverter_1.MapConverter.toNullableMap(map);
        }
        catch (Exception) {
            return null;
        }
    }
    /**
     * Static method for converting JSON strings to maps using [[toNullableMap]].
     * An empty map will be used as the default value for the conversion.
     *
     * @param value 	the JSON string to convert.
     *
     * @see [[toNullableMap]]
     */
    static toMap(value) {
        let result = JsonConverter.toNullableMap(value);
        return result != null ? result : {};
    }
    /**
     * Static method for converting JSON strings to maps using [[toNullableMap]].
     * If null is returned by the conversion, then this method will return the default
     * value passed.
     *
     * @param value         the JSON string to convert.
     * @param defaultValue  the default value to return if the conversion returns null.
     *
     * @see [[toNullableMap]]
     */
    static toMapWithDefault(value, defaultValue) {
        let result = JsonConverter.toNullableMap(value);
        return result != null ? result : defaultValue;
    }
}
exports.JsonConverter = JsonConverter;
//# sourceMappingURL=JsonConverter.js.map