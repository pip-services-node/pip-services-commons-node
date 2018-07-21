import { ApplicationException } from './ApplicationException';
/**
 * Errors caused by attempts to access missing objects.
 */
export declare class NotFoundException extends ApplicationException {
    /**
     * Call ApplicationException's constructor with the category parameter set to
     * ErrorCategory.NotFound and set the status to 404.
     *
     * @see ApplicationException#ApplicationException
     * @see ErrorCategory
     */
    constructor(correlation_id?: string, code?: string, message?: string);
}
