"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module data */
const StringValueMap_1 = require("./StringValueMap");
/**
 * Class that includes standard design patterns for filtering data.
 * Filter parameters contain the rules and values by which results
 * can be filtered.
 *
 * @see [[StringValueMap]]
 */
class FilterParams extends StringValueMap_1.StringValueMap {
    /**
     * Initializes a new FilterParams object using the value 'map'.
     *
     * @param map 	the value to initalized the new FilterParams with.
     */
    constructor(map = null) {
        super(map);
    }
    /**
     * Static method for creating a new FilterParams object using the 'value' given.
     *
     * @param value 	the value to initialize the new FilterParams with.
     * @returns			the FilterParams generated.
     */
    static fromValue(value) {
        return new FilterParams(value);
    }
    /**
     * Static method for creating a new FilterParams object using the tuples passed
     * as parameters.
     *
     * @param tuples 	the tuples to initialize the new FilterParams with.
     * @returns			the FilterParams generated.
     */
    static fromTuples(...tuples) {
        let map = StringValueMap_1.StringValueMap.fromTuplesArray(tuples);
        return new FilterParams(map);
    }
    /**
     * Static method for creating a new FilterParams object from a string using
     * [[StringValueMap.fromString]].
     *
     * @param line 	the string containing filter parameters.
     * @returns		the FilterParams generated.
     *
     * @see [[StringValueMap.fromString]]
     */
    static fromString(line) {
        let map = StringValueMap_1.StringValueMap.fromString(line);
        return new FilterParams(map);
    }
}
exports.FilterParams = FilterParams;
//# sourceMappingURL=FilterParams.js.map