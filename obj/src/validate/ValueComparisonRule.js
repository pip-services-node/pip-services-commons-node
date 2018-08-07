"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ObjectComparator_1 = require("./ObjectComparator");
var ValidationResultType_1 = require("./ValidationResultType");
/**
 * Validation rule that requires values to be in a certain relation to the value that is set in the rule.
 */
var ValueComparisonRule = /** @class */ (function () {
    /**
     * Creates a new ValueComparisonRule object and initializes it using the passed operation and value.
     *
     * @param operation     the operation to use for comparing values. For example: the operation ">="
     *                      validates that "someValue >= value".
     * @param value         the value to validate other values with, using the set operation.
     */
    function ValueComparisonRule(operation, value) {
        this._operation = operation;
        this._value = value;
    }
    /**
     * Validates that the value passed is in a certain relation to the value that is set in this ValueComparisonRule object.
     * For example: if the operation ">=" is set, it will validate that "value >= this.value".
     *
     * Comparison is done using ObjectComparator's [[ObjectComparator.compare compare]] method.
     *
     * @param path      the dot notation path to the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     *
     * @see [[ObjectComparator.compare]]
     */
    ValueComparisonRule.prototype.validate = function (path, schema, value, results) {
        var name = path || "value";
        if (!ObjectComparator_1.ObjectComparator.compare(value, this._operation, this._value)) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "BAD_VALUE", name + " must " + this._operation + " " + this._value + " but found " + value, this._operation + " " + this._value, value));
        }
    };
    return ValueComparisonRule;
}());
exports.ValueComparisonRule = ValueComparisonRule;
//# sourceMappingURL=ValueComparisonRule.js.map