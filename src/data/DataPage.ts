/** @module data */

/**
 * Data transfer object that is used to pass results of paginated queries.
 * It contains items of retrieved page and optional total number of items.
 * 
 * Most often this object type is used to send responses to paginated queries.
 * Pagination parameters are defined by [[PagingParams]] object.
 * The Skip parameter in the PagingParams there means how many items to skip.
 * The Takes parameter sets number of items to return in the page.
 * And the optional Total parameter tells to return total number of items in the query.
 * 
 * Remember: not all implementations support the <code>Total</code> parameter
 * because its generation may lead to severe performance implications.
 * 
 * @see [[PagingParams]]
 * 
 * ### Example ###
 * 
 *     myDataClient.getDataByFilter(
 *         "123",
 *         FilterParams.fromTuples("completed": true),
 *         new PagingParams(0, 100, true),
 *         (err: any, page: DataPage<MyData>) => {
 *             if (err == null) {
 *                 console.log("Items: ");
 *                 for (let item of page.Data) {
 *                     console.log(item);
 *                 }
 *                 console.log("Total items: " + page.total);
 *             }
 *         };
 *     );
 */
export class DataPage<T> {
    /** The items of the retrieved page. */
    public data: T[];

    /** The total amount of items in a request. */
    public total: number;

    /**
     * Creates a new instance of data page and assigns its values.
     * 
     * @param data      a list of items from the retrieved page.
     * @param total     (optional) .
     */
    public constructor(data: T[] = null, total: number = null) {
		  this.total = total;
		  this.data = data;
    }
}
