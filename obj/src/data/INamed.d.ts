/** @module data */
/**
 * Interface for data objects that have human-readable names.
 *  * Ways to use the INamed interface:
 *
 * export class MyData implements INamed {
 * 		public name: string;
 * 		...
 * }
 */
export interface INamed {
    /** The object's name. */
    name: string;
}
