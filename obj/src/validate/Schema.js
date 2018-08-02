"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module validate */
/** @hidden */
var _ = require('lodash');
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ValidationException_1 = require("./ValidationException");
var ObjectReader_1 = require("../reflect/ObjectReader");
var TypeMatcher_1 = require("../reflect/TypeMatcher");
var TypeConverter_1 = require("../convert/TypeConverter");
/**
 * Allows for the creation of various schemas, which can be used for validating a wide variety
 * of objects.
 */
var Schema = /** @class */ (function () {
    /**
     * Creates a new general Schema object.
     *
     * @param required  (optional) defines whether or not <code>null</code>
     *                  values should cause validation to fail (as
     *                  a [[ValidationResultType.Error validation error]]).
     *                  Can be set later on using [[setRequired]].
     * @param rules     (optional) the the [[IValidationRule validation rules]] to
     *                  include in this Schema. Can be set later on using [[setRules]].
     *
     * @see [[IValidationRule]]
     */
    function Schema(required, rules) {
        this._required = required;
        this._rules = rules;
    }
    /**
     * @returns whether or not <code>null</code> values will cause validation to fail
     * (as a [[ValidationResultType.Error validation error]]).
     */
    Schema.prototype.isRequired = function () {
        return this._required;
    };
    /**
     * Changes whether or not <code>null</code> values should cause validation to fail
     * (as a [[ValidationResultType.Error validation error]]).
     *
     * @param value     defines whether or not this Schema is required.
     */
    Schema.prototype.setRequired = function (value) {
        this._required = value;
    };
    /**
     * @returns an array, containing the validation rules that are included in this Schema.
     */
    Schema.prototype.getRules = function () {
        return this._rules;
    };
    /**
     * Changes this Schema's validation rules to the ones passed.
     *
     * @param value     the array of validation rules to include in this Schema.
     */
    Schema.prototype.setRules = function (value) {
        this._rules = value;
    };
    /**
     * Makes this Schema required (required = true) and returns it.
     *
     * When a Schema is required, <code>null</code> values cause
     * validation to fail (as a [[ValidationResultType.Error validation error]]).
     *
     * @returns this Schema object as a required Schema.
     *
     * @see [[makeOptional]]
     */
    Schema.prototype.makeRequired = function () {
        this._required = true;
        return this;
    };
    /**
     * Makes this Schema optional (required = false) and returns it.
     *
     * When a Schema is optional, <code>null</code> values pass validation.
     *
     * @returns this Schema object as an optional Schema.
     *
     * @see [[makeRequired]]
     */
    Schema.prototype.makeOptional = function () {
        this._required = false;
        return this;
    };
    /**
     * Adds a validation rule to this Schema.
     *
     * @param rule  the validation rule to add to this Schema's rules.
     */
    Schema.prototype.withRule = function (rule) {
        this._rules = this._rules || [];
        this._rules.push(rule);
        return this;
    };
    /**
     * Validates the given 'value' using the rules that are set. If this schema is set as
     * 'required', then 'value' must not be null for validation to pass.
     *
     * @param path      the name of the value that is to be validated.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    Schema.prototype.performValidation = function (path, value, results) {
        var name = path || "value";
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
                    var rule = this._rules[i];
                    rule.validate(path, this, value, results);
                }
            }
        }
    };
    Schema.prototype.typeToString = function (type) {
        if (type == null)
            return "unknown";
        if (_.isNumber(type))
            return TypeConverter_1.TypeConverter.toString(type);
        return type.toString();
    };
    /**
     * Validates that the passed 'value' is an object of the given 'type'. If 'type' is an instance of
     * Schema - 'value' will be validated using the Schema's [[performValidation]] method. The type
     * of 'value' is determined using [[TypeConverter.toTypeCode]] and is compared to 'type' using
     * [[TypeMatcher.matchType]]
     *
     * @param path      the name of the value that is to be validated.
     * @param type      the type to validate against.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     *
     * @see [[performValidation]]
     * @see [[TypeConverter.toTypeCode]]
     * @see [[TypeMatcher.matchType]]
     */
    Schema.prototype.performTypeValidation = function (path, type, value, results) {
        // If type it not defined then skip
        if (type == null)
            return;
        // Perform validation against the schema
        if (type instanceof Schema) {
            var schema = type;
            schema.performValidation(path, value, results);
            return;
        }
        // If value is null then skip
        value = ObjectReader_1.ObjectReader.getValue(value);
        if (value == null)
            return;
        var name = path || "value";
        var valueType = TypeConverter_1.TypeConverter.toTypeCode(value);
        // Match types
        if (TypeMatcher_1.TypeMatcher.matchType(type, valueType))
            return;
        results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "TYPE_MISMATCH", name + " type must be " + this.typeToString(type) + " but found " + this.typeToString(valueType), type, valueType.toString()));
    };
    /**
     * Validates the given value using this class's [[performValidation]] method.
     *
     * @param value     the value to validate using this Schema's rules.
     * @returns an array of ValidationResults
     *
     * @see [[ValidationResult]]
     */
    Schema.prototype.validate = function (value) {
        var results = [];
        this.performValidation("", value, results);
        return results;
    };
    /**
     * Validates the given value and returns any exceptions that were raised.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param value             the value to validate using this Schema's rules.
     * @param strict            defines whether or not "Warnings" should raise exceptions.
     */
    Schema.prototype.validateAndReturnException = function (correlationId, value, strict) {
        if (strict === void 0) { strict = false; }
        var results = this.validate(value);
        return ValidationException_1.ValidationException.fromResults(correlationId, results, strict);
    };
    /**
     * Validates the given value and, if an exception was raised, throws the exception using
     * [[ValidationException.throwExceptionIfNeeded]].
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param value             the value to validate using this Schema's rules.
     * @param strict            defines whether or not "Warnings" should raise exceptions.
     *
     * @see [[ValidationException.throwExceptionIfNeeded]]
     */
    Schema.prototype.validateAndThrowException = function (correlationId, value, strict) {
        if (strict === void 0) { strict = false; }
        var results = this.validate(value);
        ValidationException_1.ValidationException.throwExceptionIfNeeded(correlationId, results, strict);
    };
    return Schema;
}());
exports.Schema = Schema;
//# sourceMappingURL=Schema.js.map