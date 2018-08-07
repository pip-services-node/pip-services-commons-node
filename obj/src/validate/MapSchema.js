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
/** @module validate */
/** @hidden */
var _ = require('lodash');
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var Schema_1 = require("./Schema");
var ObjectReader_1 = require("../reflect/ObjectReader");
var TypeCode_1 = require("../convert/TypeCode");
var TypeConverter_1 = require("../convert/TypeConverter");
var StringConverter_1 = require("../convert/StringConverter");
/**
 * Used to validate maps, as well as the data type of their keys and values.
 */
var MapSchema = /** @class */ (function (_super) {
    __extends(MapSchema, _super);
    /**
     * Creates a new MapSchema object which can validate map objects using the
     * set rules. The keys' and values' data types will also be validated if
     * their [[TypeCode types]] are set.
     *
     * @param required      defines whether or not values that are not maps
     *                      should cause validation to fail (as a
     *                      [[ValidationResultType.Error validation error]]).
     * @param rules         the [[IValidationRule rules]] to set for this Schema.
     * @param keyType       the [[TypeCode data type]] to check for when validating a map's keys.
     *                      Can be set later on using [[setKeyType]].
     * @param valueType     the [[TypeCode data type]] to check for when validating a map's values.
     *                      Can be set later on using [[setValueType]].
     *
     * @see [[IValidationRule]]
     * @see [[TypeCode]]
     */
    function MapSchema(required, rules, keyType, valueType) {
        var _this = _super.call(this, required, rules) || this;
        _this._keyType = keyType;
        _this._valueType = valueType;
        return _this;
    }
    /**
     * @returns the [[TypeCode data type]] that this MapSchema will check for when validating keys.
     */
    MapSchema.prototype.getKeyType = function () {
        return this._keyType;
    };
    /**
     * @param value     the [[TypeCode data type]] that this MapSchema should check for when validating keys.
     */
    MapSchema.prototype.setKeyType = function (value) {
        this._keyType = value;
    };
    /**
     * @returns the [[TypeCode data type]] that this MapSchema will check for when validating values.
     */
    MapSchema.prototype.getValueType = function () {
        return this._valueType;
    };
    /**
     * @param value     the [[TypeCode data type]] that this MapSchema should check for when validating values.
     */
    MapSchema.prototype.setValueType = function (value) {
        this._valueType = value;
    };
    /**
     * Validates the given 'value' using [[Schema.performValidation]] and, if 'value' is a map,
     * additionally validates that all keys and values are of the data types [[getKeyType keyType]]
     * and [[getValueType valueType]], respectively.
     *
     * @param path      the dot notation path to the value that is to be validated.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation. If 'value' is not a map and this schema is
     *                  set as 'required', then the results will contain a
     *                  [[ValidationResultType.Error validation error]].
     */
    MapSchema.prototype.performValidation = function (path, value, results) {
        value = ObjectReader_1.ObjectReader.getValue(value);
        _super.prototype.performValidation.call(this, path, value, results);
        if (!value)
            return;
        var name = path || "value";
        var valueType = TypeConverter_1.TypeConverter.toTypeCode(value);
        var map = valueType === TypeCode_1.TypeCode.Map ? value : null;
        if (map) {
            for (var key in map) {
                var elementPath = path != "" ? path + "." + key : StringConverter_1.StringConverter.toString(key);
                this.performTypeValidation(elementPath, this.getKeyType(), key, results);
                this.performTypeValidation(elementPath, this.getValueType(), map[key], results);
            }
        }
        else {
            if (this.isRequired) {
                results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_ISNOT_MAP", name + " type must be Map", TypeCode_1.TypeCode.Map, valueType));
            }
        }
    };
    return MapSchema;
}(Schema_1.Schema));
exports.MapSchema = MapSchema;
//# sourceMappingURL=MapSchema.js.map