/** @module data */
/**
 * Interface for data objects that can be identified by an id.
 * ### Examples ###
 * Ways to use the IIdentifiable interface:
 *
 * export class MyData implements IIdentifiable<string> {
 * 		public id: string;
 * 		...
 * }
 */
export interface IIdentifiable<K> {
    /** The unique object identifier of type K. */
    id: K;
}
