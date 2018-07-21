/**
 * Helper class that opens a collection of components
 */
export declare class Opener {
    /**
     * Checks if component that implement IOpenable interface is opened
     *
     * @param component 	component to be checked
     */
    static isOpenedOne(component: any): boolean;
    /**
     * Checks if components that implement IOpenable interface are opened
     *
     * @param components 	list of components to be checked
     */
    static isOpened(components: any[]): boolean;
    /**
     * Opens a component that implement IOpenable interface
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param component 		component to be opened.
     * @param callback 			function to call when open is complete.
     */
    static openOne(correlationId: string, component: any, callback?: (err: any) => void): void;
    /**
     * Opens component that implement IOpenable interface
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param components 		list of components to be opened.
     * @param callback 			function to call when open is complete.
     */
    static open(correlationId: string, components: any[], callback?: (err: any) => void): void;
}
