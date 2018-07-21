import { ApplicationException } from './ApplicationException';
/**
 * Access errors caused by missing user identity (authentication error) or incorrect security permissions (authorization error).
 */
export declare class UnauthorizedException extends ApplicationException {
    /**
     * Call ApplicationException's constructor with the category parameter set to
     * ErrorCategory.Unauthorized and set the status to 401.
     *
     * @see ApplicationException#ApplicationException
     * @see ErrorCategory
     */
    constructor(correlation_id?: string, code?: string, message?: string);
}
