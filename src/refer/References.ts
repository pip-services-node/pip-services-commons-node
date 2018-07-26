/** @module refer */
import { Reference } from './Reference';
import { IReferences } from './IReferences';
import { ReferenceException } from './ReferenceException';

/**
 * Basic implementation of [[IReferences]], which stores components as a flat list.
 * 
 * @see [[IReferences]]
 */
export class References implements IReferences {	
	protected _references: Reference[] = [];
    
    /**
     * Creates a new References objects.
     * 
     * @param tuples    (optional) the tuples array to initialize this References object with. 
     *                  A tuples array contains index-based pairs, such as [key1,value1,key2,value2].
     */
	public constructor(tuples: any[] = null) {
		if (tuples != null) {
	        for (let index = 0; index < tuples.length; index += 2) {
	            if (index + 1 >= tuples.length) break;
	
	            this.put(tuples[index], tuples[index + 1]);
	        }
		}
	}
    
    /**
	 * Puts a new component reference into the set using an explicit locator.
	 * 
	 * @param locator 	the locator to find the reference by.
	 * @param component the component reference that is to be added.
	 */
	public put(locator: any, component: any): void {
		if (component == null)
			throw new Error("Component cannot be null");

        this._references.push(new Reference(locator, component));
	}
    
    /**
	 * Removes a component reference from the set. Removes only the last reference.
	 * 
	 * @param locator 	the locator of the reference that is to be removed.
	 * @returns the removed reference.
	 * 
	 * @see [[removeAll]]
	 */
	public remove(locator: any): any {
		if (locator == null) return null;

        for (let index = this._references.length - 1; index >= 0; index--) {
            let reference = this._references[index];
            if (reference.match(locator)) {
                this._references.splice(index, 1);
                return reference.getComponent();
            }
        }
		
		return null;
	}

    /**
	 * Removes all component references with the given locator from the set. 
	 * 
	 * @param locator 	the locator to remove references by.
	 * @returns a list, containing all removed references.
	 */
	public removeAll(locator: any): any[] {
        let components: any[] = [];
		
		if (locator == null) return components;

        for (let index = this._references.length - 1; index >= 0; index--) {
            let reference = this._references[index];
            if (reference.match(locator)) {
                this._references.splice(index, 1);
                components.push(reference.getComponent());
            }
        }
		
		return components;
	}

    /**
	 * Gets all stored component locators.
	 * 
	 * @returns a list, containing the locators for all of the components stored in the set.
	 */
	public getAllLocators(): any[] {
        let locators: any[] = [];
		
        for (let index = 0; index < this._references.length; index++) {
            let reference = this._references[index];
            locators.push(reference.getLocator());
        }
		
		return locators;
    }
    
	/**
	 * Gets all stored component references.
	 * 
	 * @returns a list, containing all component references stored in the set.
	 */
    public getAll(): any[] {
        let components: any[] = [];
		
        for (let index = 0; index < this._references.length; index++) {
            let reference = this._references[index];
            components.push(reference.getComponent());
        }
		
		return components;
	}
    
    /**
	 * Gets a list of component references that match the provided locator and the specified type.
	 * 
	 * @param locator 	the locator to find references by.
	 * @returns a list, containing all component references found.
	 */
    public getOneOptional<T>(locator: any): T {
    	try {
	        let components = this.find<T>(locator, false);
            return components.length > 0 ? components[0] : null;
    	} catch (ex) {
    		return null;
    	}
    }

    /**
	 * Gets a list of component references that match the provided locator and the specified type. 
	 * If no references are found, an exception will be thrown.
	 * 
	 * @param locator 	the locator to find references by.
	 * @returns a list, containing all component references found.
	 */
    public getOneRequired<T>(locator: any): T {
        let components = this.find<T>(locator, true);
        return components.length > 0 ? components[0] : null;
    }

    /**
	 * Gets the component reference that matches the provided locator and the specified type.
	 * The search is performed, starting from the last-added references.
	 * 
	 * @param locator 	the locator to find a reference by.
	 * @returns the component reference found or <code>null</code>, if none were found.
	 */
    public getOptional<T>(locator: any): T[] {
    	try {
    		return this.find<T>(locator, false);
    	} catch (ex) {
            return [];
    	}
    }

	/**
	 * Gets the component reference that matches the provided locator and the specified type.
	 * The search is performed, starting from the last-added references.
	 * 
	 * @param locator 	the locator to find a reference by.
	 * @returns the component reference found.
	 */
    public getRequired<T>(locator: any): T[] {
        return this.find<T>(locator, true);
    }

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
	public find<T>(locator: any, required: boolean): T[] {
		if (locator == null)
			throw new Error("Locator cannot be null");

        let components: T[] = [];

        // Search all references
        for (let index = this._references.length - 1; index >= 0; index--) {
            let reference = this._references[index];
            if (reference.match(locator)) {
                let component = reference.getComponent();
                components.push(component);
            }
        }

        if (components.length == 0 && required)
            throw new ReferenceException(null, locator);

        return components;
    }

    /**
     * Static method that creates a new References objects using the tuples arrays that are passed as parameters.
     * 
     * @param tuples    the tuples arrays to initialize the new References object with. 
     *                  A tuples array contains index-based pairs, such as [key1,value1,key2,value2].
     * @returns the References object that was generated using the given tuples arrays,
     */
	public static fromTuples(...tuples: any[]): References {
		return new References(tuples);
	}
}