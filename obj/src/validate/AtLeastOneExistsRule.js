"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ObjectReader_1 = require("../reflect/ObjectReader");
/**
 * Validation rule that requires at least one of the properties that are set to be present for validation
 * to pass.
 */
var AtLeastOneExistsRule = /** @class */ (function () {
    /**
     * Creates a new AtLeastOneExistRule object and initializes it using the properties passed.
     *
     * @param properties    the properties to initialize the new AtLeastOneExistRule object with.
     */
    function AtLeastOneExistsRule() {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        this._properties = properties;
    }
    /**
     * Validates the passed value. At least one of the properties set in this AtLeastOneExistRule
     * object must exist in the given value for validation to pass.
     *
     * @param path      the name of the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    AtLeastOneExistsRule.prototype.validate = function (path, schema, value, results) {
        var name = path || "value";
        var found = [];
        for (var i = 0; i < this._properties.length; i++) {
            var propertyValue = ObjectReader_1.ObjectReader.getProperty(value, this._properties[i]);
            if (propertyValue != null)
                found.push(this._properties[i]);
        }
        if (found.length === 0) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_NULL", name + " must have at least one property from " + this._properties, this._properties, null));
        }
    };
    return AtLeastOneExistsRule;
}());
exports.AtLeastOneExistsRule = AtLeastOneExistsRule;
//# sourceMappingURL=AtLeastOneExistsRule.js.map