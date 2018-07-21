import { ApplicationException } from './ApplicationException';
/**
 * Errors that occur during connections to remote services.
 * They can be related to misconfiguration, network issues, or the remote service itself.
 */
export declare class ConnectionException extends ApplicationException {
    /**
     * Call ApplicationException's constructor with the category parameter set to
     * ErrorCategory.NoResponse and set the status to 500.
     *
     * @see ApplicationException#ApplicationException
     * @see ErrorCategory
     */
    constructor(correlation_id?: string, code?: string, message?: string);
}
