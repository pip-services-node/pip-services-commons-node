import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
import { IReferenceable } from './IReferenceable';
import { IReferences } from './IReferences';
/**
 * Helper class for resolving component dependencies.
 *
 * ### Examples ###
 *
 * A DependencyResolver object can be created and used in the following way:
 *
 *     public MyMethod(IReferences references){
 *         let _dependencyResolver = new DependencyResolver(ConfigParams.fromTuples("Dependency", "Value"));
 *         ...
 *
 *         _dependencyResolver.setReferences(references);
 *         ...
 *
 *     }
 * @see [[IReferences]]
 */
export declare class DependencyResolver implements IReferenceable, IReconfigurable {
    private _dependencies;
    private _references;
    /**
     * Creates a new DependencyResolver object.
     *
     * @param config		(optional) the configuration parameters (dependencies) to configure this
     * 						object with. If omitted, then they can be set later on using [[configure]].
     * @param references 	(optional) the component references to set for this object.
     * 						If omitted, then they can be set later on using [[setReferences]].
     *
     * @see [[ConfigParams]]
     * @see [[configure]]
     * @see [[IReferences]]
     * @see [[setReferences]]
     */
    constructor(config?: ConfigParams, references?: IReferences);
    /**
     * Configures this object using the given [[ConfigParams]]. This method looks for a section
     * named "dependencies", which should contain locators (or [[Descriptor Descriptors]]) to
     * dependencies.
     *
     * @param config 	the dependencies to configure this object with.
     *
     * @see [[ConfigParams]]
     */
    configure(config: ConfigParams): void;
    /**
     * Sets this object's component references.
     *
     * @param references 	the component references to set.
     */
    setReferences(references: IReferences): void;
    /**
     * Places a new dependency into this DependencyResolver object.
     *
     * @param name 		the dependency's name.
     * @param locator 	the locator to find the dependency by.
     */
    put(name: string, locator: any): void;
    /**
     * Locates the dependency with the given name.
     *
     * @param name 	the name of the dependency to locate.
     * @returns the locator of the dependency that was located.
     *
     * @throws an Error if 'name' is null or no references are set.
     */
    private locate;
    /**
     * Gets a list of component references that match the locator stored by the given name
     * in the dependencies that are set.
     *
     * @param name 		the name of the dependency that stores the component's locator.
     * @returns a list, containing all component references found.
     */
    getOptional<T>(name: string): T[];
    /**
     * Gets a list of component references that match the locator stored by the given name
     * in the dependencies that are set. If no references are found, an exception will be thrown.
     *
     * @param name 		the name of the dependency that stores the component's locator.
     * @returns a list, containing all component references found.
     *
     * @throws a [[ReferenceException]] if no dependencies (locators) are found by the given name.
     */
    getRequired<T>(name: string): T[];
    /**
     * Gets a component reference that matches the locator stored by the given name
     * in the dependencies that are set. The search is performed, starting from the
     * last-added references.
     *
     * @param name 		the name of the dependency that stores the component's locator.
     * @returns the component references found or <code>null</code> (if none were found).
     */
    getOneOptional<T>(name: string): T;
    /**
     * Gets a component reference that matches the locator stored by the given name
     * in the dependencies that are set. The search is performed, starting from the
     * last-added references.
     *
     * If no dependencies are found by the given name, an exception will be thrown.
     *
     * @param name 		the name of the dependency that stores the component's locator.
     * @returns the component reference found.
     *
     * @throws a [[ReferenceException]] if no dependencies (locators) are found by the given name.
     */
    getOneRequired<T>(name: string): T;
    /**
     * Finds all references that match the specified query criteria and the specified type.
     *
     * @param name 		the name of the dependency that stores the component's locator.
     * @param required 	forces to raise an exception if no reference is found.
     * @returns a list of found references.
     *
     * @throws an Error if the name is <code>null</code>.
     * @throws a [[ReferenceException]] if required was set to <code>true</code>
     *          and nothing was found.
     */
    find<T>(name: string, required: boolean): T[];
    /**
     * Static method that creates a new DependencyResolver object using the tuples arrays that are passed as parameters.
     *
     * @param tuples    the tuples arrays to initialize the new References object with.
     *                  A tuples array contains index-based pairs, such as [key1,value1,key2,value2].
     * @returns the DependencyResolver object that was generated using the given tuples arrays,
     */
    static fromTuples(...tuples: any[]): DependencyResolver;
}
