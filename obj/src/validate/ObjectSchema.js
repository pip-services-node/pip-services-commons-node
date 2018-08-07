"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var Schema_1 = require("./Schema");
var PropertySchema_1 = require("./PropertySchema");
var ObjectComparator_1 = require("./ObjectComparator");
var ObjectReader_1 = require("../reflect/ObjectReader");
/**
 * Used to validate objects, as well as their properties.
 */
var ObjectSchema = /** @class */ (function (_super) {
    __extends(ObjectSchema, _super);
    /**
     * Creates a new ObjectSchema, which can be used to validate objects using the given rules.
     * Object properties can be validated as well if [[PropertySchema PropertySchemas]] are added to
     * this ObjectSchema.
     *
     * @param allowExcessProperies      defines whether or not validation results should contain
     *                                  a [[ValidationResultType.Warning Warning]], when excess
     *                                  properties are detected.
     * @param required                  defines whether or not <code>null</code> object
     *                                  properties should cause validation to fail (as
     *                                  a [[ValidationResultType.Error validation error]]).
     * @param rules                     the [[IValidationRule rules]] to set for this Schema.
     *
     * @see [[IValidationRule]]
     */
    function ObjectSchema(allowExcessProperies, required, rules) {
        var _this = _super.call(this, required, rules) || this;
        _this._allowExcess = false;
        _this._allowExcess = allowExcessProperies;
        return _this;
    }
    Object.defineProperty(ObjectSchema.prototype, "properties", {
        /**
         * @returns the array of PropertySchemas, which are to be used for object validation.
         *
         * @see [[PropertySchema]]
         */
        get: function () {
            return this._properties;
        },
        /**
         * @param value     the array of PropertySchemas to use for object validation.
         *
         * @see [[PropertySchema]]
         */
        set: function (value) {
            this._properties = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectSchema.prototype, "isUndefinedAllowed", {
        /**
         * @returns whether or not undefined properties are allowed to pass validation.
         */
        get: function () {
            return this._isUndefinedAllowed;
        },
        /**
         * @param value     whether or not undefined properties should be allowed to pass validation.
         */
        set: function (value) {
            this._isUndefinedAllowed = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets 'isUndefinedAllowed' to the given 'value' and returns the modified ObjectSchema.
     *
     * @param value     whether or not undefined properties should be allowed to pass validation.
     * @returns this ObjectSchema with 'isUndefinedAllowed' set to the value that was passed.
     */
    ObjectSchema.prototype.allowUndefined = function (value) {
        this.isUndefinedAllowed = value;
        return this;
    };
    /**
     * Adds a [[PropertySchema]] to this ObjectSchema object, which will be used for validating
     * objects' properties.
     *
     * @param schema    the PropertySchema to add to this ObjectSchema.
     * @returns this ObjectSchema with the new PropertySchema added to its list of properties.
     *
     * @see [[PropertySchema]]
     */
    ObjectSchema.prototype.withProperty = function (schema) {
        this.properties = this.properties || [];
        this.properties.push(schema);
        return this;
    };
    /**
     * Adds a new [[PropertySchema]] to this ObjectSchema using the given parameters and makes it
     * required. When a Schema is required, <code>null</code> values cause validation to fail (as
     * a [[ValidationResultType.Error validation error]]).
     *
     * @param name      the name of the property that is to be validated.
     * @param type      the [[TypeCode data type]] to check for when validating an object's property.
     * @param rules     the [[IValidationRule rules]] to set for the property's schema.
     *
     * @see [[PropertySchema]]
     * @see [[TypeCode]]
     * @see [[IValidationRule]]
     */
    ObjectSchema.prototype.withRequiredProperty = function (name, type) {
        var rules = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rules[_i - 2] = arguments[_i];
        }
        this.properties = this.properties || [];
        var schema = new PropertySchema_1.PropertySchema(null, null, name, type);
        schema.setRules(rules.slice());
        schema.makeRequired();
        return this.withProperty(schema);
    };
    /**
     * Adds a new [[PropertySchema]] to this ObjectSchema using the given parameters and makes it
     * optional. When a Schema is optional, <code>null</code> values pass validation.
     *
     * @param name      the name of the property that is to be validated.
     * @param type      the [[TypeCode data type]] to check for when validating an object's property.
     * @param rules     the [[IValidationRule rules]] to set for the property's schema.
     *
     * @see [[PropertySchema]]
     * @see [[TypeCode]]
     * @see [[IValidationRule]]
     */
    ObjectSchema.prototype.withOptionalProperty = function (name, type) {
        var rules = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rules[_i - 2] = arguments[_i];
        }
        this.properties = this.properties || [];
        var schema = new PropertySchema_1.PropertySchema(null, null, name, type);
        schema.setRules(rules.slice());
        schema.makeOptional();
        return this.withProperty(schema);
    };
    /**
     * Validates the given 'value' using [[Schema.performValidation]] and, if
     * [[PropertySchema PropertySchemas]] were set, additionally validates value's properties.
     * If excess properties are not allowed and are detected - the validation results will
     * contain a [[ValidationResultType.Warning Warning]].
     *
     * @param path      the dot notation path to the value that is to be validated.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation. If excess properties are not allowed and
     *                  are detected, then the results will contain a [[ValidationResultType.Warning Warning]].
     *
     * @see [[PropertySchema]]
     */
    ObjectSchema.prototype.performValidation = function (path, value, results) {
        _super.prototype.performValidation.call(this, path, value, results);
        if (!value)
            return;
        var name = path || "value";
        var properties = ObjectReader_1.ObjectReader.getProperties(value);
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
                var propertyPath = key && path != "" ? path + "." + key : key;
                results.push(new ValidationResult_1.ValidationResult(propertyPath, ValidationResultType_1.ValidationResultType.Warning, "UNEXPECTED_PROPERTY", name + " contains unexpected property " + key, null, key));
            }
    };
    return ObjectSchema;
}(Schema_1.Schema));
exports.ObjectSchema = ObjectSchema;
//# sourceMappingURL=ObjectSchema.js.map