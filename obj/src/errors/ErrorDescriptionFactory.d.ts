import { ErrorDescription } from './ErrorDescription';
/**
 * Contains the static method 'create', which converts ApplicationExceptions and specific (unknown) errors into ErrorDescriptions.
 *
 * @see ErrorDescription
 * @see ApplicationException
 */
export declare class ErrorDescriptionFactory {
    /**
     * @param error  	a child classs of ApplicationException (in which case it is simply converted into an ErrorDescription),
     *                  or a specific (unknown) error, which contain error.name (set to ErrorDescription's type), error.message (error.toString(),
     *                  if not available), and error.stack. In the second case, the ErrorDescription's
     *                  status will be 500, and its code (and category) will be 'UNKNOWN' (ErrorCategory.Unknown).
     * @returns       	An ErrorDescription, containing all available information about the error.
     */
    static create(error: any): ErrorDescription;
}
