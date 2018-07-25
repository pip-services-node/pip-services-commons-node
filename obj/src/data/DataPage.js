"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module data */
/**
 * Class that is used by standard design patterns, which work with data paging.
 * A data page contains a list of items that are of type T (the data), as well as
 * their total amount (the total).
 */
class DataPage {
    /**
     * Creates a new DataPage object with 'total' items of type T in its 'data' field.
     * If 'data' and/or 'total' are omitted, they can be set using:
     *
     *     thisDataPage.data = ...;
     *     thisDataPage.total = ...;
     *
     * @param data      the list of items of type T to include in this data page.
     * @param total     the total amount of items in this data page's data.
     */
    constructor(data = null, total = null) {
        this.total = total;
        this.data = data;
    }
}
exports.DataPage = DataPage;
//# sourceMappingURL=DataPage.js.map