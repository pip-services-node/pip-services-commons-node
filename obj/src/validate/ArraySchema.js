"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module validate */
let _ = require('lodash');
const Schema_1 = require("../validate/Schema");
const ValidationResult_1 = require("./ValidationResult");
const ValidationResultType_1 = require("./ValidationResultType");
const ObjectReader_1 = require("../reflect/ObjectReader");
const TypeCode_1 = require("../convert/TypeCode");
const TypeConverter_1 = require("../convert/TypeConverter");
class ArraySchema extends Schema_1.Schema {
    constructor(valueType) {
        super();
        this._valueType = valueType;
    }
    get valueType() {
        return this._valueType;
    }
    performValidation(path, value, results) {
        let name = path || "value";
        value = ObjectReader_1.ObjectReader.getValue(value);
        super.performValidation(path, value, results);
        if (!value)
            return;
        if (_.isArray(value)) {
            for (let index = 0; index < value.length; index++) {
                let elementPath = path != "" ? path + "." + index : index.toString();
                this.performTypeValidation(elementPath, this.valueType, value[index], results);
            }
        }
        else {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "VALUE_ISNOT_ARRAY", name + " type must to be List or Array", TypeCode_1.TypeCode.Array, TypeConverter_1.TypeConverter.toTypeCode(value)));
        }
    }
}
exports.ArraySchema = ArraySchema;
//# sourceMappingURL=ArraySchema.js.map