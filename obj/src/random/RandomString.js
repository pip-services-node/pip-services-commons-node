"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module random */
const RandomInteger_1 = require("./RandomInteger");
const RandomBoolean_1 = require("./RandomBoolean");
/**
 * Provides methods that can be used for generating random strings and chars, as well as picking at random strings/chars from a given set of strings/chars.
 */
class RandomString {
    /**
     * Picks a char at random from the string passed as 'values'
     *
     * @param values    chars to pick from.
     * @returns         randomly picked char.
     */
    static pickChar(values) {
        if (values == null || values.length == 0)
            return '';
        let index = RandomInteger_1.RandomInteger.nextInteger(values.length);
        return values.charAt(index);
    }
    /**
     * Picks a string at random from the string array passed as 'values'
     *
     * @param values    strings to pick from.
     * @returns         randomly picked string.
     */
    static pick(values) {
        if (values == null || values.length == 0)
            return '';
        let index = RandomInteger_1.RandomInteger.nextInteger(values.length);
        return values[index];
    }
    /**
     * Distorts the string passed as 'value' by making it lower case and by
     * either adding a symbol ("_,.:-/.[].{},#-!,$=%.+^.&*-() ") to the end of the string,
     * or capitalizing the first letter of the string.
     *
     * @param value    string to distort.
     * @returns        initial string with only the first letter capitalized or with a symbol added to the end.
     */
    static distort(value) {
        value = value.toLowerCase();
        //Capitalize the first letter of the string 'value'.
        if (RandomBoolean_1.RandomBoolean.chance(1, 5))
            value = value.substring(0, 1).toUpperCase() + value.substring(1);
        //Add a symbol to the end of the string 'value' 
        if (RandomBoolean_1.RandomBoolean.chance(1, 3))
            value = value + RandomString.pickChar(RandomString._symbols);
        return value;
    }
    /**
     * Randomly generates a letter of the English alphabet.
     *
     * @returns a random letter of the English alphabet. Returned letter can be upper or lower case).
     */
    static nextAlphaChar() {
        let index = RandomInteger_1.RandomInteger.nextInteger(RandomString._alpha.length);
        return RandomString._alpha.charAt(index);
    }
    /**
     * Randomly generates a string, consisting of upper and lower case letters (of the English alphabet),
     * digits (0-9), and symbols ("_,.:-/.[].{},#-!,$=%.+^.&*-() ").
     *
     * @param minLength     minimum length of the string to be returned.
     * @param maxLength     maximum length of the string to be returned.
     * @returns             randomly generated string.
     */
    static nextString(minLength, maxLength) {
        let result = '';
        let length = RandomInteger_1.RandomInteger.nextInteger(minLength, maxLength);
        for (let i = 0; i < length; i++) {
            let index = RandomInteger_1.RandomInteger.nextInteger(RandomString._chars.length);
            result += RandomString._chars.charAt(index);
        }
        return result;
    }
}
RandomString._digits = "01234956789";
RandomString._symbols = "_,.:-/.[].{},#-!,$=%.+^.&*-() ";
RandomString._alphaLower = "abcdefghijklmnopqrstuvwxyz";
RandomString._alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
RandomString._alpha = RandomString._alphaUpper + RandomString._alphaLower;
RandomString._chars = RandomString._alpha + RandomString._digits + RandomString._symbols;
exports.RandomString = RandomString;
//# sourceMappingURL=RandomString.js.map