/** @module refer */
import { TypeCode } from '../convert/TypeCode';

/**
 * Interface for creating sets of component references, which have the ability to add new references, 
 * find reference using locators, or remove reference from the set.
 * 
 * Used as part of the inversion of control design pattern, specifically - inversion of dependency.
 * 
 * In PipServices, the "location design pattern” is used, which is much simpler than dependency injection.
 * It is simple to implement and portable between languages. Used for building various containers, as well as 
 * for testing objects. 
 */
export interface IReferences {
	/**
	 * Abstract method that will contain the logic for putting a new component reference into 
	 * the set using an explicit locator.
	 * 
	 * @param locator 	the locator to find the reference by.
	 * @param component the component reference that is to be added.
	 */
	put(locator: any, component: any);

	/**
	 * Abstract method that will contain the logic for removing a component reference from the set. 
	 * Removes only the last reference.
	 * 
	 * @param locator 	the locator of the reference that is to be removed.
	 * @returns the removed reference.
	 * 
	 * @see [[removeAll]]
	 */
	remove(locator: any): any;	

	/**
	 * Abstract method that will contain the logic for removing all component references with the 
	 * given locator from the set. 
	 * 
	 * @param locator 	the locator to remove references by.
	 * @returns a list, containing all removed references.
	 */
	removeAll(locator: any): any[];	
	
	/**
	 * Abstract method that will contain the logic for getting all stored component locators.
	 * 
	 * @returns a list, containing the locators for all of the components stored in the set.
	 */
	getAllLocators(): any[];	

	/**
	 * Abstract method that will contain the logic for getting all stored component references.
	 * 	
	 * @returns a list, containing all component references stored in the set.
	 */
	getAll(): any[];	
		
	/**
	 * Abstract method that will contain the logic for getting a list of component references 
	 * that match the provided locator and the specified type.
	 * 
	 * @param locator 	the locator to find references by.	 
	 * @returns a list, containing all component references found.
	 */
	getOptional<T>(locator: any): T[];

	/**
	 * Abstract method that will contain the logic for getting a list of component references 
	 * that match the provided locator and the specified type. If no references are found, 
	 * an exception will be thrown.
	 * 
	 * @param locator 	the locator to find references by.	 
	 * @returns a list, containing all component references found.
	 * 
	 * @throws a [[ReferenceException]], if no component references are found by the given locator and type.
	 */
	getRequired<T>(locator: any): T[];

	/**
	 * Abstract method that will contain the logic for getting the component reference that matches 
	 * the provided locator and the specified type. The search is performed, starting from the 
	 * last-added references.
	 * 
	 * @param locator 	the locator to find a reference by. 
	 * @returns the component reference found or <code>null</code>, if none were found.
	 */
	getOneOptional<T>(locator: any): T;
	
	/**
	 * Abstract method that will contain the logic for getting the component reference that 
	 * matches the provided locator and the specified type.
	 * The search is performed, starting from the last-added references.
	 * 
	 * @param locator 	the locator to find a reference by.	 
	 * @returns the component reference found.
	 * @throws a [[ReferenceException]], if the requested component was not found.
	 */
	getOneRequired<T>(locator: any): T;

	/**
	 * Abstract method that will contain the logic for finding all references that match 
	 * the specified query criteria and the specified type.
	 * 
	 * @param locator 	the locator to find a reference by.
	 * @param required 	forces to raise an exception, if no reference is found.
	 * @returns a list of found references.
	 * 
	 * @throws a [[ReferenceException]], if the requested component was not found.
	 */
	find<T>(locator: any, required: boolean): T[];
}
