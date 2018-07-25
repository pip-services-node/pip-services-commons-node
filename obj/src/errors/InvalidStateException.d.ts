import { ApplicationException } from './ApplicationException';
/**
 * Errors related to calling operations, which require the component to be in a specific state.
 *
 * For instance: business calls when the component is not ready.
 */
export declare class InvalidStateException extends ApplicationException {
    /**
     * Call ApplicationException's constructor with the category parameter set to
     * ErrorCategory.InvalidState and set the status to 500.
     *
     * @see [[ApplicationException.constructor]]
     * @see [[ErrorCategory]]
     */
    constructor(correlation_id?: string, code?: string, message?: string);
}
