"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module random */
/**
 * Provides methods that can be used for generating random floats, as well as updating existing floats
 * by generating a value in the range of 'original value' ±'delta/range'.
 *
 * ### Examples ###
 *
 * Example usage:
 *
 *     public MyMethod(min: number, max: number ) {
 *         let floatValue = RandomFloat.nextFloat(min, max);
 *         ...
 *     }
 */
var RandomFloat = /** @class */ (function () {
    function RandomFloat() {
    }
    /**
     * Generates a float in the range ['min', 'max']. If 'max' is omitted, then the range will be set to [0, 'min'].
     *
     * @param min   minimum value of the float that will be generated.
     *              If 'max' is omitted, then 'max' is set to 'min' and 'min' is set to 0.
     * @param max   (optional) maximum value of the float that will be generated. Defaults to 'min' if omitted.
     * @returns     generated random float value.
     */
    RandomFloat.nextFloat = function (min, max) {
        if (max === void 0) { max = null; }
        if (max == null) {
            max = min;
            min = 0;
        }
        if (max - min <= 0)
            return min;
        return min + Math.random() * (max - min);
    };
    /**
     * Generates a new float that will differ from 'value' by a maximum of ±'range'. If range is omitted,
     * then the generated value will differ from 'value' by a maximum of ±10%.
     *
     * @param value     float to update.
     * @param range     (optional) defines the maximum amount by which the new float can differ from 'value'.
     *                  Defaults to 10% of 'value' if omitted.
     * @returns         updated float value.
     */
    RandomFloat.updateFloat = function (value, range) {
        if (range === void 0) { range = null; }
        if (range == null)
            range = 0;
        range = range == 0 ? 0.1 * value : range;
        var minValue = value - range;
        var maxValue = value + range;
        return RandomFloat.nextFloat(minValue, maxValue);
    };
    return RandomFloat;
}());
exports.RandomFloat = RandomFloat;
//# sourceMappingURL=RandomFloat.js.map