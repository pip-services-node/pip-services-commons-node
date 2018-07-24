/** @module run */
/**
 * Interface for components that can clean their data and state.
 * Such components are typically used during testing.
 */
export interface ICleanable {
	/**
	 * Abstract method that will contain the logic for cleaning a component's data and state.
	 * 
	 * @param correlationId 	unique business transaction id to trace calls across components.
	 * @param callback 			the function to call when the clearing process is complete. It will 
	 * 							be called with an error, if one is raised. If omitted, then the 
	 * 							function will run synchronously and throw exceptions.
	 */
	clear(correlationId: string, callback?: (err: any) => void): void;
}
