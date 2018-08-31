/**
 * Provides methods that can be used for generating random strings, which can contain: colors, names (first + last, with/without prefixes/suffixes),
 * objects, adjectives, verbs, phrases (words separated by spaces), phone numbers, email addresses, sequences of words (CamelCase), or texts.
 *
 * ### Examples ###
 *
 * public MyMethod() {
 *      let textValue = RandomText.word();
 *      ...
 * }
 */
export declare class RandomText {
    private static readonly _namePrefixes;
    private static readonly _nameSuffixes;
    private static readonly _firstNames;
    private static readonly _lastNames;
    private static readonly _colors;
    private static readonly _stuffs;
    private static readonly _adjectives;
    private static readonly _verbs;
    private static readonly _allWords;
    /**
     * @returns the name of a random color. Returned name is capitalized.
     */
    static color(): string;
    /**
     * @returns the name of a random object. Returned name is capitalized.
     */
    static stuff(): string;
    /**
     * @returns a random adjective. Returned adjective is capitalized.
     */
    static adjective(): string;
    /**
     * @returns a random verb. Returned verb is capitalized.
     */
    static verb(): string;
    /**
     * @returns a random phrase, consisting of random words. Words will be separated by spaces,
     *          and only the first word will be capitalized.
     */
    static phrase(minSize: number, maxSize?: number): string;
    /**
     * @returns a random name in the format of "(Prefix )First Last( Suffix)",
     *          where (Prefix/Suffix) are added at random.
     */
    static fullName(): string;
    /**
     * @returns a random word from available first names, last names, colors, stuffs, adjectives, or verbs.
     *          Returned word is capitalized.
     */
    static word(): string;
    /**
     * @param min   minimum number of words in the sequence. Sequence will contain 'min' random words if 'max' is omitted.
     * @param max   (optional) maximum number of words in the sequence.
     * @returns     a string sequence of random words from available first names, last names, colors, stuffs, adjectives, or verbs.
     *              All words in the sequence will be capitalized and NOT separated by spaces (CamelCase). Use 'phrase' for generating
     *              sequences of words that are separated by spaces.
     */
    static words(min: number, max?: number): string;
    /**
     * @returns a random phone number in the format of "(XXX) XXX-YYYY" where XXX = [111,999] and YYYY = [0, 9999].
     */
    static phone(): string;
    /**
     * @returns a random email address in the format of "WORDS26&#064;WORDS13.com" where x and y in WORDSxy represent the minimum
     *          and maximum number of words, making up WORDS.
     */
    static email(): string;
    /**
     * Generates a random text, consisting of first names, last names, colors, stuffs, adjectives, verbs, and punctuation marks.
     *
     * @param minSize   minimum amount of words to generate. Text will contain 'minSize' words if 'maxSize' is omitted.
     * @param maxSize   (optional) maximum amount of words to generate.
     * @returns         generated text.
     */
    static text(minSize: number, maxSize?: number): string;
}
