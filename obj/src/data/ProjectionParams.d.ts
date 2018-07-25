/** @module data */
/**
 * Class that includes standard design patterns for data projection. Projection parameters
 * contain information about what data to retrieve from a data source.
 */
export declare class ProjectionParams extends Array<string> {
    /**
     * @param values    the projection parameters to initialize this ProjectionParams object with.
     */
    constructor(values?: string[]);
    /**
     * Static method for creating new ProjectionParams objects using the values
     * passed as projection parameters.
     *
     * @param values    the projection parameters to initialize the new ProjectionParams object with.
     * @returns         the ProjectionParams created.
     */
    static fromValues(...values: string[]): ProjectionParams;
}
