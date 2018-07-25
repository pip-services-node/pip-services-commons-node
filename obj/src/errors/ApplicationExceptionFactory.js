"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module errors */
const ErrorCategory_1 = require("./ErrorCategory");
const UnknownException_1 = require("./UnknownException");
const InternalException_1 = require("./InternalException");
const ConfigException_1 = require("./ConfigException");
const ConnectionException_1 = require("./ConnectionException");
const InvocationException_1 = require("./InvocationException");
const FileException_1 = require("./FileException");
const BadRequestException_1 = require("./BadRequestException");
const UnauthorizedException_1 = require("./UnauthorizedException");
const ConflictException_1 = require("./ConflictException");
const NotFoundException_1 = require("./NotFoundException");
const UnsupportedException_1 = require("./UnsupportedException");
const InvalidStateException_1 = require("./InvalidStateException");
/**
 * Contains the static method 'create', which converts ErrorDescriptions back into ApplicationExceptions.
 *
 * @see [[ErrorDescription]]
 * @see [[ApplicationException]]
 */
class ApplicationExceptionFactory {
    /**
     * @param description  	An ErrorDescription, which contains the error's category (defines what type of ApplicationException to create);
     * 						correlationId, code, and message (all 3 are used in the ApplicationException's constructor); details, cause,
     * 						and stack_trace (to fill the corresponding fields of the ApplicationException object).
     * @returns       		A class child class of ApplicationException, which corresponding to the ErrorDescription that was passed.
     */
    static create(description) {
        if (description == null)
            throw new Error("Description cannot be null");
        let error = null;
        let category = description.category;
        let code = description.code;
        let message = description.message;
        let correlationId = description.correlation_id;
        // Create well-known exception type based on error category
        if (ErrorCategory_1.ErrorCategory.Unknown == category)
            error = new UnknownException_1.UnknownException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.Internal == category)
            error = new InternalException_1.InternalException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.Misconfiguration == category)
            error = new ConfigException_1.ConfigException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.NoResponse == category)
            error = new ConnectionException_1.ConnectionException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.FailedInvocation == category)
            error = new InvocationException_1.InvocationException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.FileError == category)
            error = new FileException_1.FileException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.BadRequest == category)
            error = new BadRequestException_1.BadRequestException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.Unauthorized == category)
            error = new UnauthorizedException_1.UnauthorizedException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.Conflict == category)
            error = new ConflictException_1.ConflictException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.NotFound == category)
            error = new NotFoundException_1.NotFoundException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.InvalidState == category)
            error = new InvalidStateException_1.InvalidStateException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.Unsupported == category)
            error = new UnsupportedException_1.UnsupportedException(correlationId, code, message);
        else {
            error = new UnknownException_1.UnknownException();
            error.category = category;
            error.status = description.status;
        }
        // Fill error with details
        error.details = description.details;
        error.setCauseString(description.cause);
        error.setStackTraceString(description.stack_trace);
        return error;
    }
}
exports.ApplicationExceptionFactory = ApplicationExceptionFactory;
//# sourceMappingURL=ApplicationExceptionFactory.js.map