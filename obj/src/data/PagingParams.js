"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module data */
const IntegerConverter_1 = require("../convert/IntegerConverter");
const BooleanConverter_1 = require("../convert/BooleanConverter");
const AnyValueMap_1 = require("./AnyValueMap");
/**
 * Class that includes standard design patterns for data paging.
 * Paging parameters contain information about how to retrieve
 * data pages from a data source.
 */
class PagingParams {
    /**
     * @param skip 		the number of result to skip.
     * @param take 		the number of result to take.
     * @param total 	limits the result's length to 'total' results.
     */
    constructor(skip = null, take = null, total = null) {
        this.skip = IntegerConverter_1.IntegerConverter.toNullableInteger(skip);
        this.take = IntegerConverter_1.IntegerConverter.toNullableInteger(take);
        this.total = BooleanConverter_1.BooleanConverter.toBooleanWithDefault(total, false);
    }
    /**
     * @param minSkip 	the minimum value to return.
     * @returns 		the number of result to skip or 'minSkip',
     * 					if the 'skip' field is less than 'minSkip'.
     */
    getSkip(minSkip) {
        if (this.skip == null)
            return minSkip;
        if (this.skip < minSkip)
            return minSkip;
        return this.skip;
    }
    /**
     * @param maxTake 	the maximum value to return.
     * @returns 		the number of result to take or 'maxTake',
     * 					if the 'take' field is more than 'maxTake'.
     */
    getTake(maxTake) {
        if (this.take == null)
            return maxTake;
        if (this.take < 0)
            return 0;
        if (this.take > maxTake)
            return maxTake;
        return this.take;
    }
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
    static fromValue(value) {
        if (value instanceof PagingParams)
            return value;
        let map = AnyValueMap_1.AnyValueMap.fromValue(value);
        return PagingParams.fromMap(map);
    }
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
    static fromTuples(...tuples) {
        let map = AnyValueMap_1.AnyValueMap.fromTuplesArray(tuples);
        return PagingParams.fromMap(map);
    }
    /**
     * Static method for converting a map into a PagingParams object.
     *
     * @param map 	a map that contains the keys "skip", "take", "total", whose
     * 				values will be used to initialize the new PagingParams object.
     * @returns		the PagingParams created.
     */
    static fromMap(map) {
        let skip = map.getAsNullableInteger("skip");
        let take = map.getAsNullableInteger("take");
        let total = map.getAsBooleanWithDefault("total", true);
        return new PagingParams(skip, take, total);
    }
}
exports.PagingParams = PagingParams;
//# sourceMappingURL=PagingParams.js.map