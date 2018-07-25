import { ApplicationException } from './ApplicationException';
/**
 * Errors due to improper user requests.
 *
 * For example: missing or incorrect parameters.
 */
export declare class BadRequestException extends ApplicationException {
    /**
     * Call ApplicationException's constructor with the category parameter set to
     * ErrorCategory.BadRequest and set the status to 400.
     *
     * @see [[ApplicationException.ApplicationException]]
     * @see [[ErrorCategory]]
     */
    constructor(correlation_id?: string, code?: string, message?: string);
}
