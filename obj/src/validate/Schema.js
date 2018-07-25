"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module validate */
let _ = require('lodash');
const ValidationResult_1 = require("./ValidationResult");
const ValidationResultType_1 = require("./ValidationResultType");
const ValidationException_1 = require("./ValidationException");
const ObjectReader_1 = require("../reflect/ObjectReader");
const TypeMatcher_1 = require("../reflect/TypeMatcher");
const TypeConverter_1 = require("../convert/TypeConverter");
class Schema {
    constructor(required, rules) {
        this._required = required;
        this._rules = rules;
    }
    isRequired() {
        return this._required;
    }
    setRequired(value) {
        this._required = value;
    }
    getRules() {
        return this._rules;
    }
    setRules(value) {
        this._rules = value;
    }
    makeRequired() {
        this._required = true;
        return this;
    }
    makeOptional() {
        this._required = false;
        return this;
    }
    withRule(rule) {
        this._rules = this._rules || [];
        this._rules.push(rule);
        return this;
    }
    performValidation(path, value, results) {
        let name = path || "value";
        if (value == null) {
            if (this.isRequired()) {
                results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_IS_NULL", name + " must not be null", "NOT NULL", null));
            }
        }
        else {
            value = ObjectReader_1.ObjectReader.getValue(value);
            // Check validation rules
            if (this._rules != null) {
                for (var i = 0; i < this._rules.length; i++) {
                    let rule = this._rules[i];
                    rule.validate(path, this, value, results);
                }
            }
        }
    }
    typeToString(type) {
        if (type == null)
            return "unknown";
        if (_.isNumber(type))
            return TypeConverter_1.TypeConverter.toString(type);
        return type.toString();
    }
    performTypeValidation(path, type, value, results) {
        // If type it not defined then skip
        if (type == null)
            return;
        // Perform validation against schema
        if (type instanceof Schema) {
            let schema = type;
            schema.performValidation(path, value, results);
            return;
        }
        // If value is null then skip
        value = ObjectReader_1.ObjectReader.getValue(value);
        if (value == null)
            return;
        let name = path || "value";
        let valueType = TypeConverter_1.TypeConverter.toTypeCode(value);
        // Match types
        if (TypeMatcher_1.TypeMatcher.matchType(type, valueType))
            return;
        results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "TYPE_MISMATCH", name + " type must be " + this.typeToString(type) + " but found " + this.typeToString(valueType), type, valueType.toString()));
    }
    validate(value) {
        let results = [];
        this.performValidation("", value, results);
        return results;
    }
    validateAndReturnException(correlationId, value, strict = false) {
        let results = this.validate(value);
        return ValidationException_1.ValidationException.fromResults(correlationId, results, strict);
    }
    validateAndThrowException(correlationId, value, strict = false) {
        let results = this.validate(value);
        ValidationException_1.ValidationException.throwExceptionIfNeeded(correlationId, results, strict);
    }
}
exports.Schema = Schema;
//# sourceMappingURL=Schema.js.map