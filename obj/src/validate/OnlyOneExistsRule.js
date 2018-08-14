"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ObjectReader_1 = require("../reflect/ObjectReader");
/**
 * Validation rule that requires only one of the properties that are set to be present for validation
 * to pass.
 */
var OnlyOneExistsRule = /** @class */ (function () {
    /**
     * Creates a new OnlyOneExistsRule object and initializes it using the properties passed.
     *
     * @param properties    the properties to initialize the new OnlyOneExistsRule object with.
     */
    function OnlyOneExistsRule() {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        this._properties = properties;
    }
    /**
     * Validates the passed value. Only one of the properties set in this OnlyOneExistsRule
     * object must exist in the given value for validation to pass.
     *
     * @param path      the dot notation path to the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    OnlyOneExistsRule.prototype.validate = function (path, schema, value, results) {
        var name = path || "value";
        var found = [];
        for (var i = 0; i < this._properties.length; i++) {
            var property = this._properties[i];
            var propertyValue = ObjectReader_1.ObjectReader.getProperty(value, property);
            if (propertyValue)
                found.push(property);
        }
        if (found.length == 0) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_NULL", name + " must have at least one property from " + this._properties, this._properties, null));
        }
        else if (found.length > 1) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_ONLY_ONE", name + " must have only one property from " + this._properties, this._properties, null));
        }
    };
    return OnlyOneExistsRule;
}());
exports.OnlyOneExistsRule = OnlyOneExistsRule;
//# sourceMappingURL=OnlyOneExistsRule.js.map