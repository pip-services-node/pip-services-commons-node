/** @module refer */
import { Reference } from './Reference';
import { IReferences } from './IReferences';
/**
 * Basic implementation of [[IReferences]], which stores components as a flat list.
 *
 * @see [[IReferences]]
 */
export declare class References implements IReferences {
    protected _references: Reference[];
    /**
     * Creates a new References objects.
     *
     * @param tuples    (optional) the tuples array to initialize this References object with.
     *                  A tuples array contains index-based pairs, such as [key1,value1,key2,value2].
     */
    constructor(tuples?: any[]);
    /**
     * Puts a new component reference into the set using an explicit locator.
     *
     * @param locator 	the locator to find the reference by.
     * @param component the component reference that is to be added.
     */
    put(locator: any, component: any): void;
    /**
     * Removes a component reference from the set. Removes only the last reference.
     *
     * @param locator 	the locator of the reference that is to be removed.
     * @returns the removed reference.
     *
     * @see [[removeAll]]
     */
    remove(locator: any): any;
    /**
     * Removes all component references with the given locator from the set.
     *
     * @param locator 	the locator to remove references by.
     * @returns a list, containing all removed references.
     */
    removeAll(locator: any): any[];
    /**
     * Gets all stored component locators.
     *
     * @returns a list, containing the locators for all of the components stored in the set.
     */
    getAllLocators(): any[];
    /**
     * Gets all stored component references.
     *
     * @returns a list, containing all component references stored in the set.
     */
    getAll(): any[];
    /**
     * Gets a list of component references that match the provided locator and the specified type.
     *
     * @param locator 	the locator to find references by.
     * @returns a list, containing all component references found.
     */
    getOneOptional<T>(locator: any): T;
    /**
     * Gets a list of component references that match the provided locator and the specified type.
     * If no references are found, an exception will be thrown.
     *
     * @param locator 	the locator to find references by.
     * @returns a list, containing all component references found.
     */
    getOneRequired<T>(locator: any): T;
    /**
     * Gets the component reference that matches the provided locator and the specified type.
     * The search is performed, starting from the last-added references.
     *
     * @param locator 	the locator to find a reference by.
     * @returns the component reference found or <code>null</code>, if none were found.
     */
    getOptional<T>(locator: any): T[];
    /**
     * Gets the component reference that matches the provided locator and the specified type.
     * The search is performed, starting from the last-added references.
     *
     * @param locator 	the locator to find a reference by.
     * @returns the component reference found.
     */
    getRequired<T>(locator: any): T[];
    /**
     * Finds all references that match the specified query criteria and the specified type.
     *
     * @param locator 	the locator to find a reference by.
     * @param required 	forces to raise an exception, if no reference is found.
     * @returns a list of found references.
     *
     * @throws a Error, if the locator is <code>null</code>.
     * @throws a [[ReferenceException]], if required is set to <code>true</code>
     *          and nothing was found.
     */
    find<T>(locator: any, required: boolean): T[];
    /**
     * Static method that creates a new References objects using the tuples arrays that are passed as parameters.
     *
     * @param tuples    the tuples arrays to initialize the new References object with.
     *                  A tuples array contains index-based pairs, such as [key1,value1,key2,value2].
     * @returns the References object that was generated using the given tuples arrays,
     */
    static fromTuples(...tuples: any[]): References;
}
