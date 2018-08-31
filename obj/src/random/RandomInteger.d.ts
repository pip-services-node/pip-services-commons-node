/** @module random */
/**
 * Provides methods that can be used for generating random integers, as well as updating existing integers
 * by generating values in the range of 'original value' ±'delta/range'. The 'sequence' method allows
 * for variable length integer array generation.
 *
 * ### Examples ###
 *
 * public MyMethod(min: number, max: number ) {
 *      let intValue = RandomInteger.nextInteger(min, max);
 *      ...
 * }
 */
export declare class RandomInteger {
    /**
     * Generates a integer in the range ['min', 'max']. If 'max' is omitted, then the range will be set to [0, 'min'].
     *
     * @param min   minimum value of the integer that will be generated.
     *              If 'max' is omitted, then 'max' is set to 'min' and 'min' is set to 0.
     * @param max   (optional) maximum value of the integer that will be generated. Defaults to 'min' if omitted.
     * @returns     generated random integer value.
     */
    static nextInteger(min: number, max?: number): number;
    /**
     * Generates a new integer that will differ from 'value' by a maximum of ±'range'. If range is omitted,
     * then the generated value will differ from 'value' by a maximum of ±10%.
     *
     * @param value     integer to update.
     * @param range     (optional) defines the maximum amount by which the new integer can differ from 'value'.
     *                  Defaults to 10% of 'value' (floored) if omitted.
     * @returns         updated integer value.
     */
    static updateInteger(value: number, range?: number): number;
    /**
     * Generates an array of integers, whose values are identical to their indexes. The length of the array is randomly chosen from the range ['min', 'max'].
     * If 'max' is omitted, then the the array's length will be 'min'.
     *
     * @param min   minimum length of the array that will be generated. If 'max' is omitted, then 'min' defines the array's length .
     * @param max   (optional) maximum length of the array that will be generated.
     * @returns     generated array of integers.
     */
    static sequence(min: number, max?: number): number[];
}
