"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/** @module errors */
/** @hidden */
var _ = require('lodash');
var ErrorCategory_1 = require("./ErrorCategory");
var StringValueMap_1 = require("../data/StringValueMap");
/**
 * This class provides cross-language (portable) and language-independent (localizable) standardization of exceptions.
 *
 * ApplicationException contains a strict structure and methods that help structurize free-form exception messages.
 * While ApplicationExceptions themselves are not serializable, they can be converted to [[ErrorDescription ErrorDescriptions]],
 * which are serializable. Serialization of ErrorDescriptions is necessary for sending exceptions over the REST interface
 * back to "caller" microservices (cross-language error propagation).
 *
 * An ApplicationException contains enough information in its fields to create detailed localized strings for practically
 * any exception. It uniquely defines the type of exception (via the 'code' field) and links exceptions to business
 * transactions (via 'correlation_id').
 *
 * ApplicationException serves as a parent class for all other (Category)Exception classes.
 *
 * Usage:
 * - The classes included in this package (which already extend ApplicationException) can be used "as is".
 * - Developers can use this class to create their own application exceptions (from the ground up).
 * - Exceptions can be wrapped around one another (new exceptions can be wrapped around existing exceptions).
 * - PipService's microservices automatically intercept common exceptions and try to convert them to the closest available
    * type of ApplicationException.
 * - ApplicationExceptions can be converted to [[ErrorDescription ErrorDescriptions]], which can then be sent back to 'caller'
    * microservices, even if they are written in a different language. When the microservice on the other end
    * receives the ErrorDescription, it can use it to restore the ApplicationException and propagate the exception to
    * the place from where the call was made.
 *
 * Defaults:
 * - status = 500
 * - code = 'UNKNOWN'
 * - category = ErrorCategory.Unknown
 * - message = 'Unknown error'
 *
 * @see [[ErrorDescription]]
 */
