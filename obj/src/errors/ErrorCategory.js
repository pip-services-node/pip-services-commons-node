"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines broad categories of application errors.
 */
var ErrorCategory = /** @class */ (function () {
    function ErrorCategory() {
    }
    /**
     * Unknown or unexpected errors.
     */
    ErrorCategory.Unknown = "Unknown";
    /**
     * Internal errors caused by programming mistakes.
     */
    ErrorCategory.Internal = "Internal";
    /**
     * Errors related to mistakes in user-defined configurations.
     */
    ErrorCategory.Misconfiguration = "Misconfiguration";
    /**
     * Errors related to calling operations, which require the component
     * to be in a specific state.
     *
     * For example: business calls when the component is not ready.
     */
    ErrorCategory.InvalidState = "InvalidState";
    /**
     * Errors that occur during connections to remote services.
     * They can be related to misconfiguration, network issues,
     * or the remote service itself.
     */
    ErrorCategory.NoResponse = "NoResponse";
    /**
     * Errors returned by remote services or by the network
     * during call attempts.
     */
    ErrorCategory.FailedInvocation = "FailedInvocation";
    /**
     * Errors in read/write file operations.
     */
    ErrorCategory.FileError = "FileError";
    /**
     * Errors due to improper user requests.
     *
     * For example: missing or incorrect parameters.
     */
    ErrorCategory.BadRequest = "BadRequest";
    /**
     * Access errors caused by missing user identity (authentication error)
     * or incorrect security permissions (authorization error).
     */
    ErrorCategory.Unauthorized = "Unauthorized";
    /**
     * Errors caused by attempts to access missing objects.
     */
    ErrorCategory.NotFound = "NotFound";
    /**
     * Errors raised by conflicts between object versions that were
     * posted by the user and those that are stored on the server.
     */
    ErrorCategory.Conflict = "Conflict";
    /**
     * Errors caused by calls to unsupported
     * or not yet implemented functionality.
     */
    ErrorCategory.Unsupported = "Unsupported";
    return ErrorCategory;
}());
exports.ErrorCategory = ErrorCategory;
//# sourceMappingURL=ErrorCategory.js.map