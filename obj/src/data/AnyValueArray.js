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
/** @module data */
/** @hidden */
var _ = require('lodash');
var TypeConverter_1 = require("../convert/TypeConverter");
var StringConverter_1 = require("../convert/StringConverter");
var BooleanConverter_1 = require("../convert/BooleanConverter");
var IntegerConverter_1 = require("../convert/IntegerConverter");
var LongConverter_1 = require("../convert/LongConverter");
var FloatConverter_1 = require("../convert/FloatConverter");
var DoubleConverter_1 = require("../convert/DoubleConverter");
var DateTimeConverter_1 = require("../convert/DateTimeConverter");
var ArrayConverter_1 = require("../convert/ArrayConverter");
var AnyValue_1 = require("./AnyValue");
var AnyValueMap_1 = require("./AnyValueMap");
/**
 * Class that allows for usage of abstract, portable arrays. Stores a set of values, which can be retrieved
 * in various ways with the help of numerous converters.
 *
 * ### Example ###
 *     public MyMethod (values: any[]) {
 *         let array1 = AnyValueArray.fromString("MyData1,Error,Example,", ",");
 *         ...
 *
 *         let array2 = new AnyValueArray(values);
 *         ...
 *     }
 *
 * @see [[StringConverter]]
 * @see [[TypeConverter]]
 * @see [[BooleanConverter]]
 * @see [[IntegerConverter]]
 * @see [[LongConverter]]
 * @see [[DoubleConverter]]
 * @see [[FloatConverter]]
 * @see [[DateTimeConverter]]
 * @see [[ICloneable]]
 */