var ApplicationException = /** @class */ (function (_super) {
    __extends(ApplicationException, _super);
    /**
     * @param category          category that this exception belongs to.
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param code              unique code that can be used to identify the error.
     * @param message           the message that was contained in the original error.
     */
    function ApplicationException(category, correlation_id, code, message) {
        if (category === void 0) { category = null; }
        if (correlation_id === void 0) { correlation_id = null; }
        if (code === void 0) { code = null; }
        if (message === void 0) { message = null; }
        var _this = _super.call(this, message) || this;
        /** Used when sending over the REST interface, so that we know what HTTP status code to raise. */
        _this.status = 500;
        /** Every error needs a unique code by which it can be identified. Using this code,
         *  we can select which localized error messages to use and what to display in the UI.*/
        _this.code = 'UNKNOWN';
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        _this.__proto__ = ApplicationException.prototype;
        _this.category = category || ErrorCategory_1.ErrorCategory.Unknown;
        _this.correlation_id = correlation_id;
        _this.code = code || 'UNKNOWN';
        if (!_this.message)
            _this.message = message || 'Unknown error';
        _this.name = _this.code;
        return _this;
    }
    /**
     * Returns additional information about the cause of the exception.
     */
    ApplicationException.prototype.getCauseString = function () {
        return this.cause != null ? this.cause.toString() : null;
    };
    /**
     * Sets additional information about the cause of the exception.
     */
    ApplicationException.prototype.setCauseString = function (value) {
        this.cause = value;
    };
    /**
     * Returns the stack trace of the exception.
     */
    ApplicationException.prototype.getStackTraceString = function () {
        return this.stack_trace || this.stack;
    };
    /**
     * Sets the stack trace of the exception.
     */
    ApplicationException.prototype.setStackTraceString = function (value) {
        this.stack_trace = value;
    };
    /**
     * Sets the code of the exception and returns the resulting ApplicationException.
     * Every error needs a unique code by which it can be identified. Using this code,
     * we can select which localized error messages to use and what to display in the UI.
     * */
    ApplicationException.prototype.withCode = function (code) {
        this.code = code || 'UNKNOWN';
        this.name = this.code;
        return this;
    };
    /**
     * Sets the cause of the exception and returns the resulting ApplicationException.
     * The 'cause' field contains additional information about the cause of the exception.
     */
    ApplicationException.prototype.withCause = function (cause) {
        if (cause)
            this.cause = cause.message;
        return this;
    };
    /**
     * Sets the status of the exception and returns the resulting ApplicationException.
     * The 'status' field is used when sending exceptions over the REST interface,
     * so that we know what HTTP status code to raise.
     */
    ApplicationException.prototype.withStatus = function (status) {
        this.status = status || 500;
        return this;
    };
    /**
     * Sets the details of the exception and returns the resulting ApplicationException.
     * Details are used to add additional information to localized error message strings.
     */
    ApplicationException.prototype.withDetails = function (key, value) {
        this.details = this.details || new StringValueMap_1.StringValueMap();
        this.details.setAsObject(key, value);
        return this;
    };
    /**
     * Sets the correlation ID of the exception and returns the resulting ApplicationException.
     * The correlation ID ties an exception to a specific business transaction.
     */
    ApplicationException.prototype.withCorrelationId = function (correlation_id) {
        this.correlation_id = correlation_id;
        return this;
    };
    /**
     * Sets the stack trace of the exception and returns the resulting ApplicationException.
     */
    ApplicationException.prototype.withStackTrace = function (stackTrace) {
        this.stack_trace = stackTrace;
        return this;
    };
    /**
     * Wrapping allows us to transform general exceptions into ApplicationExceptions.
     *
     * This method does the following:
     * - attempts to unwrap Seneca and restify exceptions from the parameter 'cause' using the
     * static method [[unwrapError]] (if they are present).
     * - checks whether 'cause' is an ApplicationException (if it is, then no additional wrapping is done).
     * - if the 'cause' parameter contains an unknown exception, then the cause field of this
     * ApplicationException object is set to the original exception (the 'cause' parameter's 'message' field).
     *
     * The third point of this list is used in the following way: when an unknown exception is raised, the
     * exception's type can be determined, a category of ApplicationExceptions that is closest to the exception's
     * type can be chosen from the ones available, after which the unknown exception can be wrapped around the
     * chosen type of ApplicationException. This is done for unifying exceptions, as it is challenging to process
     * a wide variety of unknown exceptions. Wrapping unknown exceptions around existing ones allows us to categorize
     * them and be "in the ballpark".
     *
     * @param cause     the exception that is to be wrapped around this ApplicationException object.
     * @returns         the 'cause' parameter as an ApplicationException (if it is one) or this ApplicationException
     *                  object with 'this.cause' set to the 'cause' parameter's 'message' field.
     *
     * @see [[unwrapError]]
     */
    ApplicationException.prototype.wrap = function (cause) {
        cause = ApplicationException.unwrapError(cause);
        if (cause instanceof ApplicationException)
            return cause;
        this.withCause(cause);
        return this;
    };
    /**
     * Static method that is identical to the non-static method [[wrap]]. Wraps 'cause' around
     * the ApplicationException passed as 'error', instead of itself (this).
     *
     * @param error     ApplicationException that has been chosen for wrapping.
     * @param cause     the exception that is to be wrapped around the 'error' parameter.
     * @returns         the 'cause' parameter as an ApplicationException (if it is one) or the parameter
     *                  'error' with its 'cause' field set to the 'cause' parameter's 'message' field.
     *
     * @see [[wrap]]
     */
    ApplicationException.wrapError = function (error, cause) {
        cause = ApplicationException.unwrapError(cause);
        if (cause instanceof ApplicationException)
            return cause;
        error.withCause(cause);
        return error;
    };
    /**
     * Used to unwrap Seneca exceptions and restify exceptions.
     *
     * @param error     error that may contain Seneca or restify exceptions.
     * @returns         For Seneca exceptions: error.orig. For restify exceptions: error.body.
     */
    ApplicationException.unwrapError = function (error) {
        if (error == null)
            return null;
        // Unwrapping Seneca exceptions
        if (error.code == 'act_execute' && error.orig) {
            error = error.orig;
            if (error.orig)
                error = error.orig;
        }
        // Unwrapping restify exceptions 
        if (error.body && !_.isEmpty(error.body))
            error = error.body;
        return error;
    };
    return ApplicationException;
}(Error));
exports.ApplicationException = ApplicationException;
//# sourceMappingURL=ApplicationException.js.map