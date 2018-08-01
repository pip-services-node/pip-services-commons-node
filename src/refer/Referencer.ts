/** @module refer */
/** @hidden */ 
let _ = require('lodash');

import { IReferences } from './IReferences';

/**
 * Helper class that assigns references to components.
 */
export class Referencer {
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
	public static setReferencesForOne(references: IReferences, component: any): void {
        if (_.isFunction(component.setReferences))
			component.setReferences(references);
	}

	/**
	 * Assigns references to multiple components at once. For references to be assigned, all 
	 * component must implement the [[IReferenceable]] interface.
	 * 
	 * @param references 	the references to be assigned.
	 * @param components 	a list of components to assign the references to.
	 * 
	 * @see [[IReferenceable]]
	 */
	public static setReferences(references: IReferences, components: any[]): void {
		for (let index = 0; index < components.length; index++)
			Referencer.setReferencesForOne(references, components[index]);
	}

	/**
	 * Clears the references of a component. For references to be unset, the component must 
	 * implement the [[IUnreferenceable]] interface.
	 * 
	 * @param component 	the component, whose references must be cleared.
	 * 
	 * @see [[IUnreferenceable]]
	 */
	public static unsetReferencesForOne(component: any): void {
        if (_.isFunction(component.unsetReferences))
			component.unsetReferences();
	}

	/**
	 * Clears the references of multiple components at once. For references to be unset, the component must 
	 * implement the [[IUnreferenceable]] interface.
	 * 
	 * @param components 	the list of components, whose references must be cleared.
	 * 
	 * @see [[IUnreferenceable]]
	 */
	public static unsetReferences(components: any[]): void {
		for (let index = 0; index < components.length; index++)
			Referencer.unsetReferencesForOne(components[index]);
	}
}
