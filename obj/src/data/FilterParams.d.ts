/** @module data */
import { StringValueMap } from './StringValueMap';
/**
 * Class that includes standard design patterns for filtering data.
 * Filter parameters contain the rules and values by which results
 * can be filtered.
 *
 * @see [[StringValueMap]]
 *
 * ### Examples ###
 * Ways to use the FilterParams class and methods:
 *
 * public MyMethod () {
 * 		 let filter = FilterParams.fromTuples(
            "Section1.Key1", "Value1",
            "Section1.Key2", "Value2",
            "Section1.Key3", "Value3"
        );
        ...

        let myData = getMyDataByFilter(filter);
        ...
 * }
 */
export declare class FilterParams extends StringValueMap {
    /**
     * Initializes a new FilterParams object using the value 'map'.
     *
     * @param map 	the value to initalized the new FilterParams with.
     */
    constructor(map?: any);
    /**
     * Static method for creating a new FilterParams object using the 'value' given.
     *
     * @param value 	the value to initialize the new FilterParams with.
     * @returns			the FilterParams generated.
     */
    static fromValue(value: any): FilterParams;
    /**
     * Static method for creating a new FilterParams object using the tuples passed
     * as parameters.
     *
     * @param tuples 	the tuples to initialize the new FilterParams with.
     * @returns			the FilterParams generated.
     */
    static fromTuples(...tuples: any[]): FilterParams;
    /**
     * Static method for creating a new FilterParams object from a string using
     * [[StringValueMap.fromString]].
     *
     * @param line 	the string containing filter parameters.
     * @returns		the FilterParams generated.
     *
     * @see [[StringValueMap.fromString]]
     */
    static fromString(line: string): FilterParams;
}
