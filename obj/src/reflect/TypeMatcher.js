"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
/** @hidden */
var _ = require('lodash');
var TypeCode_1 = require("../convert/TypeCode");
var TypeConverter_1 = require("../convert/TypeConverter");
/**
 * Helper class that contains methods for matching [[TypeCode data types]].
 *
 * @see [[TypeCode]]
 */
var TypeMatcher = /** @class */ (function () {
    function TypeMatcher() {
    }
    /**
     * Static method that checks whether or not the value passed as 'actualValue' is of
     * the same [[TypeCode data type]] as 'expectedType'. The data type of 'actualValue'
     * is determined using [[TypeConverter.toTypeCode]]. Type matching is done using this
     * class's [[matchType]] method.
     *
     * @param expectedType      the [[TypeCode data type]] that is expected. If set to
     *                          <code>null</code> - <code>true</code> will always be returned.
     * @param actualValue       the value, whose type is to be checked. Cannot be null.
     * @returns whether or not the actual value is of the expected type.
     *
     * @throws an Error if 'actualValue' is null.
     *
     * @see [[TypeCode]]
     * @see [[TypeConverter.toTypeCode]]
     * @see [[matchType]]
     * @see [[matchValuesTypeByName]] (for matching by types' string names)
     */
    TypeMatcher.matchValuesType = function (expectedType, actualValue) {
        if (expectedType == null)
            return true;
        if (actualValue == null)
            throw new Error("Actual value cannot be null");
        return TypeMatcher.matchType(expectedType, TypeConverter_1.TypeConverter.toTypeCode(actualValue));
    };
    /**
     * Static method that checks whether or not the two given [[TypeCode data types]] match.
     * If the expected type is in the format of a string - this class's [[matchTypeByName]]
     * method will be called and its result will be returned.
     *
     * @param expectedType  the data type that is expected. If set to
     *                      <code>null</code> - <code>true</code>
     *                      will always be returned.
     * @param actualType    the actual data type. Cannot be null.
     * @returns whether or not the actual and expected data types match.
     *
     * @throws an Error if 'actualType' is null.
     *
     * @see [[TypeCode]]
     * @see [[matchTypeByName]]
     * @see [[matchTypeByName]] (for matching by types' string names)
     */
    TypeMatcher.matchType = function (expectedType, actualType) {
        if (expectedType == null)
            return true;
        if (actualType == null)
            throw new Error("Actual type cannot be null");
        if (_.isInteger(expectedType)) {
            if (expectedType == TypeCode_1.TypeCode.Integer
                && (actualType == TypeCode_1.TypeCode.Long || actualType == TypeCode_1.TypeCode.Float || actualType == TypeCode_1.TypeCode.Double))
                return true;
            if (expectedType == TypeCode_1.TypeCode.Long
                && (actualType == TypeCode_1.TypeCode.Integer || actualType == TypeCode_1.TypeCode.Float || actualType == TypeCode_1.TypeCode.Double))
                return true;
            if (expectedType == TypeCode_1.TypeCode.Float
                && (actualType == TypeCode_1.TypeCode.Integer || actualType == TypeCode_1.TypeCode.Long || actualType == TypeCode_1.TypeCode.Double))
                return true;
            if (expectedType == TypeCode_1.TypeCode.Double
                && (actualType == TypeCode_1.TypeCode.Integer || actualType == TypeCode_1.TypeCode.Long || actualType == TypeCode_1.TypeCode.Float))
                return true;
            return expectedType == actualType;
        }
        if (_.isString(expectedType))
            return TypeMatcher.matchTypeByName(expectedType, actualType);
        return false;
    };
    /**
     * Static method that checks whether or not the value passed as 'actualValue' is of
     * the data type, whose name is represented as a string in 'expectedType'. The data type of
     * 'actualValue' is determined using [[TypeConverter.toTypeCode]]. Type matching is done
     * using this class's [[matchTypeByName]] method.
     *
     * @param expectedType      the data type (as a string) that is expected. If set to
     *                          <code>null</code> - <code>true</code> will always be returned.
     * @param actualValue       the value, whose type is to be checked. Cannot be null.
     * @returns whether or not the actual value is of the expected type.
     *
     * @throws an Error if 'actualValue' is null.
     *
     * @see [[TypeConverter.toTypeCode]]
     * @see [[matchTypeByName]]
     * @see [[matchValuesType]] (for matching by [[TypeCode]])
     */
    TypeMatcher.matchValuesTypeByName = function (expectedType, actualValue) {
        if (expectedType == null)
            return true;
        if (actualValue == null)
            throw new Error("Actual value cannot be null");
        return TypeMatcher.matchTypeByName(expectedType, TypeConverter_1.TypeConverter.toTypeCode(actualValue));
    };
    /**
     * Static method that checks whether or not the two given data type names ([[TypeCode]] strings)
     * match.
     *
     * @param expectedType  the data type (as a string) that is expected. If set to
     *                      <code>null</code> or "object" - <code>true</code> will
     *                      always be returned.
     * @param actualType    the actual data type (as a string). Cannot be null.
     * @returns whether or not the actual and expected data types names match.
     *
     * @throws an Error if 'actualType' is null.
     *
     * @see [[TypeConverter.toString]] (for a list of TypeCode strings)
     * @see [[matchType]] (for matching by [[TypeCode]])
     */
    TypeMatcher.matchTypeByName = function (expectedType, actualType) {
        if (expectedType == null)
            return true;
        if (actualType == null)
            throw new Error("Actual type cannot be null");
        expectedType = expectedType.toLowerCase();
        if (expectedType == "object")
            return true;
        else if (expectedType == "int" || expectedType == "integer") {
            return actualType == TypeCode_1.TypeCode.Integer
                || actualType == TypeCode_1.TypeCode.Long;
        }
        else if (expectedType == "long") {
            return actualType == TypeCode_1.TypeCode.Long;
        }
        else if (expectedType == "float") {
            return actualType == TypeCode_1.TypeCode.Float
                || actualType == TypeCode_1.TypeCode.Double;
        }
        else if (expectedType == "double") {
            return actualType == TypeCode_1.TypeCode.Double;
        }
        else if (expectedType == "string") {
            return actualType == TypeCode_1.TypeCode.String;
        }
        else if (expectedType == "bool" || expectedType == "boolean") {
            return actualType == TypeCode_1.TypeCode.Boolean;
        }
        else if (expectedType == "date" || expectedType == "datetime") {
            return actualType == TypeCode_1.TypeCode.DateTime;
        }
        else if (expectedType == "timespan" || expectedType == "duration") {
            return actualType == TypeCode_1.TypeCode.Integer
                || actualType == TypeCode_1.TypeCode.Long
                || actualType == TypeCode_1.TypeCode.Float
                || actualType == TypeCode_1.TypeCode.Double;
        }
        else if (expectedType == "enum") {
            return actualType == TypeCode_1.TypeCode.Integer
                || actualType == TypeCode_1.TypeCode.String;
        }
        else if (expectedType == "map" || expectedType == "dict" || expectedType == "dictionary") {
            return actualType == TypeCode_1.TypeCode.Map;
        }
        else if (expectedType == "array" || expectedType == "list") {
            return actualType == TypeCode_1.TypeCode.Array;
        }
        else if (_.endsWith(expectedType, "[]")) {
            // Todo: Check subtype
            return actualType == TypeCode_1.TypeCode.Array;
        }
        else
            return false;
    };
    return TypeMatcher;
}());
exports.TypeMatcher = TypeMatcher;
//# sourceMappingURL=TypeMatcher.js.map