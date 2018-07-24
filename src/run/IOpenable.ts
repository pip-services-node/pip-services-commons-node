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
	isOpened(): boolean;

	/**
	 * Abstract method that will contain the logic for opening a component and establishing 
	 * connections to other services.
	 * 
	 * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			the function to call when the opening process is complete. It will 
	 * 							be called with an error, if one is raised. If omitted, then the 
	 * 							function will run synchronously and throw exceptions.
	 */
	open(correlationId: string, callback?: (err: any) => void): void;
}
