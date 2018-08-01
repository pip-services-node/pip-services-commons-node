"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module validate */
/**
 * Used to categorize validation results and indicate the result's type.
 *
 * @see [[ValidationResult]]
 */
var ValidationResultType;
(function (ValidationResultType) {
    /** Validation passed and the validation result contains additional information. */
    ValidationResultType[ValidationResultType["Information"] = 0] = "Information";
    /** Validation gave a warning and, if strict mode is being used, a [[ValidationException]] should be raised. */
    ValidationResultType[ValidationResultType["Warning"] = 1] = "Warning";
    /** Validation failed with an error and a [[ValidationException]] should be raised. */
    ValidationResultType[ValidationResultType["Error"] = 2] = "Error";
})(ValidationResultType = exports.ValidationResultType || (exports.ValidationResultType = {}));
//# sourceMappingURL=ValidationResultType.js.map