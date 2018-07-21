import { ErrorDescription } from './ErrorDescription';
import { ApplicationException } from './ApplicationException';
/**
 * Contains the static method 'create', which converts ErrorDescriptions back into ApplicationExceptions.
 *
 * @see ErrorDescription
 * @see ApplicationException
 */
export declare class ApplicationExceptionFactory {
    /**
     * @param description  	An ErrorDescription, which contains the error's category (defines what type of ApplicationException to create);
     * 						correlationId, code, and message (all 3 are used in the ApplicationException's constructor); details, cause,
     * 						and stack_trace (to fill the corresponding fields of the ApplicationException object).
     * @returns       		A class child class of ApplicationException, which corresponding to the ErrorDescription that was passed.
     */
    static create(description: ErrorDescription): ApplicationException;
}
