"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/** @module data */
var StringValueMap_1 = require("./StringValueMap");
/**
 * Class that includes standard design patterns for filtering data.
 * Filter parameters contain the rules and values by which results
 * can be filtered.
 *
 * @see [[StringValueMap]]
 *
 * ### Examples ###
 *
 * A FilterParams object can be created and used in the following way:
 *
 *     public MyMethod () {
 *         let filter = FilterParams.fromTuples(
 *             "Section1.Key1", "Value1",
 *             "Section1.Key2", "Value2",
 *             "Section1.Key3", "Value3"
 *         );
 *         ...
 *
 *         let myData = getMyDataByFilter(filter);
 *         ...
 *     }
 */
var FilterParams = /** @class */ (function (_super) {
    __extends(FilterParams, _super);
    /**
     * Initializes a new FilterParams object using the value 'map'.
     *
     * @param map 	the value to initalized the new FilterParams with.
     */
    function FilterParams(map) {
        if (map === void 0) { map = null; }
        return _super.call(this, map) || this;
    }
    /**
     * Static method for creating a new FilterParams object using the 'value' given.
     *
     * @param value 	the value to initialize the new FilterParams with.
     * @returns			the FilterParams generated.
     */
    FilterParams.fromValue = function (value) {
        return new FilterParams(value);
    };
    /**
     * Static method for creating a new FilterParams object using the tuples passed
     * as parameters.
     *
     * @param tuples 	the tuples to initialize the new FilterParams with.
     * @returns			the FilterParams generated.
     */
    FilterParams.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        var map = StringValueMap_1.StringValueMap.fromTuplesArray(tuples);
        return new FilterParams(map);
    };
    /**
     * Static method for creating a new FilterParams object from a string using
     * [[StringValueMap.fromString]].
     *
     * @param line 	the string containing filter parameters.
     * @returns		the FilterParams generated.
     *
     * @see [[StringValueMap.fromString]]
     */
    FilterParams.fromString = function (line) {
        var map = StringValueMap_1.StringValueMap.fromString(line);
        return new FilterParams(map);
    };
    return FilterParams;
}(StringValueMap_1.StringValueMap));
exports.FilterParams = FilterParams;
//# sourceMappingURL=FilterParams.js.map