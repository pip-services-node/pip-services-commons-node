/**
 * Provides methods that can be used for generating random Dates/DateTimes, as well as updating existing DateTimes
 * by generating values in the range of 'original DateTime' ±'delta/range'
 */
export declare class RandomDateTime {
    /**
     * Generates a Date in the range ['minYear', 'maxYear'].
     *
     * @param min   minimum Date that will be generated.
     *              If 'max' is omitted, then 'max' is set to 'min' and 'min' is set to 2000-01-01.
     * @param max   (optional) maximum Date that will be generated. Defaults to 'min' if omitted.
     * @returns         generated random Date.
     */
    static nextDate(min: Date, max?: Date): Date;
    /**
     * Generates a Date and time in the range ['minYear', 'maxYear'].
     *
     * @param min   minimum Date and time that will be generated.
     *              If 'max' is omitted, then 'max' is set to 'min' and 'min' is set to 2000-01-01.
     * @param max   (optional) maximum Date and time that will be generated. Defaults to 'min' if omitted.
     * @returns         generated random Date and time.
     */
    static nextDateTime(min: Date, max?: Date): Date;
    /**
     * Generates a new DateTime that will differ from 'value' by a maximum of ±'range'.
     * If 'range' is omitted (or 0), then the generated DateTime will differ from 'value' by ±10 days.
     *
     * @param value     DateTime to update.
     * @param range     (optional) defines the maximum amount of milliseconds by which the new DateTime can differ from 'value'. If range is a negative number,
     *                  'value' will be returned. Defaults to 10 days if omitted or zero.
     * @returns         updated DateTime.
     */
    static updateDateTime(value: Date, range?: number): Date;
}
