"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationResult_1 = require("./ValidationResult");
const ValidationResultType_1 = require("./ValidationResultType");
const ObjectReader_1 = require("../reflect/ObjectReader");
class OnlyOneExistRule {
    constructor(...properties) {
        this._properties = properties;
    }
    validate(path, schema, value, results) {
        let name = path || "value";
        let found = [];
        for (var i = 0; i < this._properties.length; i++) {
            let property = this._properties[i];
            var propertyValue = ObjectReader_1.ObjectReader.getProperty(value, property);
            if (propertyValue)
                found.push(property);
        }
        if (found.length == 0) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_NULL", name + " must have at least one property from " + this._properties, this._properties, null));
        }
        else if (found.length > 1) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_ONLY_ONE", name + "must have only one property from " + this._properties, this._properties, null));
        }
    }
}
exports.OnlyOneExistRule = OnlyOneExistRule;
//# sourceMappingURL=OnlyOneExistRule.js.map