var AnyValueArray = /** @class */ (function (_super) {
    __extends(AnyValueArray, _super);
    /**
     * Creates a new object and sets its values to the 'values' passed
     * as a parameter. If 'values' are omitted, they can be set later on using
     * [[setAsObject]] or [[append]].
     *
     * @param values    the values to store in this AnyValueArray.
     */
    function AnyValueArray(values) {
        if (values === void 0) { values = null; }
        var _this = _super.call(this) || this;
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        _this.__proto__ = AnyValueArray.prototype;
        _this.append(values);
        return _this;
    }
    /**
     * Returns the item that is located at the given index.
     *
     * @param index     index of the item to retrieve from this AnyValueArray.
     * @returns         the item that is located at the given index.
     */
    AnyValueArray.prototype.get = function (index) {
        return this[index];
    };
    /**
     * Puts a value into this AnyValueArray at the given index.
     *
     * @param index     the index at which to insert the given value.
     * @param value     the value to insert into this AnyValueArray at the given index.
     */
    AnyValueArray.prototype.put = function (index, value) {
        this[index] = value;
    };
    /**
     * Removes an item by its index from this AnyValueArray.
     *
     * @param index     index of the item to remove.
     */
    AnyValueArray.prototype.remove = function (index) {
        this.splice(index, 1);
    };
    /**
     * Appends items to this AnyValueArray.
     *
     * @param elements  items to append to this AnyValueArray.
     */
    AnyValueArray.prototype.append = function (elements) {
        if (elements != null) {
            for (var index = 0; index < elements.length; index++)
                this.push(elements[index]);
        }
    };
    /** Removes all items from this AnyValueArray. */
    AnyValueArray.prototype.clear = function () {
        this.splice(0, this.length);
    };
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index without any conversions or
     *                  all items (if 'index' is undefined or omitted).
     */
    AnyValueArray.prototype.getAsObject = function (index) {
        if (index === void 0) { index = undefined; }
        if (index === undefined) {
            var result = [];
            for (index = 0; index < this.length; index++)
                result.push(this[index]);
            return result;
        }
        else {
            return this[index];
        }
    };
    /**
     * @param index     the position in this AnyValueArray to set the value at.
     * @param value     the value to set in this AnyValueArray at the given 'index'.
     *                  If 'index' is omitted, then this AnyValueArray will be set (cleared and
     *                  filled anew) using 'value'. In this case 'value' will be converted to
     *                  an array using "ArrayConverter.toArray(value)" and set to this AnyValueArray.
     *
     * @see [[ArrayConverter.toArray]]
     */
    AnyValueArray.prototype.setAsObject = function (index, value) {
        if (value === void 0) { value = undefined; }
        if (value === undefined) {
            value = index; //originally was not present - added by Mark Makarychev.
            this.clear();
            var elements = ArrayConverter_1.ArrayConverter.toArray(value);
            this.append(elements);
        }
        else {
            this[index] = value;
        }
    };
    /**
     * Converts the item at the given index into a nullable string object using
     * [[StringConverter.toNullableString]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable string.
     *
     * @see [[StringConverter.toNullableString]]
     */
    AnyValueArray.prototype.getAsNullableString = function (index) {
        var value = this[index];
        return StringConverter_1.StringConverter.toNullableString(value);
    };
    /**
     * Converts the item at the given index into a defaultable string object using
     * [[AnyValueArray.getAsStringWithDefault]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a string (or null as the default).
     *
     * @see [[getAsStringWithDefault]]
     */
    AnyValueArray.prototype.getAsString = function (index) {
        return this.getAsStringWithDefault(index, null);
    };
    /**
     * Converts the item at the given index into a defaultable string object using
     * [[StringConverter.toStringWithDefault]] and returns it.
     *
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given index as a string or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[StringConverter.toStringWithDefault]]
     */
    AnyValueArray.prototype.getAsStringWithDefault = function (index, defaultValue) {
        var value = this[index];
        return StringConverter_1.StringConverter.toStringWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given index into a nullable boolean object using
     * [[BooleanConverter.toNullableBoolean]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable boolean.
     *
     * @see [[BooleanConverter.toNullableBoolean]]
     */
    AnyValueArray.prototype.getAsNullableBoolean = function (index) {
        var value = this[index];
        return BooleanConverter_1.BooleanConverter.toNullableBoolean(value);
    };
    /**
     * Converts the item at the given index into a defaultable boolean object using
     * [[AnyValueArray.getAsBooleanWithDefault]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a boolean (or false as the default).
     *
     * @see [[getAsBooleanWithDefault]]
     */
    AnyValueArray.prototype.getAsBoolean = function (index) {
        return this.getAsBooleanWithDefault(index, false);
    };
    /**
     * Converts the item at the given index into a defaultable boolean object using
     * [[BooleanConverter.toBooleanWithDefault]] and returns it.
     *
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given index as a boolean or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[BooleanConverter.toBooleanWithDefault]]
     */
    AnyValueArray.prototype.getAsBooleanWithDefault = function (index, defaultValue) {
        var value = this[index];
        return BooleanConverter_1.BooleanConverter.toBooleanWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given index into a nullable integer object using
     * [[IntegerConverter.toNullableInteger]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable integer.
     *
     * @see [[IntegerConverter.toNullableInteger]]
     */
    AnyValueArray.prototype.getAsNullableInteger = function (index) {
        var value = this[index];
        return IntegerConverter_1.IntegerConverter.toNullableInteger(value);
    };
    /**
     * Converts the item at the given index into a defaultable integer object using
     * [[AnyValueArray.getAsIntegerWithDefault]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an integer (or 0 as the default).
     *
     * @see [[getAsIntegerWithDefault]]
     */
    AnyValueArray.prototype.getAsInteger = function (index) {
        return this.getAsIntegerWithDefault(index, 0);
    };
    /**
     * Converts the item at the given index into a defaultable integer object using
     * [[IntegerConverter.toIntegerWithDefault]] and returns it.
     *
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given index as an integer or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[IntegerConverter.toIntegerWithDefault]]
     */
    AnyValueArray.prototype.getAsIntegerWithDefault = function (index, defaultValue) {
        var value = this[index];
        return IntegerConverter_1.IntegerConverter.toIntegerWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given index into a nullable long object using
     * [[LongConverter.toNullableLong]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable long.
     *
     * @see [[LongConverter.toNullableLong]]
     */
    AnyValueArray.prototype.getAsNullableLong = function (index) {
        var value = this[index];
        return LongConverter_1.LongConverter.toNullableLong(value);
    };
    /**
     * Converts the item at the given index into a defaultable long object using
     * [[AnyValueArray.getAsLongWithDefault]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a long (or 0 as the default).
     *
     * @see [[getAsLongWithDefault]]
     */
    AnyValueArray.prototype.getAsLong = function (index) {
        return this.getAsLongWithDefault(index, 0);
    };
    /**
     * Converts the item at the given index into a defaultable long object using
     * [[LongConverter.toLongWithDefault]] and returns it.
     *
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given index as a long or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[LongConverter.toLongWithDefault]]
     */
    AnyValueArray.prototype.getAsLongWithDefault = function (index, defaultValue) {
        var value = this[index];
        return LongConverter_1.LongConverter.toLongWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given index into a nullable float object using
     * [[FloatConverter.toNullableFloat]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable float.
     *
     * @see [[FloatConverter.toNullableFloat]]
     */
    AnyValueArray.prototype.getAsNullableFloat = function (index) {
        var value = this[index];
        return FloatConverter_1.FloatConverter.toNullableFloat(value);
    };
    /**
     * Converts the item at the given index into a defaultable float object using
     * [[AnyValueArray.getAsFloatWithDefault]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a float (or 0 as the default).
     *
     * @see [[getAsFloatWithDefault]]
     */
    AnyValueArray.prototype.getAsFloat = function (index) {
        return this.getAsFloatWithDefault(index, 0);
    };
    /**
     * Converts the item at the given index into a defaultable float object using
     * [[FloatConverter.toFloatWithDefault]] and returns it.
     *
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given index as a float or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[FloatConverter.toFloatWithDefault]]
     */
    AnyValueArray.prototype.getAsFloatWithDefault = function (index, defaultValue) {
        var value = this[index];
        return FloatConverter_1.FloatConverter.toFloatWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given index into a nullable double object using
     * [[DoubleConverter.toNullableDouble]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable double.
     *
     * @see [[DoubleConverter.toNullableDouble]]
     */
    AnyValueArray.prototype.getAsNullableDouble = function (index) {
        var value = this[index];
        return DoubleConverter_1.DoubleConverter.toNullableDouble(value);
    };
    /**
     * Converts the item at the given index into a defaultable double object using
     * [[AnyValueArray.getAsDoubleWithDefault]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a double (or 0 as the default).
     *
     * @see [[getAsDoubleWithDefault]]
     */
    AnyValueArray.prototype.getAsDouble = function (index) {
        return this.getAsDoubleWithDefault(index, 0);
    };
    /**
     * Converts the item at the given index into a defaultable double object using
     * [[DoubleConverter.toDoubleWithDefault]] and returns it.
     *
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given index as a double or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[DoubleConverter.toDoubleWithDefault]]
     */
    AnyValueArray.prototype.getAsDoubleWithDefault = function (index, defaultValue) {
        var value = this[index];
        return DoubleConverter_1.DoubleConverter.toDoubleWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given index into a nullable Datetime object using
     * [[DateTimeConverter.toNullableDateTime]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable Datetime.
     *
     * @see [[DateTimeConverter.toNullableDateTime]]
     */
    AnyValueArray.prototype.getAsNullableDateTime = function (index) {
        var value = this[index];
        return DateTimeConverter_1.DateTimeConverter.toNullableDateTime(value);
    };
    /**
     * Converts the item at the given index into a defaultable Datetime object using
     * [[AnyValueArray.getAsDateTimeWithDefault]] and returns it.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a Datetime (or null as the default).
     *
     * @see [[getAsDateTimeWithDefault]]
     */
    AnyValueArray.prototype.getAsDateTime = function (index) {
        return this.getAsDateTimeWithDefault(index, null);
    };
    /**
     * Converts the item at the given index into a defaultable Datetime object using
     * [[DateTimeConverter.toDateTimeWithDefault]] and returns it.
     *
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given index as a Datetime or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[DateTimeConverter.toDateTimeWithDefault]]
     */
    AnyValueArray.prototype.getAsDateTimeWithDefault = function (index, defaultValue) {
        var value = this[index];
        return DateTimeConverter_1.DateTimeConverter.toDateTimeWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given index into a nullable object of type 'type' using
     * [[TypeConverter.toNullableType]] and returns it.
     *
     * @param type      the TypeCode to be used in TypeConverter.toNullableType<T>(TypeCode, value);
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable object of type 'type'.
     *
     * @see [[TypeConverter.toNullableType]]
     */
    AnyValueArray.prototype.getAsNullableType = function (type, index) {
        var value = this[index];
        return TypeConverter_1.TypeConverter.toNullableType(type, value);
    };
    /**
     * Converts the item at the given index into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     *
     * @param type      the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, null);
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an object of type 'type' (or null as the default).
     *
     * @see [[getAsTypeWithDefault]]
     */
    AnyValueArray.prototype.getAsType = function (type, index) {
        return this.getAsTypeWithDefault(type, index, null);
    };
    /**
     * Converts the item at the given index into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     *
     * @param type              the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, defaultValue);
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given index as an object of type 'type' or the defaultValue,
     *                          if conversion is not possible.
     *
     * @see [[TypeConverter.toTypeWithDefault]]
     */
    AnyValueArray.prototype.getAsTypeWithDefault = function (type, index, defaultValue) {
        var value = this[index];
        return TypeConverter_1.TypeConverter.toTypeWithDefault(type, value, defaultValue);
    };
    /**
     * Returns the item at the given index as an AnyValue object.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an AnyValue object.
     *
     * @see [[AnyValue]]
     * @see [[AnyValue.constructor]]
     */
    AnyValueArray.prototype.getAsValue = function (index) {
        var value = this[index];
        return new AnyValue_1.AnyValue(value);
    };
    /**
     * Returns the item at the given index as a nullable AnyValueArray object.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable AnyValueArray object (returns
     *                  null if the item at the given index is null).
     *
     * @see [[fromValue]]
     */
    AnyValueArray.prototype.getAsNullableArray = function (index) {
        var value = this[index];
        return value != null ? AnyValueArray.fromValue(value) : null;
    };
    /**
     * Returns the item at the given index as an AnyValueArray object.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an AnyValueArray object.
     *
     * @see [[fromValue]]
     */
    AnyValueArray.prototype.getAsArray = function (index) {
        var value = this[index];
        return AnyValueArray.fromValue(value);
    };
    /**
     * Returns the item at the given index as an AnyValueArray object
     * (or 'defaultValue' if conversion is not possible).
     *
     * @param index         index of the item to retrieve.
     * @param defaultValue  value to use if the item at the given index cannot be converted
     *                      into an AnyValueArray.
     * @returns             the item at the given index as an AnyValueArray object or 'defaultValue'
     *                      (if conversion is not possible).
     *
     * @see [[getAsNullableArray]]
     */
    AnyValueArray.prototype.getAsArrayWithDefault = function (index, defaultValue) {
        var result = this.getAsNullableArray(index);
        return result != null ? result : defaultValue;
    };
    /**
     * Returns the item at the given index as a nullable AnyValueMap object.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable AnyValueMap object (returns
     *                  null if the item at the given index is null).
     *
     * @see [[AnyValueMap]]
     * @see [[AnyValueMap.fromValue]]
     */
    AnyValueArray.prototype.getAsNullableMap = function (index) {
        var value = this[index];
        return value != null ? AnyValueMap_1.AnyValueMap.fromValue(value) : null;
    };
    /**
     * Returns the item at the given index as an AnyValueMap object.
     *
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an AnyValueMap object.
     *
     * @see [[AnyValueMap]]
     * @see [[AnyValueMap.fromValue]]
     */
    AnyValueArray.prototype.getAsMap = function (index) {
        var value = this[index];
        return AnyValueMap_1.AnyValueMap.fromValue(value);
    };
    /**
     * Returns the item at the given index as an AnyValueMap object
     * (or 'defaultValue' if conversion is not possible).
     *
     * @param index         index of the item to retrieve.
     * @param defaultValue  value to use if the item at the given index cannot be converted
     *                      into an AnyValueMap.
     * @returns             the item at the given index as an AnyValueMap object or 'defaultValue'
     *                      (if conversion is not possible).
     *
     * @see [[getAsNullableMap]]
     */
    AnyValueArray.prototype.getAsMapWithDefault = function (index, defaultValue) {
        var result = this.getAsNullableMap(index);
        return result != null ? AnyValueMap_1.AnyValueMap.fromValue(result) : defaultValue;
    };
    /**
     * Verifies that this AnyValueArray contains the given value.
     *
     * @param value     value to search for in this AnyValueArray.
     * @returns         whether or not this AnyValueArray contains the given value.
     */
    AnyValueArray.prototype.contains = function (value) {
        for (var index = 0; index < this.length; index++) {
            var element = this[index];
            if (value == null && element == null)
                return true;
            if (value == null || element == null)
                continue;
            if (value == element)
                return true;
        }
        return false;
    };
    /**
     * Verifies that this AnyValueArray contains a certain value as an object of type 'type'.
     * The value passed will be converted using [[TypeConverter.toType]], where as this AnyValueArray's
     * values will be converted using [[TypeConverter.toNullableType]]. After conversion, the value is searched
     * for amongst the AnyValueArray's converted values.
     *
     * @param type      the TypeCode to use for converting 'value' into an object of type 'type' using the
     *                  TypeConverter class.
     * @param value     the value to search for amongst this AnyValueArray's values after conversion.
     * @returns         whether or not this AnyValueArray contains the given value as an object of type
     *                  'type'. If both converted values are null, true will be returned.
     *
     * @see [[TypeConverter.toType]]
     * @see [[TypeConverter.toNullableType]]
     */
    AnyValueArray.prototype.containsAsType = function (type, value) {
        var typedValue = TypeConverter_1.TypeConverter.toType(type, value);
        for (var index = 0; index < this.length; index++) {
            var thisTypedValue = TypeConverter_1.TypeConverter.toNullableType(type, this[index]);
            if (typedValue == null && thisTypedValue == null)
                return true;
            if (typedValue == null || thisTypedValue == null)
                continue;
            if (typedValue == thisTypedValue)
                return true;
        }
        return false;
    };
    /** @returns a clone of this object. */
    AnyValueArray.prototype.clone = function () {
        return new AnyValueArray(this);
    };
    /**
     * @returns this AnyValueArray as a comma-separated values string.
     *
     * Example: "value1,,value3".
     */
    AnyValueArray.prototype.toString = function () {
        var builder = '';
        for (var index = 0; index < this.length; index++) {
            if (index > 0)
                builder += ',';
            builder += this.getAsStringWithDefault(index, "");
        }
        return builder;
    };
    /**
     * Static method for creating an AnyValueArray from the values passed as parameters.
     *
     * @param values    the values to initialize the AnyValueArray with, which are passed as parameters.
     * @returns         the AnyValueArray created and filled by the values provided.
     */
    AnyValueArray.fromValues = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new AnyValueArray(values);
    };
    /**
     * Static method for creating an AnyValueArray from a value using [[ArrayConverter.toNullableArray]].
     *
     * @param value     value to convert to a nullable array and initialize the new AnyValueArray with.
     * @returns         the AnyValueArray that was created and filled by 'value'.
     *
     * @see [[ArrayConverter.toNullableArray]]
     */
    AnyValueArray.fromValue = function (value) {
        var values = ArrayConverter_1.ArrayConverter.toNullableArray(value);
        return new AnyValueArray(values);
    };
    /**
     * Static method for creating an AnyValueArray from a string of 'values', separated using the char passed as
     * 'separator'.
     *
     * @param values            string of values, separated by the char passed as 'separator'
     * @param separator         char that is used to separate the values in the string passed as 'values'.
     * @param removeDuplicates  (optional) boolean that defines whether or not duplicate items should be removed.
     * @returns                 the AnyValueArray that was created and filled by 'values'.
     */
    AnyValueArray.fromString = function (values, separator, removeDuplicates) {
        if (removeDuplicates === void 0) { removeDuplicates = false; }
        var result = new AnyValueArray();
        if (values == null || values.length == 0)
            return result;
        var items = values.split(separator, -1);
        for (var index = 0; index < items.length; index++) {
            var item = items[index];
            if ((item != null && item.length > 0) || removeDuplicates == false)
                result.push(item != null ? new AnyValue_1.AnyValue(item) : null);
        }
        return result;
    };
    return AnyValueArray;
}(Array));
exports.AnyValueArray = AnyValueArray;
//# sourceMappingURL=AnyValueArray.js.map