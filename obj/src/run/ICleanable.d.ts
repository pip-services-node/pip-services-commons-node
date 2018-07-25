/** @module run */
/**
 * Interface for components that can clean their data.
 * Such components are typically used during testing.
 */
export interface ICleanable {
    /**
     * Abstract method that will contain the logic for cleaning a component's data.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param callback 			the function to call when the clearing process is complete. It will
     * 							be called with an error, if one is raised.
     */
    clear(correlationId: string, callback?: (err: any) => void): void;
}
