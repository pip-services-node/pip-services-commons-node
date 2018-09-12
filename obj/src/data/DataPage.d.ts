/** @module data */
/**
 * Class that is used by standard design patterns, which work with data paging.
 * A data page contains a list of items that are of type T (the data), as well as
 * their total amount (the total).
 *
 * ### Examples ###
 *
 * Example DataPage class usage:
 *
 *     let dataPage: DataPage<string> = new DataPage<string>(["Hello, Pip.User!"], 1);
 *
 *     dataPage.data.push("Hello, World!");
 *     dataPage.total = 2;
 */
export declare class DataPage<T> {
    /** The total amount of items in the data page. */
    total: number;
    /** The list of items that are contained in this data page. */
    data: T[];
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
    constructor(data?: T[], total?: number);
}
