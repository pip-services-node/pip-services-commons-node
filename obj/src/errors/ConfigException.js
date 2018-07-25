"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module errors */
const ErrorCategory_1 = require("./ErrorCategory");
const ApplicationException_1 = require("./ApplicationException");
/**
 * Errors related to mistakes in the microservice's user-defined configurations.
 */
class ConfigException extends ApplicationException_1.ApplicationException {
    /**
     * Call ApplicationException's constructor with the category parameter set to
     * ErrorCategory.Misconfiguration and set the status to 500.
     *
     * @see [[ApplicationException.constructor]]
     * @see [[ErrorCategory]]
     */
    constructor(correlation_id = null, code = null, message = null) {
        super(ErrorCategory_1.ErrorCategory.Misconfiguration, correlation_id, code, message);
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        this.__proto__ = ConfigException.prototype;
        this.status = 500;
    }
}
exports.ConfigException = ConfigException;
//# sourceMappingURL=ConfigException.js.map