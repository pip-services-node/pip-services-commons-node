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
var AnyValueArray_1 = require("./AnyValueArray");
/** @hidden */
var _ = require('lodash');
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
        if (values != null) {
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                _this.push("" + value);
            }
        }
        return _this;
    }
    /**
     * @returns these ProjectionParams as a comma-separated values string.
     */
    ProjectionParams.prototype.toString = function () {
        var builder = "";
        for (var index = 0; index < this.length; index++) {
            if (index > 0) {
                builder += ',';
            }
            builder += _super.prototype[index];
        }
        return builder;
    };
    /**
     * Static method that creates a ProjectionParams object using the given value.
     *
     * @param value     the value to initialize the new ProjectionParams with. If it is
     *                  not an array, [[AnyValueArray.fromValue]] used for conversion.
     * @returns the ProjectionParams object that was generated using 'value'.
     *
     * @see [[AnyValueArray.fromValue]]
     */
    ProjectionParams.fromValue = function (value) {
        if (!_.isArray(value))
            value = AnyValueArray_1.AnyValueArray.fromValue(value);
        return new ProjectionParams(value);
    };
    /**
     * Static method for creating new ProjectionParams objects using the values
     * passed as projection parameters.
     *
     * @param values    the projection parameters to initialize the new ProjectionParams object with.
     * @returns         the ProjectionParams created.
     */
    ProjectionParams.parse = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var result = new ProjectionParams();
        for (var _a = 0, values_2 = values; _a < values_2.length; _a++) {
            var value = values_2[_a];
            this.parseValue("", result, value);
        }
        return result;
    };
    ProjectionParams.parseValue = function (prefix, result, value) {
        value = value.trim();
        var openBracket = 0;
        var openBracketIndex = -1;
        var closeBracketIndex = -1;
        var commaIndex = -1;
        var breakCycleRequired = false;
        for (var index = 0; index < value.length; index++) {
            switch (value[index]) {
                case '(':
                    if (openBracket == 0) {
                        openBracketIndex = index;
                    }
                    openBracket++;
                    break;
                case ')':
                    openBracket--;
                    if (openBracket == 0) {
                        closeBracketIndex = index;
                        if (openBracketIndex >= 0 && closeBracketIndex > 0) {
                            var previousPrefix = prefix;
                            if (prefix && prefix.length > 0) {
                                prefix = prefix + "." + value.substring(0, openBracketIndex);
                            }
                            else {
                                prefix = value.substring(0, openBracketIndex);
                            }
                            var subValue = value.substring(openBracketIndex + 1, closeBracketIndex);
                            this.parseValue(prefix, result, subValue);
                            subValue = value.substring(closeBracketIndex + 1);
                            this.parseValue(previousPrefix, result, subValue);
                            breakCycleRequired = true;
                        }
                    }
                    break;
                case ',':
                    if (openBracket == 0) {
                        commaIndex = index;
                        var subValue = value.substring(0, commaIndex);
                        if (subValue && subValue.length > 0) {
                            if (prefix && prefix.length > 0) {
                                result.push(prefix + "." + subValue);
                            }
                            else {
                                result.push(subValue);
                            }
                        }
                        subValue = value.substring(commaIndex + 1);
                        if (subValue && subValue.length > 0) {
                            this.parseValue(prefix, result, subValue);
                            breakCycleRequired = true;
                        }
                    }
                    break;
            }
            if (breakCycleRequired) {
                break;
            }
        }
        if (value && value.length > 0 && openBracketIndex == -1 && commaIndex == -1) {
            if (prefix && prefix.length > 0) {
                result.push(prefix + "." + value);
            }
            else {
                result.push(value);
            }
        }
    };
    return ProjectionParams;
}(Array));
exports.ProjectionParams = ProjectionParams;
//# sourceMappingURL=ProjectionParams.js.map