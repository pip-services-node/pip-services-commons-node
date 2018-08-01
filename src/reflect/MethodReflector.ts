/** @module reflect */
let _ = require('lodash');

/**
 * Helper class that contains methods for working with an object's methods.
 */
export class MethodReflector {
	/** Used to identify methods by their names and verify that they are indeed methods. */
    private static matchMethod(methodName: string, methodValue: any, expectedName: string): boolean {
        if (!_.isFunction(methodValue)) return false;
        if (_.startsWith(methodName, '_')) return false;
        if (expectedName == null) return true;
        return methodName.toLowerCase() == expectedName;
    }

	/**
	 * Static method that checks whether or not an object has a method with the given name.
	 * 
	 * @param obj 	the object to search for the given method in. Cannot be <code>null</code>.
	 * @param name 	the name of the method to search for. Cannot be <code>null</code>.
	 * @returns whether or not a method with the given name was found in the object.
	 * 
	 * @throws an Error if 'obj' or 'name' are <code>null</code>.
	 */
	public static hasMethod(obj: any, name: string): boolean {
		if (obj == null)
			throw new Error("Object cannot be null");
		if (name == null)
			throw new Error("Method name cannot be null");
		
        name = name.toLowerCase();
        for (let method in obj) {
            let methodValue = obj[method];
        	if (MethodReflector.matchMethod(method, methodValue, name))
        		return true;
        }

        return false;
	}

	/**
	 * Static method that invokes an object's method using the method's name.
	 * 
	 * @param obj 	the object, whose method is to be invoked. Cannot be <code>null</code>.
	 * @param name 	the name of the method that is to be invoked. Cannot be <code>null</code>.
	 * @param args 	the arguments that should be passed to the method.
	 * @returns the value that is returned by the invoked method.
	 * 
	 * @throws an Error if 'obj' or 'name' are <code>null</code>.
	 */
	public static invokeMethod(obj: any, name: string, ...args: any[]): any {
		if (obj == null)
			throw new Error("Object cannot be null");
		if (name == null)
			throw new Error("Method name cannot be null");
		
        name = name.toLowerCase();
        for (let method in obj) {
            let methodValue = obj[method];
        	try {
        	    if (MethodReflector.matchMethod(method, methodValue, name))
                    return methodValue.apply(obj, args);
        	} catch (ex) {
        		// Ignore exceptions
        	}
        }

        return null;
	}

  	/**
     * Static method that retrieves the names of an object's methods.
     * 
     * @param obj   the object, whose method names are to be retrieved.
     * @returns a string array, containing the names of the object's methods.
     */
	public static getMethodNames(obj: any): string[] {
        let methods: string[] = [];
		
        for (let method in obj) {
            let methodValue = obj[method];
        	if (MethodReflector.matchMethod(method, methodValue, null))
        		methods.push(method);
        }
        
		return methods;
	}

}
