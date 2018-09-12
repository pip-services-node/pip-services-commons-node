/** @module refer */
import { IReferences } from './IReferences';
/**
 * Interface for components that require referencing other components.
 *
 * @see [[IReferences]]
 *
 * ### Examples ###
 *
 * Example implementation of the IReferenceable interface:
 *
 *     export class MyReferenceClass implements IReferenceable {
 *         public _references: IReferences;
 *
 *         constructor(references: IReferences) {
 *             setReferences(references)
 *         }
 *
 *         public setReferences(references: IReferences): void {
 *             this._references = references;
 *         }
 *
 *         ...
 *
 *     }
 */
export interface IReferenceable {
    /**
     * Sets references to other components. After references are set,
     * required dependencies can be found using component locators.
     *
     * @param references 	the component references required by this component.
     * @see [[IReferences]]
     */
    setReferences(references: IReferences): void;
}
