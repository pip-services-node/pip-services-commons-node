/** @module run */
import { Parameters } from './Parameters';

/**
 * Interface for active components that can be called to execute work.
 * 
 * Implementation example:
 * 
 *     // Define command
 *     class MyCommand implements IExecutable {
 *     …
 *     public execute(correlationId: string, args: Parameters, callback: (err: any, result: any)): void {
 *         // Extract arguments
 *         let item = args.Get(‘item’);
 *         // Call controller
 *         this.controller.DoSomething(correlationId, item, callback);
 *     }
 *     …
 *     }
 *     
 * Example of calling the command:
 * 
 *     // Calling command
 *     var args = Parameters.fromTuples(‘item’, item);
 *     command.execute(correlationId, args, (err, result) => {
 *     …
 *     });
 */
export interface IExecutable {
	/**
	 * Abstract method that will contain the logic for executing a unit of work.
	 * 
	 * @param correlationId 	optional transaction id to trace calls across components.
	 * @param args 				the set of parameters (arguments) for execution.
     * @param callback 			the callback function that will be called with the result
	 * 							of the execution or with an error (if one is raised).
	 */
	execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void;
}
