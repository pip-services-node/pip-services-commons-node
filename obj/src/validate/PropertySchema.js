"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Schema_1 = require("./Schema");
/**
 * Used to validate object properties, as well as their type. Using in [[ObjectSchema ObjectSchemas]].
 *
 * @see [[ObjectSchema]]
 */
var PropertySchema = /** @class */ (function (_super) {
    __extends(PropertySchema, _super);
    /**
     * Creates a new PropertySchema object which can validate an object's property using the
     * set rules. The data type of the property will also be validated if a [[TypeCode type]] is set.
     *
     * @param required      defines whether or not <code>null</code> values
     *                      should cause validation to fail (as
     *                      a [[ValidationResultType.Error validation error]]).
     * @param rules         the [[IValidationRule rules]] to set for this Schema.
     * @param name          the name of the property that is to be validated.
     *                      Can be set later on using [[setName]].
     * @param type          the [[TypeCode data type]] to check for when validating an object's property.
     *                      Can be set later on using [[setType]].
     *
     * @see [[IValidationRule]]
     * @see [[TypeCode]]
     */
    function PropertySchema(required, rules, name, type) {
        var _this = _super.call(this, required, rules) || this;
        _this._name = name;
        _this._type = type;
        return _this;
    }
    /**
     * @returns the name of the property that this PropertySchema validates.
     */
    PropertySchema.prototype.getName = function () {
        return this._name;
    };
    /**
     * @param value     the name of the property that this PropertySchema should validate.
     */
    PropertySchema.prototype.setName = function (value) {
        this._name = value;
    };
    /**
     * @returns the [[TypeCode data type]] that this PropertySchema checks for when validating a property.
     */
    PropertySchema.prototype.getType = function () {
        return this._type;
    };
    /**
     * @param value     the [[TypeCode data type]] that this PropertySchema should check for when
     * validating a property.
     */
    PropertySchema.prototype.setType = function (value) {
        this._type = value;
    };
    /**
     * Validates the given 'value' using [[Schema.performValidation]] and, if a [[getType type]] is a set,
     * additionally validates that the passed value (property) is of the correct data type.
     *
     * @param path      the name of the value that is to be validated.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    PropertySchema.prototype.performValidation = function (path, value, results) {
        path = path != "" ? path + "." + this.getName() : this.getName();
        _super.prototype.performValidation.call(this, path, value, results);
        _super.prototype.performTypeValidation.call(this, path, this.getType(), value, results);
    };
    return PropertySchema;
}(Schema_1.Schema));
exports.PropertySchema = PropertySchema;
//# sourceMappingURL=PropertySchema.js.map