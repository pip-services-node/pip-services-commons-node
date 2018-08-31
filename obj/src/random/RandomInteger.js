"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module random */
/**
 * Provides methods that can be used for generating random integers, as well as updating existing integers
 * by generating values in the range of 'original value' ±'delta/range'. The 'sequence' method allows
 * for variable length integer array generation.
 *
 * ### Examples ###
 *
 * public MyMethod(min: number, max: number ) {
 *      let intValue = RandomInteger.nextInteger(min, max);
 *      ...
 * }
 */
var RandomInteger = /** @class */ (function () {
    function RandomInteger() {
    }
    /**
     * Generates a integer in the range ['min', 'max']. If 'max' is omitted, then the range will be set to [0, 'min'].
     *
     * @param min   minimum value of the integer that will be generated.
     *              If 'max' is omitted, then 'max' is set to 'min' and 'min' is set to 0.
     * @param max   (optional) maximum value of the integer that will be generated. Defaults to 'min' if omitted.
     * @returns     generated random integer value.
     */
    RandomInteger.nextInteger = function (min, max) {
        if (max === void 0) { max = null; }
        if (max == null) {
            max = min;
            min = 0;
        }
        if (max - min <= 0)
            return min;
        return Math.floor(min + Math.random() * (max - min));
    };
    /**
     * Generates a new integer that will differ from 'value' by a maximum of ±'range'. If range is omitted,
     * then the generated value will differ from 'value' by a maximum of ±10%.
     *
     * @param value     integer to update.
     * @param range     (optional) defines the maximum amount by which the new integer can differ from 'value'.
     *                  Defaults to 10% of 'value' (floored) if omitted.
     * @returns         updated integer value.
     */
    RandomInteger.updateInteger = function (value, range) {
        if (range === void 0) { range = null; }
        if (range == null)
            range = 0;
        range = range == 0 ? Math.floor(0.1 * value) : range;
        var minValue = value - range;
        var maxValue = value + range;
        return RandomInteger.nextInteger(minValue, maxValue);
    };
    /**
     * Generates an array of integers, whose values are identical to their indexes. The length of the array is randomly chosen from the range ['min', 'max'].
     * If 'max' is omitted, then the the array's length will be 'min'.
     *
     * @param min   minimum length of the array that will be generated. If 'max' is omitted, then 'min' defines the array's length .
     * @param max   (optional) maximum length of the array that will be generated.
     * @returns     generated array of integers.
     */
    RandomInteger.sequence = function (min, max) {
        if (max === void 0) { max = null; }
        max = max != null ? max : min;
        var count = RandomInteger.nextInteger(min, max);
        var result = [];
        for (var i = 0; i < count; i++)
            result.push(i);
        return result;
    };
    return RandomInteger;
}());
exports.RandomInteger = RandomInteger;
//# sourceMappingURL=RandomInteger.js.map