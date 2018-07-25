import { StringValueMap } from '../data/StringValueMap';
/**
 * This class provides cross-language (portable) and language-independent (localizable) standardization of exceptions.
 *
 * ApplicationException contains a strict structure and methods that help structurize free-form exception messages.
 * While ApplicationExceptions themselves are not serializable, they can be converted to [[ErrorDescription ErrorDescriptions]],
 * which are serializable. Serialization of ErrorDescriptions is necessary for sending exceptions over the REST interface
 * back to "caller" microservices (cross-language error propagation).
 *
 * An ApplicationException contains enough information in its fields to create detailed localized strings for practically
 * any exception. It uniquely defines the type of exception (via the 'code' field) and links exceptions to business
 * transactions (via 'correlation_id').
 *
 * ApplicationException serves as a parent class for all other (Category)Exception classes.
 *
 * Usage:
 * - The classes included in this package (which already extend ApplicationException) can be used "as is".
 * - Developers can use this class to create their own application exceptions (from the ground up).
 * - Exceptions can be wrapped around one another (new exceptions can be wrapped around existing exceptions).
 * - PipService's microservices automatically intercept common exceptions and try to convert them to the closest available
    * type of ApplicationException.
 * - ApplicationExceptions can be converted to [[ErrorDescription ErrorDescriptions]], which can then be sent back to 'caller'
    * microservices, even if they are written in a different language. When the microservice on the other end
    * receives the ErrorDescription, it can use it to restore the ApplicationException and propagate the exception to
    * the place from where the call was made.
 *
 * Defaults:
 * - status = 500
 * - code = 'UNKNOWN'
 * - category = ErrorCategory.Unknown
 * - message = 'Unknown error'
 *
 * @see [[ErrorDescription]]
 */
export declare class ApplicationException extends Error {
    /**This field stores the message or description that was contained in the original error.
     * Errors' messages are always in English. However, using this class's 'code' and 'details'
     * fields, we can create localized versions of the error's message and use them instead in the UI. */
    message: string;
    /** Defines what category of exceptions this exception belongs to. */
    category: string;
    /** Used when sending over the REST interface, so that we know what HTTP status code to raise. */
    status: number;
    /** Every error needs a unique code by which it can be identified. Using this code,
     *  we can select which localized error messages to use and what to display in the UI.*/
    code: string;
    /**This field is used to add additional information to localized error message strings.
     *
     * For example, if we received an ObjectNotFoundException (general error) when searching for an
     * object via its id, the id by which the object was not found can be added as a detail. This allows
     * us to add additional details to localized error messages.
     * Resulting error message format: “(Localized error's text) - id: (id)” */
    details: StringValueMap;
    /** Unique business transaction id to trace calls across components. Important field for microservices,
     * as it allows us to tie an exception to a specific business transaction.  */
    correlation_id: string;
    /** Stack trace of the exception. */
    stack_trace: string;
    /** Additional information about the cause of the exception. */
    cause: string;
    /**
     * @param category          category that this exception belongs to.
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param code              unique code that can be used to identify the error.
     * @param message           the message that was contained in the original error.
     */
    constructor(category?: string, correlation_id?: string, code?: string, message?: string);
    /**
     * Returns additional information about the cause of the exception.
     */
    getCauseString(): string;
    /**
     * Sets additional information about the cause of the exception.
     */
    setCauseString(value: string): void;
    /**
     * Returns the stack trace of the exception.
     */
    getStackTraceString(): string;
    /**
     * Sets the stack trace of the exception.
     */
    setStackTraceString(value: string): void;
    /**
     * Sets the code of the exception and returns the resulting ApplicationException.
     * Every error needs a unique code by which it can be identified. Using this code,
     * we can select which localized error messages to use and what to display in the UI.
     * */
    withCode(code: string): ApplicationException;
    /**
     * Sets the cause of the exception and returns the resulting ApplicationException.
     * The 'cause' field contains additional information about the cause of the exception.
     */
    withCause(cause: Error): ApplicationException;
    /**
     * Sets the status of the exception and returns the resulting ApplicationException.
     * The 'status' field is used when sending exceptions over the REST interface,
     * so that we know what HTTP status code to raise.
     */
    withStatus(status: number): ApplicationException;
    /**
     * Sets the details of the exception and returns the resulting ApplicationException.
     * Details are used to add additional information to localized error message strings.
     */
    withDetails(key: string, value: any): ApplicationException;
    /**
     * Sets the correlation ID of the exception and returns the resulting ApplicationException.
     * The correlation ID ties an exception to a specific business transaction.
     */
    withCorrelationId(correlation_id: string): ApplicationException;
    /**
     * Sets the stack trace of the exception and returns the resulting ApplicationException.
     */
    withStackTrace(stackTrace: string): ApplicationException;
    /**
     * Wrapping allows us to transform general exceptions into ApplicationExceptions.
     *
     * This method does the following:
     * - attempts to unwrap Seneca and restify exceptions from the parameter 'cause' using the
     * static method [[unwrapError]] (if they are present).
     * - checks whether 'cause' is an ApplicationException (if it is, then no additional wrapping is done).
     * - if the 'cause' parameter contains an unknown exception, then the cause field of this
     * ApplicationException object is set to the original exception (the 'cause' parameter's 'message' field).
     *
     * The third point of this list is used in the following way: when an unknown exception is raised, the
     * exception's type can be determined, a category of ApplicationExceptions that is closest to the exception's
     * type can be chosen from the ones available, after which the unknown exception can be wrapped around the
     * chosen type of ApplicationException. This is done for unifying exceptions, as it is challenging to process
     * a wide variety of unknown exceptions. Wrapping unknown exceptions around existing ones allows us to categorize
     * them and be "in the ballpark".
     *
     * @param cause     the exception that is to be wrapped around this ApplicationException object.
     * @returns         the 'cause' parameter as an ApplicationException (if it is one) or this ApplicationException
     *                  object with 'this.cause' set to the 'cause' parameter's 'message' field.
     *
     * @see [[unwrapError]]
     */
    wrap(cause: any): ApplicationException;
    /**
     * Static method that is identical to the non-static method [[wrap]]. Wraps 'cause' around
     * the ApplicationException passed as 'error', instead of itself (this).
     *
     * @param error     ApplicationException that has been chosen for wrapping.
     * @param cause     the exception that is to be wrapped around the 'error' parameter.
     * @returns         the 'cause' parameter as an ApplicationException (if it is one) or the parameter
     *                  'error' with its 'cause' field set to the 'cause' parameter's 'message' field.
     *
     * @see [[wrap]]
     */
    static wrapError(error: ApplicationException, cause: any): ApplicationException;
    /**
     * Used to unwrap Seneca exceptions and restify exceptions.
     *
     * @param error     error that may contain Seneca or restify exceptions.
     * @returns         For Seneca exceptions: error.orig. For restify exceptions: error.body.
     */
    static unwrapError(error: any): any;
}
