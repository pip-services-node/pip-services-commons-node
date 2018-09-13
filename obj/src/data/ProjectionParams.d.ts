/**
 * Class that includes standard design patterns for data projection. Projection parameters
 * contain information about what data to retrieve from a data source.
 *
 * ### Example ###
 *
 * Example ProjectionParams object usage:
 *
 *     let params: ProjectionParams;
 *
 *     params = new ProjectionParams(["data1(attr1)"]); // To get attribute named attr1 in data type data1
 *
 */
export declare class ProjectionParams extends Array<string> {
    /**
     * @param values    the projection parameters to initialize this ProjectionParams object with.
     */
    constructor(values?: any[]);
    /**
     * @returns these ProjectionParams as a comma-separated values string.
     */
    toString(): string;
    /**
     * Static method that creates a ProjectionParams object using the given value.
     *
     * @param value     the value to initialize the new ProjectionParams with. If it is
     *                  not an array, [[AnyValueArray.fromValue]] used for conversion.
     * @returns the ProjectionParams object that was generated using 'value'.
     *
     * @see [[AnyValueArray.fromValue]]
     */
    static fromValue(value: any): ProjectionParams;
    /**
     * Static method for creating new ProjectionParams objects using the values
     * passed as projection parameters.
     *
     * @param values    the projection parameters to initialize the new ProjectionParams object with.
     * @returns         the ProjectionParams created.
     */
    static parse(...values: string[]): ProjectionParams;
    private static parseValue;
}
