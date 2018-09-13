"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module data */
/**
 * Class that defines a field by which values can be sorted. A sort field contains a
 * string field 'name' and a boolean field 'ascending'.
 *
 * ### Example ###
 *
 *     public MyMethod () {
 *         let sortField = new SortField("key1", true);
 *         ...
 *     }
 */
var SortField = /** @class */ (function () {
    /**
     * @param name 			the name of the field to sort by.
     * @param ascending 	boolean value indicating whether the values should
     * 						be sorted in ascending (true) or descending (false) order
     */
    function SortField(name, ascending) {
        if (name === void 0) { name = null; }
        if (ascending === void 0) { ascending = true; }
        this.name = name;
        this.ascending = ascending;
    }
    return SortField;
}());
exports.SortField = SortField;
//# sourceMappingURL=SortField.js.map