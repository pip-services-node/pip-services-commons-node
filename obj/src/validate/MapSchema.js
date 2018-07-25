"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module validate */
let _ = require('lodash');
const ValidationResult_1 = require("./ValidationResult");
const ValidationResultType_1 = require("./ValidationResultType");
const Schema_1 = require("./Schema");
const ObjectReader_1 = require("../reflect/ObjectReader");
const TypeCode_1 = require("../convert/TypeCode");
const TypeConverter_1 = require("../convert/TypeConverter");
const StringConverter_1 = require("../convert/StringConverter");
class MapSchema extends Schema_1.Schema {
    constructor(required, rules, keyType, valueType) {
        super(required, rules);
        this._keyType = keyType;
        this._valueType = valueType;
    }
    getKeyType() {
        return this._keyType;
    }
    setKeyType(value) {
        this._keyType = value;
    }
    getValueType() {
        return this._valueType;
    }
    setValueType(value) {
        this._valueType = value;
    }
    performValidation(path, value, results) {
        value = ObjectReader_1.ObjectReader.getValue(value);
        super.performValidation(path, value, results);
        if (!value)
            return;
        let name = path || "value";
        let valueType = TypeConverter_1.TypeConverter.toTypeCode(value);
        let map = valueType === TypeCode_1.TypeCode.Map ? value : null;
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
    }
}
exports.MapSchema = MapSchema;
//# sourceMappingURL=MapSchema.js.map