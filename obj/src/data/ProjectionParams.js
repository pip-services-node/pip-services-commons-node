"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/** @module data */
/**
 * Class that includes standard design patterns for data projection. Projection parameters
 * contain information about what data to retrieve from a data source.
 */
var ProjectionParams = /** @class */ (function (_super) {
    __extends(ProjectionParams, _super);
    /**
     * @param values    the projection parameters to initialize this ProjectionParams object with.
     */
    function ProjectionParams(values) {
        if (values === void 0) { values = null; }
        var _this = _super.call(this) || this;
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        _this.__proto__ = ProjectionParams.prototype;
        _this.push.apply(_this, values);
        return _this;
    }
    /**
     * Static method for creating new ProjectionParams objects using the values
     * passed as projection parameters.
     *
     * @param values    the projection parameters to initialize the new ProjectionParams object with.
     * @returns         the ProjectionParams created.
     */
    ProjectionParams.fromValues = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new ProjectionParams(values);
    };
    return ProjectionParams;
}(Array));
exports.ProjectionParams = ProjectionParams;
//# sourceMappingURL=ProjectionParams.js.map