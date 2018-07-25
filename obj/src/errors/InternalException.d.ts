import { ApplicationException } from './ApplicationException';
/**
 * Errors caused by programming mistakes.
 */
export declare class InternalException extends ApplicationException {
    /**
     * Call ApplicationException's constructor with the category parameter set to
     * ErrorCategory.Internal and set the status to 500.
     *
     * @see [[ApplicationException.ApplicationException]]
     * @see [[ErrorCategory]]
     */
    constructor(correlation_id?: string, code?: string, message?: string);
}
