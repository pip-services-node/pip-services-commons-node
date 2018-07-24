/** @module run */
let _ = require('lodash');
let async = require('async');

import { Parameters } from './Parameters';

/**
 * Helper class that can be used to trigger execution of components.
 */
export class Executor {
    //TODO (Depricated?): implement IExecutable and IParamExecutable interfaces and passes to IParamExecutable them set of parameters. 
    /**
	 * Static method for triggering the execution of a component. For a component to be executed, it must 
     * implement the [[IExecutable]] interface. This method calls IExecutable's [[IExecutable.execute execute]] 
     * method to execute the component passed.
	 * 
	 * @param correlationId 	unique business transaction id to trace calls across components.
	 * @param component 		the component that is to be executed.
     * @param args              the parameters (arguments) to pass to the component for its execution.
     * @param callback 			the function to call when execution is complete. It will be called with 
     *                          the result of the execution or with an error, if one is raised.
	 * 
	 * @see [[IExecutable]]
	 */
	public static executeOne(
		correlationId: string, component: any, args: Parameters, callback: (err: any, result: any) => void) {

        if (_.isFunction(component.execute)) {
            try {
			    return component.execute(correlationId, args, callback);
			} catch (err) {
                callback(err, null);
			}
        } else callback(null, null);
	}

    //TODO (Depricated?): implement IExecutable and IParamExecutable interfaces and passes to IParamExecutable them set of parameters. 
    /**
	 * Static method for triggering the execution of multiple components. For a component to be executed, 
     * it must implement the [[IExecutable]] interface. This method calls the static [[executeOne]] method 
     * for each of the components passed.
	 * 
	 * @param correlationId 	unique business transaction id to trace calls across components.
	 * @param components 		the list of components that are to be executed.
     * @param args              the parameters (arguments) to pass to the components for their execution.
     * @param callback 			the function to call when execution is complete. It will be called with 
     *                          the results of all executions or with an error, if one is raised.
	 * 
	 * @see [[executeOne]]
	 * @see [[IExecutable]]
	 */
    public static execute(correlationId: string, components: any[], args: Parameters, callback: (err: any, results: any[]) => void) {
        let results: any[] = [];				

        async.eachSeries(
            components,
            (component, callback) => {
                Executor.executeOne(
                    correlationId, component, args,
                    (err, result) => {
                        results.push(result);
                        callback(err);
                    }
                );
            }, 
            (err) => {
                callback(err, results);
            }
        );
	}
}