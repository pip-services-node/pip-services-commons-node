"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module validate */
/** @hidden */
var _ = require('lodash');
var DoubleConverter_1 = require("../convert/DoubleConverter");
var StringConverter_1 = require("../convert/StringConverter");
/**
 * Helper class for comparing various objects.
 */
var ObjectComparator = /** @class */ (function () {
    function ObjectComparator() {
    }
    /**
     * Static method that compares a set of values using the given operation.
     *
     * @param value1        the first value in the pair.
     * @param operation     the operation to apply to the pair of values. Supported operations:
     *                      "==" ("=", "EQ"), "!= " ("<>", "NE"); "<"/">" ("LT"/"GT"), "<="/">="
     *                      ("LE"/"GE"); "LIKE".
     * @param value2        the second value in the pair.
     *
     * @see [[areEqual]]/[[areNotEqual]] (operation - "=="/"!=")
     * @see [[isLess]]/[[isGreater]] (operation - "<"/">")
     * @see [[match]] (operation - "LIKE")
     */
    ObjectComparator.compare = function (value1, operation, value2) {
        operation = operation.toUpperCase();
        if (operation == "=" || operation == "==" || operation == "EQ")
            return ObjectComparator.areEqual(value1, value2);
        if (operation == "!=" || operation == "<>" || operation == "NE")
            return ObjectComparator.areNotEqual(value1, value2);
        if (operation == "<" || operation == "LT")
            return ObjectComparator.isLess(value1, value2);
        if (operation == "<=" || operation == "LE")
            return ObjectComparator.areEqual(value1, value2) || ObjectComparator.isLess(value1, value2);
        if (operation == ">" || operation == "GT")
            return ObjectComparator.isGreater(value1, value2);
        if (operation == ">=" || operation == "GE")
            return ObjectComparator.areEqual(value1, value2) || ObjectComparator.isGreater(value1, value2);
        if (operation == "LIKE")
            return ObjectComparator.match(value1, value2);
        return true;
    };
    /**
     * Static method that checks whether or not a pair of values are equal. If both values are
     * null - they are considered to be equal.
     */
    ObjectComparator.areEqual = function (value1, value2) {
        if (value1 == null && value2 == null)
            return true;
        if (value1 == null || value2 == null)
            return false;
        return _.isEqual(value1, value2);
    };
    /**
     * Static method that checks whether or not a pair of values are not equal by inverting the
     * result of [[areEqual]].
     *
     * @see [[areEqual]]
     */
    ObjectComparator.areNotEqual = function (value1, value2) {
        return !ObjectComparator.areEqual(value1, value2);
    };
    /**
     * Static method that checks whether or not the first parameter is less than the second one
     * (value1 < value2). If either value is null - <code>false</code> will be returned.
     */
    ObjectComparator.isLess = function (value1, value2) {
        var number1 = DoubleConverter_1.DoubleConverter.toNullableDouble(value1);
        var number2 = DoubleConverter_1.DoubleConverter.toNullableDouble(value2);
        if (number1 == null || number2 == null)
            return false;
        return number1 < number2;
    };
    /**
     * Static method that checks whether or not the first parameter is greater than the second one
     * (value1 > value2). If either value is null - <code>false</code> will be returned.
     */
    ObjectComparator.isGreater = function (value1, value2) {
        var number1 = DoubleConverter_1.DoubleConverter.toNullableDouble(value1);
        var number2 = DoubleConverter_1.DoubleConverter.toNullableDouble(value2);
        if (number1 == null || number2 == null)
            return false;
        return number1 > number2;
    };
    /**
     * Static method that checks whether or not a pair of values match. The values are converted to
     * strings using [[StringConverter.toString StringConverter's toString]] method to see if they
     * match. If both values are null - they are considered to match.
     */
    ObjectComparator.match = function (value1, value2) {
        if (value1 == null && value2 == null)
            return true;
        if (value1 == null || value2 == null)
            return false;
        var str1 = StringConverter_1.StringConverter.toString(value1);
        var str2 = StringConverter_1.StringConverter.toString(value2);
        return !!str1.match(str2);
    };
    return ObjectComparator;
}());
exports.ObjectComparator = ObjectComparator;
//# sourceMappingURL=ObjectComparator.js.map