"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCategory_1 = require("./ErrorCategory");
var ErrorDescription_1 = require("./ErrorDescription");
var ApplicationException_1 = require("./ApplicationException");
/**
 * Contains the static method 'create', which converts ApplicationExceptions and specific (unknown) errors into ErrorDescriptions.
 *
 * @see ErrorDescription
 * @see ApplicationException
 */
var ErrorDescriptionFactory = /** @class */ (function () {
    function ErrorDescriptionFactory() {
    }
    /**
     * @param error  	a child classs of ApplicationException (in which case it is simply converted into an ErrorDescription),
     *                  or a specific (unknown) error, which contain error.name (set to ErrorDescription's type), error.message (error.toString(),
     *                  if not available), and error.stack. In the second case, the ErrorDescription's
     *                  status will be 500, and its code (and category) will be 'UNKNOWN' (ErrorCategory.Unknown).
     * @returns       	An ErrorDescription, containing all available information about the error.
     */
    ErrorDescriptionFactory.create = function (error) {
        var description = new ErrorDescription_1.ErrorDescription();
        if (error instanceof ApplicationException_1.ApplicationException) {
            var ex = error;
            description.category = ex.category;
            description.status = ex.status;
            description.code = ex.code;
            description.message = ex.message;
            description.details = ex.details;
            description.correlation_id = ex.correlation_id;
            description.cause = ex.getCauseString();
            description.stack_trace = ex.getStackTraceString();
        }
        else {
            error = error || {};
            description.type = error.name;
            description.category = ErrorCategory_1.ErrorCategory.Unknown;
            description.status = 500;
            description.code = "UNKNOWN";
            description.message = error.message || error.toString();
            description.stack_trace = error.stack;
        }
        return description;
    };
    return ErrorDescriptionFactory;
}());
exports.ErrorDescriptionFactory = ErrorDescriptionFactory;
//# sourceMappingURL=ErrorDescriptionFactory.js.map