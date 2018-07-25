import { ApplicationException } from './ApplicationException';
/**
 * Errors returned by remote services or by the network during call attempts.
 */
export declare class InvocationException extends ApplicationException {
    /**
     * Call ApplicationException's constructor with the category parameter set to
     * ErrorCategory.FailedInvocation and set the status to 500.
     *
     * @see [[ApplicationException.ApplicationException]]
     * @see [[ErrorCategory]]
     */
    constructor(correlation_id?: string, code?: string, message?: string);
}
