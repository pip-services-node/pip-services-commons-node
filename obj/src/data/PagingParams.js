"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IntegerConverter_1 = require("../convert/IntegerConverter");
var BooleanConverter_1 = require("../convert/BooleanConverter");
var AnyValueMap_1 = require("./AnyValueMap");
/**
 * Class that includes standard design patterns for data paging.
 * Paging parameters contain information about how to retrieve
 * data pages from a data source.
 */
var PagingParams = /** @class */ (function () {
    /**
     * @param skip 		the number of result to skip.
     * @param take 		the number of result to take.
     * @param total 	limits the result's length to 'total' results.
     */
    function PagingParams(skip, take, total) {
        if (skip === void 0) { skip = null; }
        if (take === void 0) { take = null; }
        if (total === void 0) { total = null; }
        this.skip = IntegerConverter_1.IntegerConverter.toNullableInteger(skip);
        this.take = IntegerConverter_1.IntegerConverter.toNullableInteger(take);
        this.total = BooleanConverter_1.BooleanConverter.toBooleanWithDefault(total, false);
    }
    /**
     * @param minSkip 	the minimum value to return.
     * @returns 		the number of result to skip or 'minSkip',
     * 					if the 'skip' field is less than 'minSkip'.
     */
    PagingParams.prototype.getSkip = function (minSkip) {
        if (this.skip == null)
            return minSkip;
        if (this.skip < minSkip)
            return minSkip;
        return this.skip;
    };
    /**
     * @param maxTake 	the maximum value to return.
     * @returns 		the number of result to take or 'maxTake',
     * 					if the 'take' field is more than 'maxTake'.
     */
    PagingParams.prototype.getTake = function (maxTake) {
        if (this.take == null)
            return maxTake;
        if (this.take < 0)
            return 0;
        if (this.take > maxTake)
            return maxTake;
        return this.take;
    };
    /**
     * Static method for converting a value into a PagingParams object. If
     * 'value' is an instance of PagingParams then it will be returned. Otherwise,
     * {@link AnyValueMap#fromValue} will be used to create a map, which the PagingParams
     * can be initialized with (using {@link #fromMap}).
     *
     * @param value		the value to convert into a PagingParams object.
     * @returns			the PagingParams created.
     *
     * @see AnyValueMap#fromValue
     * @see #fromMap
     */
    PagingParams.fromValue = function (value) {
        if (value instanceof PagingParams)
            return value;
        var map = AnyValueMap_1.AnyValueMap.fromValue(value);
        return PagingParams.fromMap(map);
    };
    /**
     * Static method for converting the tuples passed as parameters into a PagingParams object.
     * {@link AnyValueMap#fromTuplesArray} will be used to create a map, which the PagingParams
     * can be initialized with (using {@link #fromMap}).
     *
     * @param tuples	the tuples to convert into a PagingParams object.
     * @returns			the PagingParams created.
     *
     * @see AnyValueMap#fromTuplesArray
     * @see #fromMap
     */
    PagingParams.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        var map = AnyValueMap_1.AnyValueMap.fromTuplesArray(tuples);
        return PagingParams.fromMap(map);
    };
    /**
     * Static method for converting a map into a PagingParams object.
     *
     * @param map 	a map that contains the keys "skip", "take", "total", whose
     * 				values will be used to initialize the new PagingParams object.
     * @returns		the PagingParams created.
     */
    PagingParams.fromMap = function (map) {
        var skip = map.getAsNullableInteger("skip");
        var take = map.getAsNullableInteger("take");
        var total = map.getAsBooleanWithDefault("total", true);
        return new PagingParams(skip, take, total);
    };
    return PagingParams;
}());
exports.PagingParams = PagingParams;
//# sourceMappingURL=PagingParams.js.map