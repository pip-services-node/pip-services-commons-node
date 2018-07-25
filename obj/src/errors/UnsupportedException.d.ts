import { ApplicationException } from './ApplicationException';
/**
 * Errors caused by calls to unsupported or not yet implemented functionality.
 */
export declare class UnsupportedException extends ApplicationException {
    /**
     * Call ApplicationException's constructor with the category parameter set to
     * ErrorCategory.Unsupported and set the status to 500.
     *
     * @see [[ApplicationException.ApplicationException]]
     * @see [[ErrorCategory]]
     */
    constructor(correlation_id?: string, code?: string, message?: string);
}
