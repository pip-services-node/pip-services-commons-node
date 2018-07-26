/** @module refer */
import { IReferences } from './IReferences';

/**
 * Interface for components that require referencing other components. 
 */
export interface IReferenceable {
	/**
	 * Sets references to other components. After references are set, 
	 * required dependencies can be found using component locators.
	 * 
	 * @param references 	the component references required by this component.
	 */
	setReferences(references: IReferences): void;
}
