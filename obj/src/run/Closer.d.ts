/**
 * Helper class that can be used to close components.
 */
export declare class Closer {
    /**
     * Static method for closing a component. For a component to be closed, it must implement
     * the [[ICloseable]] interface. This method calls ICloseable's [[ICloseable.close close]] method
     * to close the component passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param component 		the component that is to be closed.
     * @param callback 			the function to call when the closing process is complete. It will
     * 							be called with an error, if one is raised.
     *
     * @see [[ICloseable]]
     */
    static closeOne(correlationId: string, component: any, callback?: (err: any) => void): void;
    /**
     * Static method for closing multiple components. For a component to be closed, it must implement
     * the [[ICloseable]] interface. This method calls the static [[closeOne]] method for each of the
     * components passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param components 		the list of components that are to be closed.
     * @param callback 			the function to call when the closing process is complete. It will
     * 							be called with an error, if one is raised.
     *
     * @see [[closeOne]]
     * @see [[ICloseable]]
     */
    static close(correlationId: string, components: any[], callback?: (err: any) => void): void;
}
