/** @module data */
/**
 * Interface for data objects that can track their changes.
 * 
 * ### Examples ###
 * Ways to use the IChangeable interface:
 * 
 * export class MyData implements IChangeable {
 * 		public change_time: Date;
 * 		...
 * }
 */
export interface IChangeable {
	/** The UTC time at which the object was last changed (created or updated). */
	change_time: Date;
}
