/**
 * Provides methods that can be used for generating random doubles, as well as updating existing doubles
 * by generating values in the range of 'original value' ±'delta/range'
 */
export declare class RandomDouble {
    /**
     * Generates a double in the range ['min', 'max']. If 'max' is omitted, then the range will be set to [0, 'min'].
     *
     * @param min   minimum value of the double that will be generated.
     *              If 'max' is omitted, then 'max' is set to 'min' and 'min' is set to 0.
     * @param max   (optional) maximum value of the double that will be generated. Defaults to 'min' if omitted.
     * @returns     generated random double value.
     */
    static nextDouble(min: number, max?: number): number;
    /**
     * Generates a new double that will differ from 'value' by a maximum of ±'range'. If range is omitted,
     * then the generated value will differ from 'value' by a maximum of ±10%.
     *
     * @param value     double to update.
     * @param range     (optional) defines the maximum amount by which the new double can differ from 'value'.
     *                  Defaults to 10% of 'value' if omitted.
     * @returns         updated double value.
     */
    static updateDouble(value: number, range?: number): number;
}
