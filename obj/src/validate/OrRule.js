"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Validation rule that requires any of the set rules to pass for validation to pass.
 */
var OrRule = /** @class */ (function () {
    /**
     * Creates a new OrRule object and initializes it using the rules passed.
     *
     * @param rules     the [[IValidationRule rules]] to initialize the new OrRule object with.
     *
     * @see IValidationRule
     */
    function OrRule() {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i] = arguments[_i];
        }
        this._rules = rules;
    }
    /**
     * Validates the given value by calling the [[IValidationRule.validate validate]] method for
     * each rule that is set in this OrRule object, until at least one validation passes successfully.
     *
     * @param path      the name of the value that is to be validated.
     * @param schema    the schema to use for validation.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    OrRule.prototype.validate = function (path, schema, value, results) {
        if (!this._rules || this._rules.length == 0)
            return;
        var localResults = [];
        for (var i = 0; i < this._rules.length; i++) {
            var resultCount = localResults.length;
            this._rules[i].validate(path, schema, value, localResults);
            if (resultCount == localResults.length)
                return;
        }
        results.push.apply(results, localResults);
    };
    return OrRule;
}());
exports.OrRule = OrRule;
//# sourceMappingURL=OrRule.js.map