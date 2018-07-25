"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationResult_1 = require("./ValidationResult");
const ObjectComparator_1 = require("./ObjectComparator");
const ValidationResultType_1 = require("./ValidationResultType");
class ValueComparisonRule {
    constructor(operation, value) {
        this._operation = operation;
        this._value = value;
    }
    validate(path, schema, value, results) {
        let name = path || "value";
        if (!ObjectComparator_1.ObjectComparator.compare(value, this._operation, this._value)) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "BAD_VALUE", name + " must " + this._operation + " " + this._value + " but found " + value, this._operation + " " + this._value, value));
        }
    }
}
exports.ValueComparisonRule = ValueComparisonRule;
//# sourceMappingURL=ValueComparisonRule.js.map