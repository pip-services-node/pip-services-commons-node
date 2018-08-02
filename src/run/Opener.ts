/** @module run */
/** @hidden */ 
let _ = require('lodash');
/** @hidden */ 
let async = require('async');

/**
 * Helper class that can be used to open components.
 */
export class Opener {
	/**
	 * Static method for checking whether or not a component has been opened. For a component to be checked, 
	 * it must implement the [[IOpenable]] interface. This method calls IOpenable's [[IOpenable.isOpen isOpen]] 
	 * method to check if the component has been opened.
	 * 
	 * @param component 	the component that is to be checked.
	 * 
	 * @see [[IOpenable]]
	 */
<<<<<<< HEAD
	public static isOpenOne(component: any): boolean {
=======
	public static isOpen(component: any): boolean {
>>>>>>> 346e56e21539be6cadf7e5a204c52eb8d8473283
		if (_.isFunction(component.isOpen))
			return component.isOpen();
		else
			return true;
	}	

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
	public static isOpen(components: any[]): boolean {
		if (components == null) return true;
		
		let result: boolean = true;
		for (let index = 0; index < components.length; index++)
			result = result && Opener.isOpenOne(components[index]);
		
		return result;
	}

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
	public static openOne(correlationId: string, component: any, callback?: (err: any) => void): void {
        if (_.isFunction(component.open)) {
			try {
				component.open(correlationId, callback);
			} catch (err) {
				if (callback) callback(err);
				else if (err) throw err;
			}
		} else if (callback)
			callback(null);
	}	

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
	public static open(correlationId: string, components: any[], callback?: (err: any) => void): void {
        async.eachSeries(
            components,
            (component, callback) => {
                Opener.openOne(correlationId, component, callback);
            }, 
            (err) => {
				if (callback) callback(err);
				else if (err) throw err;
			}
        );
	}

}
