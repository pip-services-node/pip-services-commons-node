"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module convert */
/** @hidden */
var _ = require('lodash');
var TypeCode_1 = require("./TypeCode");
var TypeConverter_1 = require("./TypeConverter");
var TypeReflector_1 = require("../reflect/TypeReflector");
/**
 * Provides methods for converting nested maps using recursion.
 */
var RecursiveMapConverter = /** @class */ (function () {
    function RecursiveMapConverter() {
    }
    /**
     * Recursively converts the object passed into a map using [[valueToMap]].
     *
     * @param value the object to recursively convert into a map.
     *
     * @see [[valueToMap]]
     */
    RecursiveMapConverter.objectToMap = function (value) {
        if (value == null)
            return null;
        var result = {};
        var props = Object.keys(value);
        for (var i = 0; i < props.length; i++) {
            var propValue = value[props[i]];
            propValue = RecursiveMapConverter.valueToMap(propValue);
            result[props[i]] = propValue;
        }
        return result;
    };
    /**
     * Conversion cases:
     * - if 'value' is null, then null will be returned;
     * - if 'value' is a string or a primitive type, then it will be returned as is;
     * - if 'value' is a map, then it will be passed to [[mapToMap]], and the result will be returned;
     * - if 'value' is an array, then it will be passed to [[arrayToMap]], and the result will be returned;
     * - otherwise 'value' will be passed to [[objectToMap]], and the result will be returned;
     *
     * @param value the value to convert to a map recursively.
     *
     * @see [[mapToMap]]
     * @see [[arrayToMap]]
     * @see [[objectToMap]]
     */
    RecursiveMapConverter.valueToMap = function (value) {
        if (value == null)
            return null;
        // Skip expected non-primitive values
        if (_.isString(value))
            return value;
        var valueType = TypeConverter_1.TypeConverter.toTypeCode(value);
        // Skip primitive values
        if (TypeReflector_1.TypeReflector.isPrimitive(valueType))
            return value;
        if (valueType == TypeCode_1.TypeCode.Map)
            return RecursiveMapConverter.mapToMap(value);
        // Convert arrays
        if (valueType == TypeCode_1.TypeCode.Array)
            return RecursiveMapConverter.arrayToMap(value);
        return RecursiveMapConverter.objectToMap(value);
    };
    /**
     * Recursively converts the map passed using [[valueToMap]].
     *
     * @param value the map to recursively convert.
     *
     * @see [[valueToMap]]
     */
    RecursiveMapConverter.mapToMap = function (value) {
        var result = {};
        var keys = Object.keys(value);
        for (var i = 0; i < keys.length; i++) {
            result[keys[i]] = RecursiveMapConverter.valueToMap(value[keys[i]]);
        }
    };
    /**
     * Recursively converts the array passed into a map using [[valueToMap]].
     *
     * @param value the array to recursively convert into a map.
     *
     * @see [[valueToMap]]
     */
    RecursiveMapConverter.arrayToMap = function (value) {
        var result = [];
        for (var i = 0; i < value.length; i++) {
            result[i] = RecursiveMapConverter.valueToMap(value[i]);
        }
        return result;
    };
    /**
     * Static method for recursively converting the value passed to a nullable map using [[valueToMap]].
     *
     * @param value     the map to recursively convert.
     * @returns         the converted map or null.
     *
     * @see [[valueToMap]]
     */
    RecursiveMapConverter.toNullableMap = function (value) {
        return RecursiveMapConverter.valueToMap(value);
    };
    /**
     * Static method for recursively converting the value passed to a map using [[toNullableMap]]
     * (which uses [[valueToMap]]).
     *
     * @param value     the map to recursively convert.
     * @returns         the converted map or an empty map (if the conversion returns null).
     *
     * @see [[toNullableMap]]
     * @see [[valueToMap]]
     */
    RecursiveMapConverter.toMap = function (value) {
        return RecursiveMapConverter.toNullableMap(value) || {};
    };
    /**
     * Static method for recursively converting the value passed to a map using [[toNullableMap]]
     * (which uses [[valueToMap]]).
     *
     * @param value         the map to recursively convert.
     * @param defaultValue  the value to return if the conversion returns null.
     * @returns             the converted map or the default value (if the conversion returns null).
     *
     * @see [[toNullableMap]]
     * @see [[valueToMap]]
     */
    RecursiveMapConverter.toMapWithDefault = function (value, defaultValue) {
        return RecursiveMapConverter.toNullableMap(value) || defaultValue;
    };
    return RecursiveMapConverter;
}());
exports.RecursiveMapConverter = RecursiveMapConverter;
//# sourceMappingURL=RecursiveMapConverter.js.map