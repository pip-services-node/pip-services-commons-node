import { ApplicationException } from './ApplicationException';
/**
 * Errors raised by conflicts between object versions that were
 * posted by the user and those that are stored on the server.
 */
export declare class ConflictException extends ApplicationException {
    /**
     * Call ApplicationException's constructor with the category parameter set to
     * ErrorCategory.Conflict and set the status to 409.
     *
     * @see ApplicationException#ApplicationException
     * @see ErrorCategory
     */
    constructor(correlation_id?: string, code?: string, message?: string);
}
