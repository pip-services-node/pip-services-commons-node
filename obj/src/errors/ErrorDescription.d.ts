/** @module errors */
/**
 * This class allows us to represent [[ApplicationException ApplicationExceptions]] in a serializable form.
 *
 * When an exception is raised, the [[ApplicationException]] class (or its child)
 * can be used to structurize the exception. Afterwards, the ApplicationException can be
 * transformed it into an ErrorDescription using the [[ErrorDescriptionFactory]], serialized
 * in one language, transferred to the receiving side, and deserialized in another language.
 *
 * After deserialization, one of the following is done:
 *
 * - if the exception was initally a child of ApplicationException, the exception's class can be
 * restored using the [[ApplicationExceptionFactory]].
 *
 * - if a specific exception was raised and transferred between microservices that are written
 * in different languages, then the exception type that is closest to the original exception's
 * type can be chosen from the exceptions available in the target language.
 * This provides cross-language error propagation via serialization.
 *
 * @see [[ApplicationException]]
 * @see [[ApplicationExceptionFactory]]
 */
export declare class ErrorDescription {
    /** Defines the error's type. */
    type: string;
    /** Defines what category of errors this error belongs to. */
    category: string;
    /** Used when sending over the REST interface, so that we know what HTTP status code to raise. */
    status: number;
    /** Every error needs a unique code by which it can be identified. Using this code,
     *  we can select which localized error messages to use and what to display in the UI.*/
    code: string;
    /**This field stores the message or description that was contained in the original error.
     * Errors' messages are always in English. However, using this class's 'code' and 'details'
     * fields, we can create localized versions of the error's message and use them instead in the UI. */
    message: string;
    /**This field is used to add additional information to localized error message strings.
     *
     * For example, if we received an ObjectNotFoundException (general error) when searching for an
     * object via its id, the id by which the object was not found can be added as a detail. This allows
     * us to add additional details to localized error messages.
     * Resulting error message format: “(Localized error's text) - id: (id)” */
    details: any;
    /** Unique business transaction id to trace calls across components. Important field for microservices,
     * as it allows us to tie an exception to a specific business transaction. */
    correlation_id: string;
    /** Additional information about the cause of the exception. */
    cause: string;
    /** Stack trace of the exception. */
    stack_trace: string;
}
