/**
 * Helper class that cleans components
 */
export declare class Cleaner {
    /**
     * Cleans component that implement ICleanable interface
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param component 		component to be cleaned.
     * @param callback 			function to call when cleaning is complete.
     */
    static clearOne(correlationId: string, component: any, callback?: (err: any) => void): void;
    /**
     * Cleans components that implement ICleanable interface
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param components 		list of components to be cleaned
     * @param callback 			function to call when cleaning is complete
     */
    static clear(correlationId: string, components: any[], callback?: (err: any) => void): void;
}
