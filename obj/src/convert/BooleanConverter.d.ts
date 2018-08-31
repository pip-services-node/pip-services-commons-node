/**
 * Provides methods for converting various values to the boolean data type.
 *
 * ### Examples ###
 *
 * public MyMethod (value: any) {
 * 		let boolValue = BooleanConverter.toBoolean(value);
 * 		...
 * }
 */
export declare class BooleanConverter {
    /**
     * Static method for converting values to nullable booleans.
     *
     * Conversion cases:
     * - if 'value' is null - null will be returned;
     * - if 'value' is already a boolean - it will be returned as is;
     * - if 'value' is a number - 0 is false, all other numbers are true;
     * - if value.toString().toLowerCase() is comparable to "1", "true", "t", "yes", "y";
     * or "0", "false", "f", "no", "n" - the corresponding boolean value will be returned;
     * - otherwise - null will be returned.
     *
     * @param value     the value to convert.
     * @returns         the result of the conversion. If 'value' was null or is not convertible - null
     *                  will be returned.
     */
    static toNullableBoolean(value: any): boolean;
    /**
     * Static method for converting values to booleans using [[toBooleanWithDefault]].
     * False will be used as the default value for the conversion.
     *
     * @param value     the value to convert.
     *
     * @see [[toBooleanWithDefault]]
     */
    static toBoolean(value: any): boolean;
    /**
     * Static method for converting values to booleans using [[toNullableBoolean]].
     * If null is returned by the conversion, then this method will return the default
     * value passed.
     *
     * @param value         the value to convert.
     * @param defaultValue  the default value to return if the conversion returns null.
     *                      Defaults to false if omitted.
     *
     * @see [[toNullableBoolean]]
     */
    static toBooleanWithDefault(value: any, defaultValue?: boolean): boolean;
}
