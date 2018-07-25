import { ApplicationException } from './ApplicationException';
/**
 * Errors related to mistakes in the microservice's user-defined configurations.
 */
export declare class ConfigException extends ApplicationException {
    /**
     * Call ApplicationException's constructor with the category parameter set to
     * ErrorCategory.Misconfiguration and set the status to 500.
     *
     * @see [[ApplicationException.constructor]]
     * @see [[ErrorCategory]]
     */
    constructor(correlation_id?: string, code?: string, message?: string);
}
