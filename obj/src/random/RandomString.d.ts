/**
 * Provides methods that can be used for generating random strings and chars, as well as picking at random strings/chars from a given set of strings/chars.
 */
export declare class RandomString {
    private static readonly _digits;
    private static readonly _symbols;
    private static readonly _alphaLower;
    private static readonly _alphaUpper;
    private static readonly _alpha;
    private static readonly _chars;
    /**
     * Picks a char at random from the string passed as 'values'
     *
     * @param values    chars to pick from.
     * @returns         randomly picked char.
     */
    static pickChar(values: string): string;
    /**
     * Picks a string at random from the string array passed as 'values'
     *
     * @param values    strings to pick from.
     * @returns         randomly picked string.
     */
    static pickString(values: string[]): string;
    /**
     * Distorts the string passed as 'value' by making it lower case and by
     * either adding a symbol ("_,.:-/.[].{},#-!,$=%.+^.&*-() ") to the end of the string,
     * or capitalizing the first letter of the string.
     *
     * @param value    string to distort.
     * @returns        initial string with only the first letter capitalized or with a symbol added to the end.
     */
    static distort(value: string): string;
    /**
     * Randomly generates a letter of the English alphabet.
     *
     * @returns a random letter of the English alphabet. Returned letter can be upper or lower case).
     */
    static nextAlphaChar(): string;
    /**
     * Randomly generates a string, consisting of upper and lower case letters (of the English alphabet),
     * digits (0-9), and symbols ("_,.:-/.[].{},#-!,$=%.+^.&*-() ").
     *
     * @param minLength     minimum length of the string to be returned.
     * @param maxLength     maximum length of the string to be returned.
     * @returns             randomly generated string.
     */
    static nextString(minLength: number, maxLength: number): string;
}
