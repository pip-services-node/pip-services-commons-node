"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
/**
 * Validation rule that requires the values that are set to be absent for validation to pass.
 */
var ExcludedRule = /** @class */ (function () {
    /**
     * Creates a new ExcludedRule object and initializes it using the values passed.
     *
     * @param values    the values to initialize the new ExcludedRule object with.
     */
    function ExcludedRule() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this._values = values;
    }
    /**
     * Validates the given value. None of the values set in this ExcludedRule object must exist
     * in the value that is given for validation to pass.
     *
     * @param path      the name of the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    ExcludedRule.prototype.validate = function (path, schema, value, results) {
        if (!this._values)
            return;
        var name = path || "value";
        var found = false;
        for (var i = 0; i < this._values.length && !found; i++) {
            var thisValue = this._values[i];
            if (thisValue && thisValue == value) {
                found = true;
            }
        }
        if (found) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_INCLUDED", name + " must not be one of " + this._values, this._values, null));
        }
    };
    return ExcludedRule;
}());
exports.ExcludedRule = ExcludedRule;
//# sourceMappingURL=ExcludedRule.js.map