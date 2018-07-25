"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module convert */
var _ = require('lodash');
/**
 * Provides methods for converting various values to maps.
 */
var MapConverter = /** @class */ (function () {
    function MapConverter() {
    }
    /**
     * Static method for converting values to nullable maps.
     *
     * Conversion cases:
     * - if 'value' is null - null will be returned;
     * - if 'value' is an array - it will be converted to a map, whose keys are the array's indexes (as strings) and whose values
     * correspond to the values at the given indexes;
     * - if 'value' is an object (map) - it will be returned as is;
     * - otherwise - null will be returned.
     *
     * @param value     the value to convert.
     * @returns         the result of the conversion. If 'value' was null or is not convertible - null
     *                  will be returned.
     */
    MapConverter.toNullableMap = function (value) {
        if (value == null)
            return null;
        else if (_.isArray(value)) {
            var map = {};
            for (var i = 0; i < value.length; i++)
                map[i.toString()] = value[i];
            return map;
        }
        else
            return _.isObject(value) ? value : null;
    };
    /**
     * Static method for converting values to maps using [[toNullableMap]].
     * An empty map will be used as the default value for the conversion.
     *
     * @param value     the value to convert.
     *
     * @see [[toNullableMap]]
     */
    MapConverter.toMap = function (value) {
        return MapConverter.toNullableMap(value) || {};
    };
    /**
     * Static method for converting values to maps using [[toNullableMap]].
     * If null is returned by the conversion, then this method will return the default
     * value passed.
     *
     * @param value         the value to convert.
     * @param defaultValue  the default value to return if the conversion returns null.
     *
     * @see [[toNullableMap]]
     */
    MapConverter.toMapWithDefault = function (value, defaultValue) {
        return MapConverter.toNullableMap(value) || defaultValue;
    };
    return MapConverter;
}());
exports.MapConverter = MapConverter;
//# sourceMappingURL=MapConverter.js.map