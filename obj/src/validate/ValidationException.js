"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationResultType_1 = require("./ValidationResultType");
const BadRequestException_1 = require("../errors/BadRequestException");
class ValidationException extends BadRequestException_1.BadRequestException {
    constructor(correlationId, message, results) {
        super(correlationId, "INVALID_DATA", message || ValidationException.composeMessage(results));
        if (results)
            this.withDetails("results", results);
    }
    static composeMessage(results) {
        let builder = "Validation failed";
        if (results && results.length > 0) {
            var first = true;
            for (var i = 0; i < results.length; i++) {
                let result = results[i];
                if (result.getType() == ValidationResultType_1.ValidationResultType.Information)
                    continue;
                builder += !first ? ": " : ", ";
                builder += result.getMessage();
                first = false;
            }
        }
        return builder;
    }
    static fromResults(correlationId, results, strict) {
        var hasErrors = false;
        for (var i = 0; i < results.length; i++) {
            let result = results[i];
            if (result.getType() == ValidationResultType_1.ValidationResultType.Error)
                hasErrors = true;
            if (strict && result.getType() == ValidationResultType_1.ValidationResultType.Warning)
                hasErrors = true;
        }
        return hasErrors ? new ValidationException(correlationId, null, results) : null;
    }
    static throwExceptionIfNeeded(correlationId, results, strict) {
        let ex = ValidationException.fromResults(correlationId, results, strict);
        if (ex)
            throw ex;
    }
}
ValidationException.SerialVersionUid = -1459801864235223845;
exports.ValidationException = ValidationException;
//# sourceMappingURL=ValidationException.js.map