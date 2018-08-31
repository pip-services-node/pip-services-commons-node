/** @module data */
import { SortField } from './SortField';
/**
 * Class that includes standard design patterns for data sorting.
 * Sorting parameters contain information about how to sort the
 * data from a data source, using the fields available.
 *
 * @see [[SortField]]
 *
 * ### Examples ###
 *
 * public MyMethod () {
 * 		let sortParams = new SortParams();
 * 		sortParams.add(new SortField("key", false));
 *      ...
 * }
 */
export declare class SortParams extends Array<SortField> {
    /**
     * @param fields    the SortFields to use when sorting data using these SortParams.
     *
     * @see [[SortField]]
     */
    constructor(fields?: SortField[]);
}
