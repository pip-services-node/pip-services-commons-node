/**
 * Helper class that can be used to open components.
 */
export declare class Opener {
    /**
     * Static method for checking whether or not a component has been opened. For a component to be checked,
     * it must implement the [[IOpenable]] interface. This method calls IOpenable's [[IOpenable.isOpen isOpen]]
     * method to check if the component has been opened.
     *
     * @param component 	the component that is to be checked.
     *
     * @see [[IOpenable]]
     */
    static isOpen(component: any): boolean;
    /**
     * Static method for checking whether or not a list of components have been opened. For a component to be checked,
     * it must implement the [[IOpenable]] interface. This method calls the static [[isOpen]] method for each
     * component passed, to check if it has been opened.
     *
     * @param components 	the list of components that are to be checked.
     *
     * @see [[isOpen]]
     * @see [[IOpenable]]
     */
    static areOpen(components: any[]): boolean;
    /**
     * Static method for opening a component. For a component to be opened, it must implement
     * the [[IOpenable]] interface. This method calls IOpenable's [[IOpenable.open open]] method
     * to open the component passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param component 		the component that is to be opened.
     * @param callback 			the function to call when the opening process is complete. It will
     * 							be called with an error if one is raised.
     *
     * @see [[IOpenable]]
     */
    static openOne(correlationId: string, component: any, callback?: (err: any) => void): void;
    /**
     * Static method for opening multiple components. For a component to be opened, it must implement
     * the [[IOpenable]] interface. This method calls the static [[openOne]] method for each of the
     * components passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param components 		the list of components that are to be opened.
     * @param callback 			the function to call when the opening process is complete. It will
     * 							be called with an error if one is raised.
     *
     * @see [[openOne]]
     * @see [[IOpenable]]
     */
    static openMany(correlationId: string, components: any[], callback?: (err: any) => void): void;
}
