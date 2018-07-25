export declare class FloatConverter {
    /**
     * Static method for converting values to nullable floats.
     *
     * Conversion cases:
     * - if 'value' is null - null will be returned;
     * - if 'value' is a number - it will be returned as a float;
     * - if 'value' is a date - the number of milliseconds passed since Jan 1, 1970, 00:00:00.000 GMT will be returned;
     * - if 'value' is a boolean - true returns 1 and false returns 0;
     * - if 'value' is a string - parseFloat(value) will be called, and if the result is a number, then it will be returned;
     * - otherwise - null will be returned.
     *
     * @param value     the value to convert.
     * @returns         the result of the conversion. If 'value' was null or is not convertible - null
     *                  will be returned.
     *
     * @see [[DoubleConverter.toNullableDouble]]
     */
    static toNullableFloat(value: any): number;
    /**
     * Static method for converting values to floats using [[DoubleConverter.toDouble]] (which uses
     * [[DoubleConverter.toDoubleWithDefault]]). 0 will be used as the default value for the conversion.
     *
     * @param value     the value to convert.
     *
     * @see [[DoubleConverter.toDouble]]
     * @see [[DoubleConverter.toDoubleWithDefault]]
     */
    static toFloat(value: any): number;
    /**
     * Static method for converting values to floats using [[DoubleConverter.toDoubleWithDefault]]
     * (which uses [[DoubleConverter.toNullableDouble]]). If null is returned by the conversion,
     * then this method will return the default value passed.
     *
     * @param value         the value to convert.
     * @param defaultValue  the default value to return if the conversion returns null.
     *
     * @see [[DoubleConverter.toDoubleWithDefault]]
     * @see [[DoubleConverter.toNullableDouble]]
     */
    static toFloatWithDefault(value: any, defaultValue: number): number;
}
