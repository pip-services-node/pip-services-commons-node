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
/**
 * Class that includes standard design patterns for data sorting.
 * Sorting parameters contain information about how to sort the
 * data from a data source, using the fields available.
 *
 * @see [[SortField]]
 *
 * ### Example ###
 *
 *     public MyMethod () {
 *         let sortParams = new SortParams();
 *         sortParams.add(new SortField("key", false));
 *         ...
 *     }
 */
var SortParams = /** @class */ (function (_super) {
    __extends(SortParams, _super);
    /**
     * @param fields    the SortFields to use when sorting data using these SortParams.
     *
     * @see [[SortField]]
     */
    function SortParams(fields) {
        if (fields === void 0) { fields = null; }
        var _this = _super.call(this) || this;
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        _this.__proto__ = SortParams.prototype;
        if (fields != null) {
            for (var index = 0; index < fields.length; index++)
                _this.push(fields[index]);
        }
        return _this;
    }
    return SortParams;
}(Array));
exports.SortParams = SortParams;
//# sourceMappingURL=SortParams.js.map