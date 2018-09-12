/** @module run */
/**
 * Interface for components that can clean their data.
 *
 * Such components are typically used during testing, when a database or queue is used and needs to be
 * quickly cleaned (or truncated) once the test has finished. This is done to remove any garbage that
 * might have been left-over by a test, as this data can interfere with future tests. To ensure that all
 * tests run as clean as possible, the database/queue should be returned/reverted back to its initial state.
 * This interface's [[clear]] method allows for such cleaning to be performed.
 */
export interface ICleanable {
    /**
     * Abstract method that will contain the logic for cleaning a component's data.
     *
     * @param correlationId 	optional transaction id to trace calls across components.
     * @param callback 			the function to call when the clearing process is complete. It will
     * 							be called with an error if one is raised.
     */
    clear(correlationId: string, callback?: (err: any) => void): void;
}
