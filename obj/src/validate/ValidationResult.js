"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Stores the result of a given validation.
 */
var ValidationResult = /** @class */ (function () {
    /**
     * Creates a new ValidationResult object and stores in it information about the
     * validation's result.
     *
     * @param path      the name of the result.
     * @param type      the result's [[ValidationResultType type]]. For example: Information, Warning, or Error.
     * @param code      the result's code.
     * @param message   additional information about the result.
     * @param expected  the expected result.
     * @param actual    the actual result.
     *
     * @see [[ValidationResultType]]
     */
    function ValidationResult(path, type, code, message, expected, actual) {
        if (path === void 0) { path = null; }
        if (type === void 0) { type = null; }
        if (code === void 0) { code = null; }
        if (message === void 0) { message = null; }
        if (expected === void 0) { expected = null; }
        if (actual === void 0) { actual = null; }
        this._path = path;
        this._type = type;
        this._code = code;
        this._message = message;
        this._expected = expected;
        this._actual = actual;
    }
    /**
     * @returns the name of the result.
     */
    ValidationResult.prototype.getPath = function () {
        return this._path;
    };
    /**
     * @returns the result's [[ValidationResultType type]]. For example: Information, Warning, or Error.
     *
     * @see [[ValidationResultType]]
     */
    ValidationResult.prototype.getType = function () {
        return this._type;
    };
    /**
     * @returns the result's code.
     */
    ValidationResult.prototype.getCode = function () {
        return this._code;
    };
    /**
     * @returns the result's message (additional information about the result).
     */
    ValidationResult.prototype.getMessage = function () {
        return this._message;
    };
    /**
     * @returns the expected result of the validation.
     */
    ValidationResult.prototype.getExpected = function () {
        return this._expected;
    };
    /**
     * @returns the validation's actual result.
     */
    ValidationResult.prototype.getActual = function () {
        return this._actual;
    };
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;
//# sourceMappingURL=ValidationResult.js.map