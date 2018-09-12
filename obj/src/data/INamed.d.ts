/** @module data */
/**
 * Interface for data objects that have human-readable names.
 *
 * ### Examples ###
 *
 * Example implementation of the INamed interface:
 *
 *     export class MyData implements INamed {
 *         public name: string;
 *         ...
 *     }
 */
export interface INamed {
    /** The object's name. */
    name: string;
}
