"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationResult_1 = require("./ValidationResult");
const ObjectComparator_1 = require("./ObjectComparator");
const ValidationResultType_1 = require("./ValidationResultType");
const ObjectReader_1 = require("../reflect/ObjectReader");
class PropertiesComparisonRule {
    constructor(property1, operation, property2) {
        this._property1 = property1;
        this._property2 = property2;
        this._operation = operation;
    }
    validate(path, schema, value, results) {
        let name = path || "value";
        let value1 = ObjectReader_1.ObjectReader.getProperty(value, this._property1);
        let value2 = ObjectReader_1.ObjectReader.getProperty(value, this._property2);
        if (!ObjectComparator_1.ObjectComparator.compare(value1, this._operation, value2)) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "PROPERTIES_NOT_MATCH", name + " must have " + this._property1 + " " + this._operation + " " + this._property2, value2, value1));
        }
    }
}
exports.PropertiesComparisonRule = PropertiesComparisonRule;
//# sourceMappingURL=PropertiesComparisonRule.js.map