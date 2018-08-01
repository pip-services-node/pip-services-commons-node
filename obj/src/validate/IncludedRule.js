"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
/**
 * Validation rule that requires at least one of the set values to be present for validation to pass.
 */
var IncludedRule = /** @class */ (function () {
    /**
     * Creates a new IncludedRule object and initializes it using the values passed.
     *
     * @param values    the values to initialize the new IncludedRule object with.
     */
    function IncludedRule() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this._values = values;
    }
    /**
     * Validates the given value, which must be found amongst the values set in this IncludedRule object
     * for validation to pass.
     *
     * @param path      the name of the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    IncludedRule.prototype.validate = function (path, schema, value, results) {
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
        if (!found) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_NOT_INCLUDED", name + " must be one of " + this._values, this._values, null));
        }
    };
    return IncludedRule;
}());
exports.IncludedRule = IncludedRule;
//# sourceMappingURL=IncludedRule.js.map