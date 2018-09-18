"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ObjectComparator_1 = require("./ObjectComparator");
var ValidationResultType_1 = require("./ValidationResultType");
/**
 * Validation rule that compares value to a constant.
 *
 * @see [[IValidationRule]]
 *
 * ### Example ###
 *
 * let schema = new Schema()
 *      .withRule(new ValueComparisonRule("EQ", 1));
 *
 * schema.validate(1);          // Result: no errors
 * schema.validate(2);          // Result: 2 is not equal to 1
 */
var ValueComparisonRule = /** @class */ (function () {
    /**
     * Creates a new validation rule and sets its values.
     *
     * @param operation    a comparison operation: "==" ("=", "EQ"), "!= " ("<>", "NE"); "<"/">" ("LT"/"GT"), "<="/">=" ("LE"/"GE"); "LIKE".
     * @param value        a constant value to compare to
     */
    function ValueComparisonRule(operation, value) {
        this._operation = operation;
        this._value = value;
    }
    /**
     * Validates a given value against this rule.
     *
     * @param path      a dot notation path to the value.
     * @param schema    a schema this rule is called from
     * @param value     a value to be validated.
     * @param results   a list with validation results to add new results.
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