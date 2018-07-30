/** @module run */
import { Parameters } from './Parameters';

/**
 * Interface for components that require parameters.
 */
export interface IParameterized {
	/**
	 * Abstract method that will contain the logic for setting a component's configuration parameters.
	 * 
	 * @param parameters 	the configuration parameters to set.
	 * @throws a [[ConfigException]] if the configuration is wrong and cannot be set.
	 */
	setParameters(parameters: Parameters): void;
}
