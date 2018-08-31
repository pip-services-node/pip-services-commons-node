"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module random */
var RandomInteger_1 = require("./RandomInteger");
/**
 * Provides methods that can be used for generating random Dates/DateTimes, as well as updating existing DateTimes
 * by generating values in the range of 'original DateTime' ±'delta/range'
 *
 * ### Examples ###
 *
 * public MyMethod(min: Date, max: Date ) {
 *      let dateValue = RandomDateTime.nextDate(min, max);
 *      ...
 *
 *      let dateTimeValue = RandomDateTime.nextDateTime(min, max);
 *      ...
 * }
 */
var RandomDateTime = /** @class */ (function () {
    function RandomDateTime() {
    }
    /**
     * Generates a Date in the range ['minYear', 'maxYear'].
     *
     * @param min   minimum Date that will be generated.
     *              If 'max' is omitted, then 'max' is set to 'min' and 'min' is set to 2000-01-01.
     * @param max   (optional) maximum Date that will be generated. Defaults to 'min' if omitted.
     * @returns         generated random Date.
     */
    RandomDateTime.nextDate = function (min, max) {
        if (max === void 0) { max = null; }
        if (max == null) {
            max = min;
            min = new Date(2000, 0, 1);
        }
        var diff = max.getTime() - min.getTime();
        if (diff <= 0)
            return min;
        var time = min.getTime() + RandomInteger_1.RandomInteger.nextInteger(0, diff);
        var date = new Date(time);
        return new Date(date.getFullYear(), date.getMonth(), date.getDay());
    };
    /**
     * Generates a Date and time in the range ['minYear', 'maxYear'].
     *
     * @param min   minimum Date and time that will be generated.
     *              If 'max' is omitted, then 'max' is set to 'min' and 'min' is set to 2000-01-01.
     * @param max   (optional) maximum Date and time that will be generated. Defaults to 'min' if omitted.
     * @returns         generated random Date and time.
     */
    RandomDateTime.nextDateTime = function (min, max) {
        if (max === void 0) { max = null; }
        if (max == null) {
            max = min;
            min = new Date(2000, 0, 1);
        }
        var diff = max.getTime() - min.getTime();
        if (diff <= 0)
            return min;
        var time = min.getTime() + RandomInteger_1.RandomInteger.nextInteger(0, diff);
        return new Date(time);
    };
    /**
     * Generates a new DateTime that will differ from 'value' by a maximum of ±'range'.
     * If 'range' is omitted (or 0), then the generated DateTime will differ from 'value' by ±10 days.
     *
     * @param value     DateTime to update.
     * @param range     (optional) defines the maximum amount of milliseconds by which the new DateTime can differ from 'value'. If range is a negative number,
     *                  'value' will be returned. Defaults to 10 days if omitted or zero.
     * @returns         updated DateTime.
     */
    RandomDateTime.updateDateTime = function (value, range) {
        if (range === void 0) { range = null; }
        range = range != 0 && range != null ? range : 10 * 24 * 3600000;
        if (range < 0)
            return value;
        // Days to milliseconds
        range = range;
        var time = value.valueOf() + RandomInteger_1.RandomInteger.nextInteger(-range, range);
        return new Date(time);
    };
    return RandomDateTime;
}());
exports.RandomDateTime = RandomDateTime;
//# sourceMappingURL=RandomDateTime.js.map