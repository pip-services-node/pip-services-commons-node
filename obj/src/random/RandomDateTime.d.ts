/**
 * Provides methods that can be used for generating random Dates/DateTimes, as well as updating existing DateTimes
 * by generating values in the range of 'original DateTime' ±'delta/range'
 */
export declare class RandomDateTime {
    /**
     * Generates a Date in the range ['minYear', 'maxYear'].
     *
     * @param minYear   (optional) minimum Date that will be generated. Defaults to 0-10 years ago (from the current year) if omitted.
     * @param maxYear   (optional) maximum Date that will be generated. Defaults to the current year if omitted.
     * @returns         generated random Date.
     */
    static nextDate(minYear?: number, maxYear?: number): Date;
    /**
     * Generates a DateTime in the range ['minYear', 'maxYear'].
     *
     * @param minYear   (optional) minimum DateTime that will be generated. Defaults to 0-10 years ago (from the current year) if omitted.
     * @param maxYear   (optional) maximum DateTime that will be generated. Defaults to the current year if omitted.
     * @returns         generated random DateTime.
     */
    static nextDateTime(minYear?: number, maxYear?: number): Date;
    /**
     * Generates a new DateTime that will differ from 'value' by a maximum of ±'range'.
     * If 'range' is omitted (or 0), then the generated DateTime will differ from 'value' by ±10 days.
     *
     * @param value     DateTime to update.
     * @param range     (optional) defines the maximum amount of days by which the new DateTime can differ from 'value'. If range is a negative number,
     *                  'value' will be returned. Defaults to 10 days if omitted or zero.
     * @returns         updated DateTime.
     */
    static updateDateTime(value: Date, range?: number): Date;
}
