"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module random */
var RandomInteger_1 = require("./RandomInteger");
var RandomBoolean_1 = require("./RandomBoolean");
/**
 * Provides methods that can be used for generating random strings and chars, as well as picking at random strings/chars from a given set of strings/chars.
 */
var RandomString = /** @class */ (function () {
    function RandomString() {
    }
    /**
     * Picks a char at random from the string passed as 'values'
     *
     * @param values    chars to pick from.
     * @returns         randomly picked char.
     */
    RandomString.pickChar = function (values) {
        if (values == null || values.length == 0)
            return '';
        var index = RandomInteger_1.RandomInteger.nextInteger(values.length);
        return values.charAt(index);
    };
    /**
     * Picks a string at random from the string array passed as 'values'
     *
     * @param values    strings to pick from.
     * @returns         randomly picked string.
     */
    RandomString.pickString = function (values) {
        if (values == null || values.length == 0)
            return '';
        var index = RandomInteger_1.RandomInteger.nextInteger(values.length);
        return values[index];
    };
    /**
     * Distorts the string passed as 'value' by making it lower case and by
     * either adding a symbol ("_,.:-/.[].{},#-!,$=%.+^.&*-() ") to the end of the string,
     * or capitalizing the first letter of the string.
     *
     * @param value    string to distort.
     * @returns        initial string with only the first letter capitalized or with a symbol added to the end.
     */
    RandomString.distort = function (value) {
        value = value.toLowerCase();
        //Capitalize the first letter of the string 'value'.
        if (RandomBoolean_1.RandomBoolean.chance(1, 5))
            value = value.substring(0, 1).toUpperCase() + value.substring(1);
        //Add a symbol to the end of the string 'value' 
        if (RandomBoolean_1.RandomBoolean.chance(1, 3))
            value = value + RandomString.pickChar(RandomString._symbols);
        return value;
    };
    /**
     * Randomly generates a letter of the English alphabet.
     *
     * @returns a random letter of the English alphabet. Returned letter can be upper or lower case).
     */
    RandomString.nextAlphaChar = function () {
        var index = RandomInteger_1.RandomInteger.nextInteger(RandomString._alpha.length);
        return RandomString._alpha.charAt(index);
    };
    /**
     * Randomly generates a string, consisting of upper and lower case letters (of the English alphabet),
     * digits (0-9), and symbols ("_,.:-/.[].{},#-!,$=%.+^.&*-() ").
     *
     * @param minLength     minimum length of the string to be returned.
     * @param maxLength     maximum length of the string to be returned.
     * @returns             randomly generated string.
     */
    RandomString.nextString = function (minLength, maxLength) {
        var result = '';
        var length = RandomInteger_1.RandomInteger.nextInteger(minLength, maxLength);
        for (var i = 0; i < length; i++) {
            var index = RandomInteger_1.RandomInteger.nextInteger(RandomString._chars.length);
            result += RandomString._chars.charAt(index);
        }
        return result;
    };
    RandomString._digits = "01234956789";
    RandomString._symbols = "_,.:-/.[].{},#-!,$=%.+^.&*-() ";
    RandomString._alphaLower = "abcdefghijklmnopqrstuvwxyz";
    RandomString._alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    RandomString._alpha = RandomString._alphaUpper + RandomString._alphaLower;
    RandomString._chars = RandomString._alpha + RandomString._digits + RandomString._symbols;
    return RandomString;
}());
exports.RandomString = RandomString;
//# sourceMappingURL=RandomString.js.map