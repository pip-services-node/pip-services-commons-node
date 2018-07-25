/**
 * Helper class that can be used to clean the data of components.
 *
 * @see [[ICleanable]]
 */
export declare class Cleaner {
    /**
     * Static method for cleaning a component. For a component to be cleaned, it must implement
     * the [[ICleanable]] interface. This method calls ICleanable's [[ICleanable.clear clear]] method
     * to clear the component passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param component 		the component that is to be cleaned.
     * @param callback 			the function to call when the clearing process is complete. It will
     * 							be called with an error, if one is raised.
     *
     * @see [[ICleanable]]
     */
    static clearOne(correlationId: string, component: any, callback?: (err: any) => void): void;
    /**
     * Static method for cleaning multiple components. For a component to be cleaned, it must implement
     * the [[ICleanable]] interface. This method calls the static [[clearOne]] method for each of the
     * components passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param components 		the list of components that are to be cleaned.
     * @param callback 			the function to call when the clearing process is complete. It will
     * 							be called with an error, if one is raised.
     *
     * @see [[clearOne]]
     * @see [[ICleanable]]
     */
    static clear(correlationId: string, components: any[], callback?: (err: any) => void): void;
}
