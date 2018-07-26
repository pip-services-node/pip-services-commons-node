/** @module refer */
/**
 * Interface for components that require clearing of their references to other components.
 */
export interface IUnreferenceable {
	/**
	 * Unsets (clears) previously set references to other components. 
	 */
	unsetReferences(): void;
}
