import { IReferences } from './IReferences';
/**
 * Helper class that assigns references to components.
 */
export declare class Referencer {
    /**
     * Assigns references to a component. For references to be assigned, the component must
     * implement the [[IReferenceable]] interface.
     *
     * @param references 	the references to be assigned.
     * @param component 	the component to assign the references to.
     * @param callback 		function that will be called with an execution error if one is raised.
     *
     * @see [[IReferenceable]]
     */
    static setReferencesForOne(references: IReferences, component: any): void;
    /**
     * Assigns references to multiple components at once. For references to be assigned, all
     * component must implement the [[IReferenceable]] interface.
     *
     * @param references 	the references to be assigned.
     * @param components 	a list of components to assign the references to.
     *
     * @see [[IReferenceable]]
     */
    static setReferences(references: IReferences, components: any[]): void;
    /**
     * Clears the references of a component. For references to be unset, the component must
     * implement the [[IUnreferenceable]] interface.
     *
     * @param component 	the component, whose references must be cleared.
     *
     * @see [[IUnreferenceable]]
     */
    static unsetReferencesForOne(component: any): void;
    /**
     * Clears the references of multiple components at once. For references to be unset, the component must
     * implement the [[IUnreferenceable]] interface.
     *
     * @param components 	the list of components, whose references must be cleared.
     *
     * @see [[IUnreferenceable]]
     */
    static unsetReferences(components: any[]): void;
}
