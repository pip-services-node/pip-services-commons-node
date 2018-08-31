"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module convert */
/** @hidden */
var _ = require('lodash');
/**
 * Provides methods for converting various values to the boolean data type.
 *
 * ### Examples ###
 *
 * public MyMethod (value: any) {
 * 		let boolValue = BooleanConverter.toBoolean(value);
 * 		...
 * }
 */
var BooleanConverter = /** @class */ (function () {
    function BooleanConverter() {
    }
    /**
     * Static method for converting values to nullable booleans.
     *
     * Conversion cases:
     * - if 'value' is null - null will be returned;
     * - if 'value' is already a boolean - it will be returned as is;
     * - if 'value' is a number - 0 is false, all other numbers are true;
     * - if value.toString().toLowerCase() is comparable to "1", "true", "t", "yes", "y";
     * or "0", "false", "f", "no", "n" - the corresponding boolean value will be returned;
     * - otherwise - null will be returned.
     *
     * @param value     the value to convert.
     * @returns         the result of the conversion. If 'value' was null or is not convertible - null
     *                  will be returned.
     */
    BooleanConverter.toNullableBoolean = function (value) {
        if (value == null)
            return null;
        if (_.isBoolean(value))
            return value;
        if (_.isNumber(value))
            return !!value;
        value = value.toString().toLowerCase();
        if (value == '1' || value == 'true' || value == 't' || value == 'yes' || value == 'y')
            return true;
        if (value == '0' || value == 'false' || value == 'f' || value == 'no' || value == 'n')
            return false;
        return null;
    };
    /**
     * Static method for converting values to booleans using [[toBooleanWithDefault]].
     * False will be used as the default value for the conversion.
     *
     * @param value     the value to convert.
     *
     * @see [[toBooleanWithDefault]]
     */
    BooleanConverter.toBoolean = function (value) {
        return BooleanConverter.toBooleanWithDefault(value, false);
    };
    /**
     * Static method for converting values to booleans using [[toNullableBoolean]].
     * If null is returned by the conversion, then this method will return the default
     * value passed.
     *
     * @param value         the value to convert.
     * @param defaultValue  the default value to return if the conversion returns null.
     *                      Defaults to false if omitted.
     *
     * @see [[toNullableBoolean]]
     */
    BooleanConverter.toBooleanWithDefault = function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = false; }
        var result = BooleanConverter.toNullableBoolean(value);
        return result != null ? result : defaultValue;
    };
    return BooleanConverter;
}());
exports.BooleanConverter = BooleanConverter;
//# sourceMappingURL=BooleanConverter.js.map