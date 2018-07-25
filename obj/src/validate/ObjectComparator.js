"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module validate */
let _ = require('lodash');
const DoubleConverter_1 = require("../convert/DoubleConverter");
const StringConverter_1 = require("../convert/StringConverter");
class ObjectComparator {
    static compare(value1, operation, value2) {
        operation = operation.toUpperCase();
        if (operation == "=" || operation == "==" || operation == "EQ")
            return ObjectComparator.areEqual(value1, value2);
        if (operation == "!=" || operation == "<>" || operation == "NE")
            return ObjectComparator.areNotEqual(value1, value2);
        if (operation == "<" || operation == "LT")
            return ObjectComparator.less(value1, value2);
        if (operation == "<=" || operation == "LE")
            return ObjectComparator.areEqual(value1, value2) || ObjectComparator.less(value1, value2);
        if (operation == ">" || operation == "GT")
            return ObjectComparator.more(value1, value2);
        if (operation == ">=" || operation == "GE")
            return ObjectComparator.areEqual(value1, value2) || ObjectComparator.more(value1, value2);
        if (operation == "LIKE")
            return ObjectComparator.match(value1, value2);
        return true;
    }
    static areEqual(value1, value2) {
        if (value1 == null && value2 == null)
            return true;
        if (value1 == null || value2 == null)
            return false;
        return _.isEqual(value1, value2);
    }
    static areNotEqual(value1, value2) {
        return !ObjectComparator.areEqual(value1, value2);
    }
    static less(value1, value2) {
        var number1 = DoubleConverter_1.DoubleConverter.toNullableDouble(value1);
        var number2 = DoubleConverter_1.DoubleConverter.toNullableDouble(value2);
        if (number1 == null || number2 == null)
            return false;
        return number1 < number2;
    }
    static more(value1, value2) {
        var number1 = DoubleConverter_1.DoubleConverter.toNullableDouble(value1);
        var number2 = DoubleConverter_1.DoubleConverter.toNullableDouble(value2);
        if (number1 == null || number2 == null)
            return false;
        return number1 > number2;
    }
    static match(value1, value2) {
        if (value1 == null && value2 == null)
            return true;
        if (value1 == null || value2 == null)
            return false;
        let str1 = StringConverter_1.StringConverter.toString(value1);
        let str2 = StringConverter_1.StringConverter.toString(value2);
        return !!str1.match(str2);
    }
}
exports.ObjectComparator = ObjectComparator;
//# sourceMappingURL=ObjectComparator.js.map