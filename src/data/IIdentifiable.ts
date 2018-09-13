/** @module data */
/**
 * Interface for data objects that can be identified by an id.
 * 
 * ### Example ###
 * 
 * Example implementation of the IIdentifiable interface:
 * 
 *     export class MyData implements IIdentifiable<string> {
 *         public id: string;
 *         ...
 *     }
 */

export interface IIdentifiable<K> {
	/** The unique object identifier of type K. */
	id: K;
}
