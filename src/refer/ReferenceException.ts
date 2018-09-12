/** @module refer */
import { InternalException } from '../errors/InternalException';

/**
 * Thrown, when the required component is not found in the references that are set.
 */
export class ReferenceException extends InternalException {

	/**
	 * Creates a new ReferenceException, containing information about the exception's 
	 * correlation id and locator.
	 * 
	 * @param correlationId 	optional transaction id to trace calls across components.
	 * @param locator 			the locator by which no components were found.
	 */
	public constructor(correlationId: string, locator: any) {
		super(correlationId, "REF_ERROR", "Failed to obtain reference to " + locator);
		this.withDetails("locator", locator);
	}

}
