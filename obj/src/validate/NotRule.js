"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationResult_1 = require("./ValidationResult");
const ValidationResultType_1 = require("./ValidationResultType");
class NotRule {
    constructor(rule) {
        this._rule = rule;
    }
    validate(path, schema, value, results) {
        if (!this._rule)
            return;
        let name = path || "value";
        let localResults = [];
        this._rule.validate(path, schema, value, localResults);
        if (localResults.length > 0)
            return;
        results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "NOT_FAILED", "Negative check for " + name + " failed", null, null));
    }
}
exports.NotRule = NotRule;
//# sourceMappingURL=NotRule.js.map