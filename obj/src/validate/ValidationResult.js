"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationResult {
    constructor(path = null, type = null, code = null, message = null, expected = null, actual = null) {
        this._path = path;
        this._type = type;
        this._code = code;
        this._message = message;
        this._expected = expected;
        this._actual = actual;
    }
    getPath() {
        return this._path;
    }
    getType() {
        return this._type;
    }
    getCode() {
        return this._code;
    }
    getMessage() {
        return this._message;
    }
    getExpected() {
        return this._expected;
    }
    getActual() {
        return this._actual;
    }
}
exports.ValidationResult = ValidationResult;
//# sourceMappingURL=ValidationResult.js.map