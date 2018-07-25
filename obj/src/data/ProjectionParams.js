"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module data */
/**
 * Class that includes standard design patterns for data projection. Projection parameters
 * contain information about what data to retrieve from a data source.
 */
class ProjectionParams extends Array {
    /**
     * @param values    the projection parameters to initialize this ProjectionParams object with.
     */
    constructor(values = null) {
        super();
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        this.__proto__ = ProjectionParams.prototype;
        this.push(...values);
    }
    /**
     * Static method for creating new ProjectionParams objects using the values
     * passed as projection parameters.
     *
     * @param values    the projection parameters to initialize the new ProjectionParams object with.
     * @returns         the ProjectionParams created.
     */
    static fromValues(...values) {
        return new ProjectionParams(values);
    }
}
exports.ProjectionParams = ProjectionParams;
//# sourceMappingURL=ProjectionParams.js.map