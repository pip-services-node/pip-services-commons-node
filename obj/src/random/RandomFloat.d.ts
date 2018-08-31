/** @module random */
/**
 * Provides methods that can be used for generating random floats, as well as updating existing floats
 * by generating a value in the range of 'original value' ±'delta/range'
 *
 * ### Examples ###
 *
 * public MyMethod(min: number, max: number ) {
 *      let floatValue = RandomFloat.nextFloat(min, max);
 *      ...
 * }
 */
export declare class RandomFloat {
    /**
     * Generates a float in the range ['min', 'max']. If 'max' is omitted, then the range will be set to [0, 'min'].
     *
     * @param min   minimum value of the float that will be generated.
     *              If 'max' is omitted, then 'max' is set to 'min' and 'min' is set to 0.
     * @param max   (optional) maximum value of the float that will be generated. Defaults to 'min' if omitted.
     * @returns     generated random float value.
     */
    static nextFloat(min: number, max?: number): number;
    /**
     * Generates a new float that will differ from 'value' by a maximum of ±'range'. If range is omitted,
     * then the generated value will differ from 'value' by a maximum of ±10%.
     *
     * @param value     float to update.
     * @param range     (optional) defines the maximum amount by which the new float can differ from 'value'.
     *                  Defaults to 10% of 'value' if omitted.
     * @returns         updated float value.
     */
    static updateFloat(value: number, range?: number): number;
}
