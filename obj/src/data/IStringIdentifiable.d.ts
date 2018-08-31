/** @module data */
import { IIdentifiable } from './IIdentifiable';
/**
 * Interface for data objects that are identifiable by a string.
 * This is the recommended way to identify objects by string GUIDs.
 *
 * @see [[IIdentifiable]]
 * @see [[IdGenerator]]
 *
 * ### Examples ###
 *
 * export class MyData implements IStringIdentifiable {
 * 		public id: string;
 * 		...
 * }
 */
export interface IStringIdentifiable extends IIdentifiable<string> {
    /** The object's unique string id. */
    id: string;
}
