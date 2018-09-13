"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module random */
/**
 * Provides methods that can be used for generating random booleans using 'chance' and 'nextBoolean' methods.
 *
 * ### Example ###
 *
 * Example usage:
 *
 *     public MyMethod(chances: number, maxChances: number) {
 *         let boolValue1 = RandomBoolean.chance(chances, maxChances);
 *         ...
 *
 *         let boolValue2 = RandomBoolean.nextBoolean();
 *         ...
 *     }
 */
var RandomBoolean = /** @class */ (function () {
    function RandomBoolean() {
    }
    /**
     * Generates a random boolean that has a 'chance'/'maxChances' chance of being true.
     *
     * The parameter 'maxChances' defines the length of the 'number line' to be used in the algorithm,
     * and 'chances' defines the length of the 'true' section, which is centered on the 'number line'.
     * A hit (a point on the 'number line') is chosen at random, and if the hit is in the 'true'
     * section - true is returned. Otherwise, the hit is considered to be a 'miss', and false is returned.
     *
     * @param chances       the chance of the hit being in the 'true' section.
     * @param maxChances    the overall length of the 'number line'.
     */
    RandomBoolean.chance = function (chances, maxChances) {
        chances = chances >= 0 ? chances : 0;
        maxChances = maxChances >= 0 ? maxChances : 0;
        if (chances == 0 && maxChances == 0)
            return false;
        maxChances = Math.max(maxChances, chances);
        var start = (maxChances - chances) / 2;
        var end = start + chances;
        var hit = Math.random() * maxChances;
        return hit >= start && hit <= end;
    };
    /**
     * Generates a boolean that has a 50/50 chance of being true.
     *
     * @returns a random boolean.
     */
    RandomBoolean.nextBoolean = function () {
        return Math.random() * 100 < 50;
    };
    return RandomBoolean;
}());
exports.RandomBoolean = RandomBoolean;
//# sourceMappingURL=RandomBoolean.js.map