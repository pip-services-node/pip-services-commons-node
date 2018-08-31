/** @module refer */
/**
 * Interface for components that require clearing of their references to other components.
 * 
 * @see [[IReferences]]
 * @see [[IReferenceable]]
 * 
 * ### Examples ###
 * 
 * Example implementation of the IUnreferenceable interface:
 * 
 *     export class MyUnReferenceableClass implements IReferenceable, IUnreferenceable {
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
 *         public unsetReferences (): void {
 *             this._references = null;
 *         }
 *         
 *         ...
 *         
 *     }
 */
export interface IUnreferenceable {
	/**
	 * Unsets (clears) previously set references to other components. 
	 */
	unsetReferences(): void;
}
