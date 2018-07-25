"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module random */
const RandomInteger_1 = require("./RandomInteger");
/**
 * Allows for picking items at random from an array of type T.
 */
class RandomArray {
    /**
     * Picks an item at random from the array 'values'.
     *
     * @param values    array of items to pick from.
     * @returns         picked item.
     */
    static pick(values) {
        if (values == null || values.length == 0)
            return null;
        return values[RandomInteger_1.RandomInteger.nextInteger(values.length)];
    }
}
exports.RandomArray = RandomArray;
//# sourceMappingURL=RandomArray.js.map