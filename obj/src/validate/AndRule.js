"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Validation rule that requires all set rules to pass for validation to pass.
 */
var AndRule = /** @class */ (function () {
    /**
     * Creates a new AndRule object and initializes it using the rules passed.
     *
     * @param rules     the [[IValidationRule rules]] to initialize the new AndRule object with.
     *
     * @see [[IValidationRule]]
     */
    function AndRule() {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i] = arguments[_i];
        }
        this._rules = rules;
    }
    /**
     * Validates the given value by calling the [[IValidationRule.validate validate]] method for
     * each rule that is set in this AndRule object.
     *
     * @param path      the dot notation path to the value that is to be validated.
     * @param schema    the schema to use for validation.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    AndRule.prototype.validate = function (path, schema, value, results) {
        if (!this._rules)
            return;
        for (var i = 0; i < this._rules.length; i++) {
            var rule = this._rules[i];
            rule.validate(path, schema, value, results);
        }
    };
    return AndRule;
}());
exports.AndRule = AndRule;
//# sourceMappingURL=AndRule.js.map