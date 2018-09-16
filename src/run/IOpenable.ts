/** @module run */
import { IClosable } from './IClosable'

/**
 * Interface for components that require explicit opening.
 */
export interface IOpenable extends IClosable {
	/**
	 * Abstract method that will contain the logic for checking whether or not 
	 * a component has been opened.
	 * 
	 * @returns true if the component has been opened and false otherwise.
	 */
	isOpen(): boolean;

	/**
	 * Abstract method that will contain the logic for opening a component and establishing 
	 * connections to other services.
	 * 
	 * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			the function to call when the opening process is complete. It will 
	 * 							be called with an error if one is raised.
	 */
	open(correlationId: string, callback?: (err: any) => void): void;
}
