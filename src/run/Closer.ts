/** @module run */
/** @hidden */ 
let _ = require('lodash');
/** @hidden */ 
let async = require('async');

/**
 * Helper class that can be used to close components.
 */
export class Closer {
	/**
	 * Static method for closing a component. For a component to be closed, it must implement 
	 * the [[IClosable]] interface. This method calls ICloseable's [[IClosable.close close]] method 
	 * to close the component passed.
	 * 
	 * @param correlationId 	optional transaction id to trace calls across components.
	 * @param component 		the component that is to be closed.
     * @param callback 			the function to call when the closing process is complete. It will 
	 * 							be called with an error if one is raised.
	 * 
	 * @see [[IClosable]]
	 */
	public static closeOne(correlationId: string, component: any, callback?: (err: any) => void): void {
        if (_.isFunction(component.close)) {
			try {
				component.close(correlationId, callback);
			} catch (err) {
				if (callback) callback(err);
				else throw err;
			}
		} else if (callback) 
			callback(null);
	}

	/**
	 * Static method for closing multiple components. For a component to be closed, it must implement 
	 * the [[IClosable]] interface. This method calls the static [[closeOne]] method for each of the 
	 * components passed.
	 * 
	 * @param correlationId 	optional transaction id to trace calls across components.
	 * @param components 		the list of components that are to be closed.
     * @param callback 			the function to call when the closing process is complete. It will 
	 * 							be called with an error if one is raised.
	 * 
	 * @see [[closeOne]]
	 * @see [[IClosable]]
	 */
	public static close(correlationId: string, components: any[], callback?: (err: any) => void): void {
        async.eachSeries(
            components,
            (component, callback) => {
				Closer.closeOne(correlationId, component, callback);
            }, 
            (err) => {
				if (callback) callback(err);
				else if (err) throw err;
			}
        );
	}
}
