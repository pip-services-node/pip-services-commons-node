/**
 * Provides methods for converting various values to the long data type.
 */
export declare class LongConverter {
    /**
     * Static method for converting values to nullable longs.
     *
     * Conversion cases:
     * - if 'value' is null - null will be returned;
     * - if 'value' is a number - the smallest integer greater than or equal to its numeric value will be returned;
     * - if 'value' is a date - the number of milliseconds passed since Jan 1, 1970, 00:00:00.000 GMT will be returned;
     * - if 'value' is a boolean - true returns 1 and false returns 0;
     * - if 'value' is a string - parseFloat(value) will be called, and if the result is a number, then the smallest integer
     * greater than or equal to its numeric value will be returned;
     * - otherwise - null will be returned.
     *
     * @param value     the value to convert.
     * @returns         the result of the conversion. If 'value' was null or is not convertible - null
     *                  will be returned.
     */
    static toNullableLong(value: any): number;
    /**
     * Static method for converting values to longs using {@link #toLongWithDefault}.
     * 0 will be used as the default value for the conversion.
     *
     * @param value     the value to convert.
     *
     * @see #toLongWithDefault
     */
    static toLong(value: any): number;
    /**
     * Static method for converting values to longs using {@link #toNullableLong}.
     * If null is returned by the conversion, then this method will return the default
     * value passed.
     *
     * @param value         the value to convert.
     * @param defaultValue  the default value to return if the conversion returns null.
     *
     * @see #toNullableLong
     */
    static toLongWithDefault(value: any, defaultValue: number): number;
}
