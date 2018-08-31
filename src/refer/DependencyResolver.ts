/** @module refer */
import { StringConverter } from '../convert/StringConverter';
import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
import { IReferenceable } from './IReferenceable';
import { IReferences } from './IReferences';
import { ReferenceException } from './ReferenceException';
import { Descriptor } from './Descriptor';

/**
 * Helper class for resolving component dependencies.
 * 
 * ### Examples ###
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
export class DependencyResolver implements IReferenceable, IReconfigurable {
	private _dependencies: any = {};
	private _references: IReferences;
	
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
	public constructor(config?: ConfigParams, references?: IReferences) {
		if (config != null)
			this.configure(config);
		if (references != null)
			this.setReferences(references);
	}

	/**
	 * Configures this object using the given [[ConfigParams]]. This method looks for a section 
	 * named "dependencies", which should contain locators (or [[Descriptor Descriptors]]) to 
	 * dependencies.
	 * 
	 * @param config 	the dependencies to configure this object with.
	 * 
	 * @see [[ConfigParams]]
	 */
	public configure(config: ConfigParams): void {
		let dependencies = config.getSection("dependencies");
        let names = dependencies.getKeys();
		for (let index = 0; index < names.length; index++) {
            let name = names[index];
			let locator = dependencies.get(name);
			if (locator == null) continue;
			
			try {
				let descriptor = Descriptor.fromString(locator);
				if (descriptor != null)
					this._dependencies[name] = descriptor;
				else
					this._dependencies[name] = locator;
			} catch (ex) {
				this._dependencies[name] = locator;
			}
		}
	}

	/**
	 * Sets this object's component references.
	 * 
	 * @param references 	the component references to set.
	 */
	public setReferences(references: IReferences): void {
		this._references = references;
	}

	/**
	 * Places a new dependency into this DependencyResolver object.
	 * 
	 * @param name 		the dependency's name.
	 * @param locator 	the locator to find the dependency by.
	 */
	public put(name: string, locator: any): void {
		this._dependencies[name] = locator;
	}

	/**
	 * Locates the dependency with the given name.
	 * 
	 * @param name 	the name of the dependency to locate.
	 * @returns the locator of the dependency that was located.
	 * 
	 * @throws an Error if 'name' is null or no references are set. 
	 */
	private locate(name: string): any {
		if (name == null)
			throw new Error("Dependency name cannot be null");
		if (this._references == null)
			throw new Error("References shall be set");
		
		return this._dependencies[name];
	}
	
    /**
	 * Gets a list of component references that match the locator stored by the given name 
	 * in the dependencies that are set.
	 * 
	 * @param name 		the name of the dependency that stores the component's locator.
	 * @returns a list, containing all component references found.
	 */
	public getOptional<T>(name: string): T[] {
		let locator = this.locate(name);		
		return locator != null ? this._references.getOptional<T>(locator) : null;
	}

	/**
	 * Gets a list of component references that match the locator stored by the given name 
	 * in the dependencies that are set. If no references are found, an exception will be thrown.
	 * 
	 * @param name 		the name of the dependency that stores the component's locator.
	 * @returns a list, containing all component references found.
	 * 
	 * @throws a [[ReferenceException]] if no dependencies (locators) are found by the given name.
	 */
	public getRequired<T>(name: string): T[] {
		let locator = this.locate(name);
		if (locator == null)
			throw new ReferenceException(null, name);
		
		return this._references.getRequired<T>(locator);
	}

    /**
	 * Gets a component reference that matches the locator stored by the given name 
	 * in the dependencies that are set. The search is performed, starting from the 
	 * last-added references.
	 * 
	 * @param name 		the name of the dependency that stores the component's locator.
	 * @returns the component references found or <code>null</code> (if none were found).
	 */
	public getOneOptional<T>(name: string): T {
		let locator = this.locate(name);
		return locator != null ? this._references.getOneOptional<T>(locator) : null;
	}

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
	public getOneRequired<T>(name: string): T {
		let locator = this.locate(name);
		if (locator == null)
			throw new ReferenceException(null, name);
		
		return this._references.getOneRequired<T>(locator);
	}

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
	public find<T>(name: string, required: boolean): T[] {
		if (name == null)
			throw new Error("Name cannot be null");
		
		let locator = this.locate(name);
		if (locator == null) {
			if (required)
				throw new ReferenceException(null, name);
			return null;
		}
		
		return this._references.find<T>(locator, required);
	}
	
	/**
     * Static method that creates a new DependencyResolver object using the tuples arrays that are passed as parameters.
     * 
     * @param tuples    the tuples arrays to initialize the new References object with. 
     *                  A tuples array contains index-based pairs, such as [key1,value1,key2,value2].
     * @returns the DependencyResolver object that was generated using the given tuples arrays,
     */
	public static fromTuples(...tuples: any[]): DependencyResolver {
		let result = new DependencyResolver();
    	if (tuples == null || tuples.length == 0)
    		return result;
    	
        for (let index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length) break;

            let name = StringConverter.toString(tuples[index]);
            let locator = tuples[index + 1];

            result.put(name, locator);
        }
        
        return result;
	}
}
