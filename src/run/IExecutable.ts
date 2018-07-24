/** @module run */
import { Parameters } from './Parameters';

/**
 * Interface for active components that can be called to execute work.
 */
//TODO (Deprecated?): In contrast to [[IParamExecutable]], this interface does not require parameters.
export interface IExecutable {
	/**
	 * Abstract method that will contain the logic for executing a unit of work.
	 * 
	 * @param correlationId 	unique business transaction id to trace calls across components.
	 * @param args 				the set of parameters (arguments) for execution.
     * @param callback 			the callback function that will be called with the result
	 * 							of the execution or with an error, if one is raised.
	 */
	execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void;
}
