"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResultType_1 = require("./ValidationResultType");
var BadRequestException_1 = require("../errors/BadRequestException");
/**
 * Caused by errors in validation. If using strict mode, warnings will also raise validation exceptions.
 */
var ValidationException = /** @class */ (function (_super) {
    __extends(ValidationException, _super);
    /**
     * Creates a new ValidationException and initializes it using the given parameters.
     * If no message is given, [[composeMessage]] will be used to generate a message using the
     * given 'results'. Otherwise, the 'results' will be included as details.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param message           (optional) the message to include in this exception.
     * @param results           (optional) the validation results to include as details in this exception.
     *
     * @see [[composeMessage]]
     * @see [[ValidationResult]]
     * @see [[ApplicationException]]
     */
    function ValidationException(correlationId, message, results) {
        var _this = _super.call(this, correlationId, "INVALID_DATA", message || ValidationException.composeMessage(results)) || this;
        if (results)
            _this.withDetails("results", results);
        return _this;
    }
    /**
     * Static method that generates a message string for the given [[ValidationResult validation results]].
     *
     * @param results   the validation results to convert into a message string.
     * @returns the generated message string. For example: "Validation failed: <ErrorResult1>, <ErrorResult2>"
     */
    ValidationException.composeMessage = function (results) {
        var builder = "Validation failed";
        if (results && results.length > 0) {
            var first = true;
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                if (result.getType() == ValidationResultType_1.ValidationResultType.Information)
                    continue;
                builder += first ? ": " : ", ";
                builder += result.getMessage();
                first = false;
            }
        }
        return builder;
    };
    /**
     * Static method that returns a [[ValidationException]] when any [[ValidationResultType.Error Errors]]
     * are present in the given [[ValidationResult validation results]]. If strict is set to <code>true</code>,
     * then [[ValidationResultType.Warning Warnings]] will also cause a ValidationException to be returned.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param results           the results of a validation.
     * @param strict            defines whether or not an exception should be returned if a Warning
     *                          is found in the results.
     *
     * @see [[ValidationResult]]
     * @see [[ValidationException]]
     * @see [[ValidationResultType]]
     */
    ValidationException.fromResults = function (correlationId, results, strict) {
        var hasErrors = false;
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            if (result.getType() == ValidationResultType_1.ValidationResultType.Error)
                hasErrors = true;
            if (strict && result.getType() == ValidationResultType_1.ValidationResultType.Warning)
                hasErrors = true;
        }
        return hasErrors ? new ValidationException(correlationId, null, results) : null;
    };
    /**
     * Static method that throws a [[ValidationException]] when any [[ValidationResultType.Error Errors]]
     * are present in the [[ValidationResult validation results]]. If strict is set to <code>true</code>,
     * then [[ValidationResultType.Warning Warnings]] will also cause a ValidationException to be thrown.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param results           the results of a validation.
     * @param strict            defines whether or not an exception should be returned if a Warning
     *                          is found in the results.
     *
     * @see [[ValidationResult]]
     * @see [[ValidationException]]
     * @see [[ValidationResultType]]
     */
    ValidationException.throwExceptionIfNeeded = function (correlationId, results, strict) {
        var ex = ValidationException.fromResults(correlationId, results, strict);
        if (ex)
            throw ex;
    };
    ValidationException.SerialVersionUid = -1459801864235223845;
    return ValidationException;
}(BadRequestException_1.BadRequestException));
exports.ValidationException = ValidationException;
//# sourceMappingURL=ValidationException.js.map