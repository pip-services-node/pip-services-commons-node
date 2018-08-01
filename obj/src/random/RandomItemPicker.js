"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module random */
var RandomInteger_1 = require("./RandomInteger");
/**
 * Allows for picking items at random from an array of type T.
 */
var RandomItemPicker = /** @class */ (function () {
    function RandomItemPicker() {
    }
    /**
     * Picks an item at random from the array 'values'.
     *
     * @param values    array of items to pick from.
     * @returns         picked item.
     */
    RandomItemPicker.pick = function (values) {
        if (values == null || values.length == 0)
            return null;
        return values[RandomInteger_1.RandomInteger.nextInteger(values.length)];
    };
    return RandomItemPicker;
}());
exports.RandomItemPicker = RandomItemPicker;
//# sourceMappingURL=RandomItemPicker.js.map