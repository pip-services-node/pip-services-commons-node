/** @module data */
/**
 * Interface for versioned data objects with optimistic concurrency resolution.
 * The version can be any string, with the only requirement that newer versions
 * strings are higher (bigger) than the previous version string. When generated
 * automatically, the version is represented by a timestamp string.
 *
 * ### Example ###
 *
 * Example implementation of the IVersioned interface:
 *
 *     export class MyData implements IVersioned {
 *         public version: string;
 *         ...
 *     }
 */
export interface IVersioned {
    /** The object's version. */
    version: string;
}
