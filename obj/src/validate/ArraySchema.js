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
/** @module validate */
/** @hidden */
var _ = require('lodash');
var Schema_1 = require("./Schema");
var ValidationResult_1 = require("./ValidationResult");
var ValidationResultType_1 = require("./ValidationResultType");
var ObjectReader_1 = require("../reflect/ObjectReader");
var TypeCode_1 = require("../convert/TypeCode");
var TypeConverter_1 = require("../convert/TypeConverter");
/**
 * Used to validate arrays, as well as their values' data types.
 */
var ArraySchema = /** @class */ (function (_super) {
    __extends(ArraySchema, _super);
    /**
     * Creates a new ArraySchema, which can be used to validate arrays that contain
     * values of the data type 'valueType'.
     *
     * @param valueType     the [[TypeCode data type]] to check for when validating an array's values.
     *
     * @see [[TypeCode]]
     */
    function ArraySchema(valueType) {
        var _this = _super.call(this) || this;
        _this._valueType = valueType;
        return _this;
    }
    /**
     * @returns the [[TypeCode data type]] for which this Schema checks when validating an array's values.
     */
    ArraySchema.prototype.getValueType = function () {
        return this._valueType;
    };
    /**
     * Validates the given 'value' using [[Schema.performValidation]] and, if 'value' is an array,
     * additionally validates that all values stored are objects of the data type
     * [[valueType that is set]] in this ArraySchema object.
     *
     * @param path      the dot notation path to the value that is to be validated.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation. If 'value' is not an array - the
     *                  results will contain a [[ValidationResultType.Error validation error]].
     *
     * @see [[Schema.performValidation]]
     * @see [[valueType]]
     * @see [[ValidationResultType.Error]]
     */
    ArraySchema.prototype.performValidation = function (path, value, results) {
        var name = path || "value";
        value = ObjectReader_1.ObjectReader.getValue(value);
        _super.prototype.performValidation.call(this, path, value, results);
        if (!value)
            return;
        if (_.isArray(value)) {
            for (var index = 0; index < value.length; index++) {
                var elementPath = path != "" ? path + "." + index : index.toString();
                this.performTypeValidation(elementPath, this.getValueType(), value[index], results);
            }
        }
        else {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_ISNOT_ARRAY", name + " type must to be List or Array", TypeCode_1.TypeCode.Array, TypeConverter_1.TypeConverter.toTypeCode(value)));
        }
    };
    return ArraySchema;
}(Schema_1.Schema));
exports.ArraySchema = ArraySchema;
//# sourceMappingURL=ArraySchema.js.map