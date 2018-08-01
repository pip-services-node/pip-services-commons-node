"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
/**
 * Validation rule that requires the set rule to fail for validation to pass.
 */
var NotRule = /** @class */ (function () {
    /**
     * Creates a new NotRule object and initializes it using the rule passed.
     *
     * @param rule     the "not" rule to initialize the new NotRule object with.
     */
    function NotRule(rule) {
        this._rule = rule;
    }
    /**
     * Validates the given value by calling the [[IValidationRule.validate validate]] method of
     * the "not" rule that is set in this NotRule object. Validation fails if validation of the
     * "not" rule passes.
     *
     * @param path      the name of the value that is to be validated.
     * @param schema    the schema to use for validation.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    NotRule.prototype.validate = function (path, schema, value, results) {
        if (!this._rule)
            return;
        var name = path || "value";
        var localResults = [];
        this._rule.validate(path, schema, value, localResults);
        if (localResults.length > 0)
            return;
        results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "NOT_FAILED", "Negative check for " + name + " failed", null, null));
    };
    return NotRule;
}());
exports.NotRule = NotRule;
//# sourceMappingURL=NotRule.js.map