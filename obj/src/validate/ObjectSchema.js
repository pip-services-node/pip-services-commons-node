"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationResult_1 = require("./ValidationResult");
const ValidationResultType_1 = require("./ValidationResultType");
const Schema_1 = require("./Schema");
const PropertySchema_1 = require("./PropertySchema");
const ObjectComparator_1 = require("./ObjectComparator");
const ObjectReader_1 = require("../reflect/ObjectReader");
class ObjectSchema extends Schema_1.Schema {
    constructor(allowExcessProperies, required, rules) {
        super(required, rules);
        this._allowExcess = false;
        this._allowExcess = allowExcessProperies;
    }
    get properties() {
        return this._properties;
    }
    set properties(value) {
        this._properties = value;
    }
    get isUndefinedAllowed() {
        return this._isUndefinedAllowed;
    }
    set isUndefinedAllowed(value) {
        this._isUndefinedAllowed = value;
    }
    allowUndefined(value) {
        this.isUndefinedAllowed = value;
        return this;
    }
    withProperty(schema) {
        this.properties = this.properties || [];
        this.properties.push(schema);
        return this;
    }
    withRequiredProperty(name, type, ...rules) {
        this.properties = this.properties || [];
        var schema = new PropertySchema_1.PropertySchema(null, null, name, type);
        schema.setRules(rules.slice());
        schema.makeRequired();
        return this.withProperty(schema);
    }
    withOptionalProperty(name, type, ...rules) {
        this.properties = this.properties || [];
        var schema = new PropertySchema_1.PropertySchema(null, null, name, type);
        schema.setRules(rules.slice());
        schema.makeOptional();
        return this.withProperty(schema);
    }
    performValidation(path, value, results) {
        super.performValidation(path, value, results);
        if (!value)
            return;
        let name = path || "value";
        let properties = ObjectReader_1.ObjectReader.getProperties(value);
        if (this.properties) {
            for (var i = 0; i < this.properties.length; i++) {
                var propertySchema = this.properties[i];
                var processedName = null;
                for (var key in properties) {
                    var propertyName = key;
                    var propertyValue = properties[key];
                    if (ObjectComparator_1.ObjectComparator.areEqual(propertySchema.getName(), propertyName)) {
                        propertySchema.performValidation(path, propertyValue, results);
                        processedName = propertyName;
                        break;
                    }
                }
                if (processedName)
                    delete properties[processedName];
                else
                    propertySchema.performValidation(path, null, results);
            }
        }
        if (!this._allowExcess)
            for (var key in properties) {
                let propertyPath = key && path != "" ? path + "." + key : key;
                results.push(new ValidationResult_1.ValidationResult(propertyPath, ValidationResultType_1.ValidationResultType.Warning, "UNEXPECTED_PROPERTY", name + " contains unexpected property " + key, null, key));
            }
    }
}
exports.ObjectSchema = ObjectSchema;
//# sourceMappingURL=ObjectSchema.js.map