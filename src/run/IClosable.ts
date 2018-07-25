/** @module run */
/**
 * Interface for components that require explicit closure.
 */
export interface IClosable {
	/**
	 * Abstract method that will contain the logic for closing a component, disconnecting it from other 
	 * services, and disposing resources.
	 * 
	 * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			the function to call when the closing process is complete. It will 
	 * 							be called with an error, if one is raised.
	 */
	close(correlationId: string, callback?: (err: any) => void): void;
}
