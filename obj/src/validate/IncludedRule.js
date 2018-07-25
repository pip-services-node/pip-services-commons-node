"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationResult_1 = require("./ValidationResult");
const ValidationResultType_1 = require("./ValidationResultType");
class IncludedRule {
    constructor(...values) {
        this._values = values;
    }
    validate(path, schema, value, results) {
        if (!this._values)
            return;
        let name = path || "value";
        let found = false;
        for (var i = 0; i < this._values.length && !found; i++) {
            let thisValue = this._values[i];
            if (thisValue && thisValue == value) {
                found = true;
            }
        }
        if (!found) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_NOT_INCLUDED", name + " must be one of " + this._values, this._values, null));
        }
    }
}
exports.IncludedRule = IncludedRule;
//# sourceMappingURL=IncludedRule.js.map