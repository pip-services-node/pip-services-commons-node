/**
 * Provides methods that can be used for generating random booleans using 'chance' and 'nextBoolean' methods.
 */
export declare class RandomBoolean {
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
    static chance(chances: number, maxChances: number): boolean;
    /**
     * Generates a boolean that has a 50/50 chance of being true.
     *
     * @returns a random boolean.
     */
    static nextBoolean(): boolean;
}
