/** @module reflect */
/** @hidden */ 
let _ = require('lodash');

/**
 * Helper class that contains methods for working with an object's properties.
 */
export class PropertyReflector {
	/** Used to identify properties by their names and verify that they are indeed properties. */
	private static matchField(fieldName: string, fieldValue: any, expectedName: string): boolean {
        if (_.isFunction(fieldValue)) return false;
        if (_.startsWith(fieldName, '_')) return false;
        if (expectedName == null) return true;
        return fieldName.toLowerCase() == expectedName;
	}

	/**
	 * Static method that checks whether or not an object has a property with the given name.
	 * 
	 * @param obj 	the object to search for the given property in. Cannot be <code>null</code>.
	 * @param name 	the name of the property to search for. Cannot be <code>null</code>.
	 * @returns whether or not a property with the given name was found in the object.
	 * 
	 * @throws an Error if 'obj' or 'name' are <code>null</code>.
	 */
	public static hasProperty(obj: any, name: string): boolean {
		if (obj == null)
			throw new Error("Object cannot be null");
		if (name == null)
			throw new Error("Property name cannot be null");
		
        name = name.toLowerCase();
        for (let field in obj) {
            let fieldValue = obj[field];
        	if (PropertyReflector.matchField(field, fieldValue, name))
        		return true;
        }
		
        return false;
	}

	/**
	 * Static method that retrieves the value of an object's property using the property's name.
	 * 
	 * @param obj 	the object, whose property is to be retrieved. Cannot be <code>null</code>.
	 * @param name 	the name of the property that is to be retrieved. Cannot be <code>null</code>.
	 * @returns the value that is retrieved.
	 * 
	 * @throws an Error if 'obj' or 'name' are <code>null</code>.
	 */
	public static getProperty(obj: any, name: string): any {
		if (obj == null)
			throw new Error("Object cannot be null");
		if (name == null)
			throw new Error("Property name cannot be null");

        name = name.toLowerCase()
        for (let field in obj) {
            let fieldValue = obj[field];
        	try {
	        	if (PropertyReflector.matchField(field, fieldValue, name))
	        		return fieldValue;
        	} catch (ex) {
        		// Ignore exceptions
        	}
        }
		
        return null;
	}
	
	/**
     * Static method that retrieves the names of an object's properties.
     * 
     * @param obj   the object, whose property names are to be retrieved.
     * @returns a string array, containing the names of the object's properties.
     */
	public static getPropertyNames(obj: any): string[] {
        let properties: string[] = [];
		
        for (let field in obj) {
            let fieldValue = obj[field];
        	if (PropertyReflector.matchField(field, fieldValue, null))
        		properties.push(field);
        }
		        
		return properties;
	}

	/**
     * Static method that retrieves the properties of an object as a map.
     * 
     * @param obj   the object, whose properties are to be retrieved.
     * @returns a map, containing the names of the object's properties and their values.
     */
	public static getProperties(obj: any): any {
        let map: any = {};
		
        for (let field in obj) {
            let fieldValue = obj[field];
        	try {
	        	if (PropertyReflector.matchField(field, fieldValue, null))
	        		map[field] = fieldValue;
        	} catch (ex) {
        		// Ignore exception
        	}
        }
		        
		return map;
	}
	
	/**
     * Static method that sets an object's property to the given value. If no properties 
	 * are found by the given name, then the value will be set directly in the object using 
	 * the provided name (if supported).
     * 
     * @param obj   the object, whose property is to be set. Cannot be <code>null</code>.
	 * @param name	the name of the property to set. Cannot be <code>null</code>.
	 * @param value the value to set the object's property to.
	 *
	 * @throws an Error if 'obj' or 'name' are <code>null</code>.
     */
	public static setProperty(obj: any, name: string, value: any): void {
		if (obj == null)
			throw new Error("Object cannot be null");
		if (name == null)
			throw new Error("Property name cannot be null");

        let expectedName = name.toLowerCase();
        for (let field in obj) {
            let fieldValue = obj[field];
	    	try {        		
	            if (PropertyReflector.matchField(field, fieldValue, expectedName)) { 
	        		obj[field] = value;
	        		return;
	            }
	    	} catch (ex) {
	    		// Ignore exception
	    	}
        }

        // If no existing properties found set it directly
        obj[name] = value;
	}
	
	/**
	 * Static method that sets multiple object properties at once. Uses this class's 
	 * static [[setProperty]] method for each value that is to be set. 
	 * 
	 * @param obj 		the object, whose properties are to be set.
	 * @param values 	a map, containing property names as map keys and the values that are to be 
	 * 					set as map values.
	 * 
	 * @see [[setProperty]]
	 */
	public static setProperties(obj: any, values: any): void {
		if (values == null) return;
		
		for (let field in values) {
            let fieldValue = values[field];
			PropertyReflector.setProperty(obj, field, fieldValue);
		}
	}
}
