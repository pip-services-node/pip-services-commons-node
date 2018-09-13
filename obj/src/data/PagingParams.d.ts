/**
 * Class that includes standard design patterns for data paging.
 * Paging parameters contain information about how to retrieve
 * data pages from a data source.
 *
 * ### Example ###
 *
 * Example PagingParams object usage:
 *
 *     let params: PagingParams;
 *
 *     params = new PagingParams(0, 100, true); // To get first 100 elements and takes total elements count
 *
 */
export declare class PagingParams {
    /** the number of result to skip. */
    skip: number;
    /** the number of result to take.  */
    take: number;
    /** limits the result's length. */
    total: boolean;
    /**
     * @param skip 		the number of result to skip.
     * @param take 		the number of result to take.
     * @param total 	limits the result's length to 'total' results.
     */
    constructor(skip?: any, take?: any, total?: any);
    /**
     * @param minSkip 	the minimum value to return.
     * @returns 		the number of result to skip or 'minSkip',
     * 					if the 'skip' field is less than 'minSkip'.
     */
    getSkip(minSkip: number): number;
    /**
     * @param maxTake 	the maximum value to return.
     * @returns 		the number of result to take or 'maxTake',
     * 					if the 'take' field is more than 'maxTake'.
     */
    getTake(maxTake: number): number;
    /**
     * Static method for converting a value into a PagingParams object. If
     * 'value' is an instance of PagingParams then it will be returned. Otherwise,
     * [[AnyValueMap.fromValue]] will be used to create a map, which the PagingParams
     * can be initialized with (using [[fromMap]]).
     *
     * @param value		the value to convert into a PagingParams object.
     * @returns			the PagingParams created.
     *
     * @see [[AnyValueMap.fromValue]]
     * @see [[fromMap]]
     */
    static fromValue(value: any): PagingParams;
    /**
     * Static method for converting the tuples passed as parameters into a PagingParams object.
     * [[AnyValueMap.fromTuplesArray]] will be used to create a map, which the PagingParams
     * can be initialized with (using [[fromMap]]).
     *
     * @param tuples	the tuples to convert into a PagingParams object.
     * @returns			the PagingParams created.
     *
     * @see [[AnyValueMap.fromTuplesArray]]
     * @see [[fromMap]]
     */
    static fromTuples(...tuples: any[]): PagingParams;
    /**
     * Static method for converting a map into a PagingParams object.
     *
     * @param map 	a map that contains the keys "skip", "take", "total", whose
     * 				values will be used to initialize the new PagingParams object.
     * @returns		the PagingParams created.
     */
    static fromMap(map: any): PagingParams;
}
