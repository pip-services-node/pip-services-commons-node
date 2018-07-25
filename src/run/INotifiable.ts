/** @module run */
import { Parameters } from './Parameters';

/**
 * Interface for active components that can be notified (called without expecting a result).
 */
export interface INotifiable {
	/**
	 * Abstract method that will contain the logic for executing a unit of work.
	 * @param correlationId 	unique business transaction id to trace calls across components.
	 * @param args 				the set of parameters (arguments) for execution.
	 */
	notify(correlationId: string, args: Parameters): void;
}
