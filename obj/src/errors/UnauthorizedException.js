"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module errors */
const ErrorCategory_1 = require("./ErrorCategory");
const ApplicationException_1 = require("./ApplicationException");
/**
 * Access errors caused by missing user identity (authentication error) or incorrect security permissions (authorization error).
 */
class UnauthorizedException extends ApplicationException_1.ApplicationException {
    /**
     * Call ApplicationException's constructor with the category parameter set to
     * ErrorCategory.Unauthorized and set the status to 401.
     *
     * @see [[ApplicationException.constructor]]
     * @see [[ErrorCategory]]
     */
    constructor(correlation_id = null, code = null, message = null) {
        super(ErrorCategory_1.ErrorCategory.Unauthorized, correlation_id, code, message);
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        this.__proto__ = UnauthorizedException.prototype;
        this.status = 401;
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=UnauthorizedException.js.map