"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module convert */
/** @hidden */
var _ = require('lodash');
var TypeCode_1 = require("./TypeCode");
var StringConverter_1 = require("./StringConverter");
var IntegerConverter_1 = require("./IntegerConverter");
var LongConverter_1 = require("./LongConverter");
var FloatConverter_1 = require("./FloatConverter");
var DoubleConverter_1 = require("./DoubleConverter");
var DateTimeConverter_1 = require("./DateTimeConverter");
var ArrayConverter_1 = require("./ArrayConverter");
var MapConverter_1 = require("./MapConverter");
/**
 * Class that uses the converters available in this package to perform "soft" data conversions between various data types,
 * as well as resolve the [[TypeCode]] of an object.
 *
 * Soft data converters differ from the data conversion algorithms found in typical programming language, due to the fact
 * that they support rare conversions between various data types (such as integer to timespan, timespan to string, and so on).
 *
 * @see [[TypeCode]]
 *
 * ### Examples ###
 *
 *     public MyMethod(TypeCode.Long, value: any) {
 *         let longValue = TypeConverter.toType(value);
 *         ...
 *     }
 */
var TypeConverter = /** @class */ (function () {
    function TypeConverter() {
    }
    /**
     * Static method that resolves the TypeCode that corresponds to the passed object's type.
     *
     * @param value 	object whose TypeCode is to be resolved.
     * @returns			the TypeCode that corresponds to the passed object's type.
     */
    TypeConverter.toTypeCode = function (value) {
        if (value == null)
            return TypeCode_1.TypeCode.Unknown;
        if (_.isArray(value))
            return TypeCode_1.TypeCode.Array;
        if (_.isBoolean(value))
            return TypeCode_1.TypeCode.Boolean;
        if (_.isDate(value))
            return TypeCode_1.TypeCode.DateTime;
        if (_.isInteger(value))
            return TypeCode_1.TypeCode.Long;
        if (_.isNumber(value))
            return TypeCode_1.TypeCode.Double;
        if (_.isFunction(value))
            return TypeCode_1.TypeCode.Object;
        if (_.isObject(value))
            return TypeCode_1.TypeCode.Map;
        if (_.isString(value)) {
            // if (value == "undefined")
            //     return TypeCode.Unknown;
            // if (value == "object")
            //     return TypeCode.Map;
            // if (value == "boolean")
            //     return TypeCode.Boolean;
            // if (value == "number")
            //     return TypeCode.Double;
            // if (value == "string")
            //     return TypeCode.String;
            // if (value == "function")
            //     return TypeCode.Object;
            return TypeCode_1.TypeCode.String;
        }
        return TypeCode_1.TypeCode.Object;
    };
    /**
     * Static method that converts the object passed as 'value' to a nullable object of type T.
     *
     * @param type 		the TypeCode for the data type into which 'value' is to be converted.
     * @param value 	the value to convert.
     * @returns			'value' as an object of type T. If 'value' is null - null will be returned.
     *
     * @see [[toTypeCode]]
     */
    TypeConverter.toNullableType = function (type, value) {
        if (value == null)
            return null;
        // Convert to known types
        if (type == TypeCode_1.TypeCode.String)
            value = StringConverter_1.StringConverter.toNullableString(value);
        else if (type == TypeCode_1.TypeCode.Integer)
            value = IntegerConverter_1.IntegerConverter.toNullableInteger(value);
        else if (type == TypeCode_1.TypeCode.Long)
            value = LongConverter_1.LongConverter.toNullableLong(value);
        else if (type == TypeCode_1.TypeCode.Float)
            value = FloatConverter_1.FloatConverter.toNullableFloat(value);
        else if (type == TypeCode_1.TypeCode.Double)
            value = DoubleConverter_1.DoubleConverter.toNullableDouble(value);
        else if (type == TypeCode_1.TypeCode.DateTime)
            value = DateTimeConverter_1.DateTimeConverter.toNullableDateTime(value);
        else if (type == TypeCode_1.TypeCode.Array)
            value = ArrayConverter_1.ArrayConverter.toNullableArray(value);
        else if (type == TypeCode_1.TypeCode.Map)
            value = MapConverter_1.MapConverter.toNullableMap(value);
        return value;
    };
    /**
     * Static method that converts the object passed as 'value' to an object of type T.
     *
     * @param type 		the TypeCode for the data type into which 'value' is to be converted.
     * @param value 	the value to convert.
     * @returns			'value' as an object of type T. If the result of the conversion using
     * 					TypeConverter.toNullableType<T>(type, value) is null, then a default
     * 					value for the given type will be returned.
     *
     * @see [[toNullableType]]
     * @see [[toTypeCode]]
     */
    TypeConverter.toType = function (type, value) {
        // Convert to the specified type
        var result = TypeConverter.toNullableType(type, value);
        if (result != null)
            return result;
        // Define and return default value based on type
        if (type == TypeCode_1.TypeCode.Integer)
            value = 0;
        else if (type == TypeCode_1.TypeCode.Long)
            value = 0;
        else if (type == TypeCode_1.TypeCode.Float)
            value = 0;
        else if (type == TypeCode_1.TypeCode.Double)
            value = 0;
        else if (type == TypeCode_1.TypeCode.Boolean) // cases from here down were added by Mark Makarychev.
            value = false;
        else if (type == TypeCode_1.TypeCode.String)
            value = "";
        else if (type == TypeCode_1.TypeCode.DateTime)
            value = new Date();
        else if (type == TypeCode_1.TypeCode.Map)
            value = {};
        else if (type == TypeCode_1.TypeCode.Array)
            value = [];
        return value;
    };
    /**
     * Static method that converts the object passed as 'value' to an object of type T or returns
     * a default value if the conversion is not possible (when null is returned).
     *
     * @param type 			the TypeCode for the data type into which 'value' is to be converted.
     * @param value 		the value to convert.
     * @param defaultValue	the default value to return if conversion is not possible (returns null).
     * @returns				'value' as an object of type T or 'defaultValue' (if the result of the
     * 						conversion using TypeConverter.toNullableType<T>(type, value) is null).
     *
     * @see [[toNullableType]]
     * @see [[toTypeCode]]
     */
    TypeConverter.toTypeWithDefault = function (type, value, defaultValue) {
        var result = TypeConverter.toNullableType(type, value);
        return result != null ? result : defaultValue;
    };
    /**
     * Static method that converts a TypeCode into its string name.
     *
     * @param type 	the TypeCode to convert into a string.
     * @returns		the name of the TypeCode passed as a string value.
     */
    TypeConverter.toString = function (type) {
        switch (type) {
            case TypeCode_1.TypeCode.Unknown:
                return "unknown";
            case TypeCode_1.TypeCode.String:
                return "string";
            case TypeCode_1.TypeCode.Boolean:
                return "boolean";
            case TypeCode_1.TypeCode.Integer:
                return "integer";
            case TypeCode_1.TypeCode.Long:
                return "long";
            case TypeCode_1.TypeCode.Float:
                return "float";
            case TypeCode_1.TypeCode.Double:
                return "double";
            case TypeCode_1.TypeCode.DateTime:
                return "datetime";
            case TypeCode_1.TypeCode.Duration:
                return "duration";
            case TypeCode_1.TypeCode.Object:
                return "object";
            case TypeCode_1.TypeCode.Enum:
                return "enum";
            case TypeCode_1.TypeCode.Array:
                return "array";
            case TypeCode_1.TypeCode.Map:
                return "map";
            default:
                return "unknown";
        }
    };
    return TypeConverter;
}());
exports.TypeConverter = TypeConverter;
//# sourceMappingURL=TypeConverter.js.map