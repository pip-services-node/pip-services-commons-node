"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module data */
/**
 * Class that defines a field by which values can be sorted. A sort field contains a
 * string field 'name' and a boolean field 'ascending'.
 */
class SortField {
    /**
     * @param name 			the name of the field to sort by.
     * @param ascending 	boolean value indicating whether the values should
     * 						be sorted in ascending (true) or descending (false) order
     */
    constructor(name = null, ascending = true) {
        this.name = name;
        this.ascending = ascending;
    }
}
exports.SortField = SortField;
//# sourceMappingURL=SortField.js.map