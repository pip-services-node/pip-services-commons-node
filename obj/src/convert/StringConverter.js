"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module convert */
let _ = require('lodash');
/**
 * Provides methods for converting various values to the string data type.
 */
class StringConverter {
    /**
     * Static method for converting values to nullable strings.
     *
     * Conversion cases:
     * - if 'value' is null - null will be returned,
     * - if 'value' is already a string - it will be returned as is,
     * - if 'value' is a Date - its ISO string will be returned (for example: "2011-10-05T14:48:00.000Z"),
     * - otherwise - the result of value.toString() will be returned.
     *
     * @param value     the value to convert.
     * @returns         the result of the conversion. If 'value' was null, null will be returned.
     */
    static toNullableString(value) {
        if (value == null)
            return null;
        if (_.isString(value))
            return value;
        if (_.isDate(value))
            return value.toISOString();
        return value.toString();
    }
    /**
     * Static method for converting values to strings using [[toStringWithDefault]].
     * An empty string ("") will be used as the default value for the conversion.
     *
     * @param value     the value to convert.
     *
     * @see [[toStringWithDefault]]
     */
    static toString(value) {
        return StringConverter.toStringWithDefault(value, "");
    }
    /**
     * Static method for converting values to strings using [[toNullableString]].
     * If null is returned by the conversion, then this method will return the default
     * value passed.
     *
     * @param value         the value to convert.
     * @param defaultValue  the default value to return if the conversion returns null.
     *
     * @see [[toNullableString]]
     */
    static toStringWithDefault(value, defaultValue) {
        return StringConverter.toNullableString(value) || defaultValue;
    }
}
exports.StringConverter = StringConverter;
//# sourceMappingURL=StringConverter.js.map