"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module data */
let _ = require('lodash');
const TypeConverter_1 = require("../convert/TypeConverter");
const StringConverter_1 = require("../convert/StringConverter");
const BooleanConverter_1 = require("../convert/BooleanConverter");
const IntegerConverter_1 = require("../convert/IntegerConverter");
const LongConverter_1 = require("../convert/LongConverter");
const FloatConverter_1 = require("../convert/FloatConverter");
const DoubleConverter_1 = require("../convert/DoubleConverter");
const DateTimeConverter_1 = require("../convert/DateTimeConverter");
const ArrayConverter_1 = require("../convert/ArrayConverter");
const AnyValue_1 = require("./AnyValue");
const AnyValueMap_1 = require("./AnyValueMap");
/**
 * Class that allows for usage of abstract, portable arrays. Stores a set of values, which can be retrieved
 * in various ways with the help of numerous converters.
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
class AnyValueArray extends Array {
    /**
     * Creates a new instance and sets its values to the 'values' passed
     * as a parameter. If 'values' are omitted, they can be set later on using
     * [[setAsObject]] or [[append]].
     *
     * @param values    the values to store in this AnyValueArray.
     */
    constructor(values = null) {
        super();
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        this.__proto__ = AnyValueArray.prototype;
        this.append(values);
    }
    /**
     * @param index     index of the item to retrieve from this AnyValueArray.
     * @returns         the item that is located at the given index.
     */
    get(index) {
        return this[index];
    }
    /**
     * @param index     the index at which to insert the given value.
     * @param value     the value to insert into this AnyValueArray at the given index.
     */
    put(index, value) {
        this[index] = value;
    }
    /**
     * @param index     index of the item to remove.
     */
    remove(index) {
        this.splice(index, 1);
    }
    /**
     * @param elements  items to append to this AnyValueArray.
     */
    append(elements) {
        if (elements != null) {
            for (let index = 0; index < elements.length; index++)
                this.push(elements[index]);
        }
    }
    /** Removes all items from this AnyValueArray. */
    clear() {
        this.splice(0, this.length);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index without any conversions or
     *                  all items, if 'index' is undefined or omitted.
     */
    getAsObject(index = undefined) {
        if (index === undefined) {
            let result = [];
            for (index = 0; index < this.length; index++)
                result.push(this[index]);
            return result;
        }
        else {
            return this[index];
        }
    }
    /**
     * @param index     the position in this AnyValueArray to set the value at.
     * @param value     the value to set in this AnyValueArray at the given 'index'.
     *                  If 'index' is omitted, then this AnyValueArray will be set (cleared and
     *                  filled anew) using 'value'. In this case 'value' will be converted to
     *                  an array using "ArrayConverter.toArray(value)" and set to this AnyValueArray.
     *
     * @see [[ArrayConverter.toArray]]
     */
    setAsObject(index, value = undefined) {
        if (value === undefined) {
            value = index; //originally was not present - added by Mark Makarychev.
            this.clear();
            let elements = ArrayConverter_1.ArrayConverter.toArray(value);
            this.append(elements);
        }
        else {
            this[index] = value;
        }
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable string.
     *
     * @see [[StringConverter.toNullableString]]
     */
    getAsNullableString(index) {
        let value = this[index];
        return StringConverter_1.StringConverter.toNullableString(value);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a string (or null as the default).
     *
     * @see [[getAsStringWithDefault]]
     */
    getAsString(index) {
        return this.getAsStringWithDefault(index, null);
    }
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a string or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[StringConverter.toStringWithDefault]]
     */
    getAsStringWithDefault(index, defaultValue) {
        let value = this[index];
        return StringConverter_1.StringConverter.toStringWithDefault(value, defaultValue);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable boolean.
     *
     * @see [[BooleanConverter.toNullableBoolean]]
     */
    getAsNullableBoolean(index) {
        let value = this[index];
        return BooleanConverter_1.BooleanConverter.toNullableBoolean(value);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a boolean (or false as the default).
     *
     * @see [[getAsBooleanWithDefault]]
     */
    getAsBoolean(index) {
        return this.getAsBooleanWithDefault(index, false);
    }
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a boolean or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[BooleanConverter.toBooleanWithDefault]]
     */
    getAsBooleanWithDefault(index, defaultValue) {
        let value = this[index];
        return BooleanConverter_1.BooleanConverter.toBooleanWithDefault(value, defaultValue);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable integer.
     *
     * @see [[IntegerConverter.toNullableInteger]]
     */
    getAsNullableInteger(index) {
        let value = this[index];
        return IntegerConverter_1.IntegerConverter.toNullableInteger(value);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an integer (or 0 as the default).
     *
     * @see [[getAsIntegerWithDefault]]
     */
    getAsInteger(index) {
        return this.getAsIntegerWithDefault(index, 0);
    }
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as an integer or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[IntegerConverter.toIntegerWithDefault]]
     */
    getAsIntegerWithDefault(index, defaultValue) {
        let value = this[index];
        return IntegerConverter_1.IntegerConverter.toIntegerWithDefault(value, defaultValue);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable long.
     *
     * @see [[LongConverter.toNullableLong]]
     */
    getAsNullableLong(index) {
        let value = this[index];
        return LongConverter_1.LongConverter.toNullableLong(value);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a long (or 0 as the default).
     *
     * @see [[getAsLongWithDefault]]
     */
    getAsLong(index) {
        return this.getAsLongWithDefault(index, 0);
    }
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a long or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[LongConverter.toLongWithDefault]]
     */
    getAsLongWithDefault(index, defaultValue) {
        let value = this[index];
        return LongConverter_1.LongConverter.toLongWithDefault(value, defaultValue);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable float.
     *
     * @see [[FloatConverter.toNullableFloat]]
     */
    getAsNullableFloat(index) {
        let value = this[index];
        return FloatConverter_1.FloatConverter.toNullableFloat(value);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a float (or 0 as the default).
     *
     * @see [[getAsFloatWithDefault]]
     */
    getAsFloat(index) {
        return this.getAsFloatWithDefault(index, 0);
    }
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a float or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[FloatConverter.toFloatWithDefault]]
     */
    getAsFloatWithDefault(index, defaultValue) {
        let value = this[index];
        return FloatConverter_1.FloatConverter.toFloatWithDefault(value, defaultValue);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable double.
     *
     * @see [[DoubleConverter.toNullableDouble]]
     */
    getAsNullableDouble(index) {
        let value = this[index];
        return DoubleConverter_1.DoubleConverter.toNullableDouble(value);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a double (or 0 as the default).
     *
     * @see [[getAsDoubleWithDefault]]
     */
    getAsDouble(index) {
        return this.getAsDoubleWithDefault(index, 0);
    }
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a double or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[DoubleConverter.toDoubleWithDefault]]
     */
    getAsDoubleWithDefault(index, defaultValue) {
        let value = this[index];
        return DoubleConverter_1.DoubleConverter.toDoubleWithDefault(value, defaultValue);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable Datetime.
     *
     * @see [[DateTimeConverter.toNullableDateTime]]
     */
    getAsNullableDateTime(index) {
        let value = this[index];
        return DateTimeConverter_1.DateTimeConverter.toNullableDateTime(value);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a Datetime (or null as the default).
     *
     * @see [[getAsDateTimeWithDefault]]
     */
    getAsDateTime(index) {
        return this.getAsDateTimeWithDefault(index, null);
    }
    /**
     * @param index             index of the item to retrieve.
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as a Datetime or the
     *                          defaultValue, if conversion is not possible.
     *
     * @see [[DateTimeConverter.toDateTimeWithDefault]]
     */
    getAsDateTimeWithDefault(index, defaultValue) {
        let value = this[index];
        return DateTimeConverter_1.DateTimeConverter.toDateTimeWithDefault(value, defaultValue);
    }
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
    getAsNullableType(type, index) {
        let value = this[index];
        return TypeConverter_1.TypeConverter.toNullableType(type, value);
    }
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
    getAsType(type, index) {
        return this.getAsTypeWithDefault(type, index, null);
    }
    /**
     * Converts the item at the given index into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     *
     * @param type              the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, defaultValue);
     * @param defaultValue      value to return, if conversion is not possible.
     * @returns                 the item at the given index as an object of type 'type' or the defaultValue,
     *                          if conversion is not possible.
     *
     * @see [[TypeConverter.toTypeWithDefault]]
     */
    getAsTypeWithDefault(type, index, defaultValue) {
        let value = this[index];
        return TypeConverter_1.TypeConverter.toTypeWithDefault(type, value, defaultValue);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an AnyValue object.
     *
     * @see [[AnyValue]]
     * @see [[AnyValue.AnyValue]]
     */
    getAsValue(index) {
        let value = this[index];
        return new AnyValue_1.AnyValue(value);
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable AnyValueArray object (returns
     *                  null if the item at the given index is null).
     *
     * @see [[fromValue]]
     */
    getAsNullableArray(index) {
        let value = this[index];
        return value != null ? AnyValueArray.fromValue(value) : null;
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an AnyValueArray object.
     *
     * @see [[fromValue]]
     */
    getAsArray(index) {
        let value = this[index];
        return AnyValueArray.fromValue(value);
    }
    /**
     * @param index         index of the item to retrieve.
     * @param defaultValue  value to use if the item at the given index cannot be converted
     *                      into an AnyValueArray.
     * @returns             the item at the given index as an AnyValueArray object or 'defaultValue',
     *                      if conversion is not possible.
     *
     * @see [[getAsNullableArray]]
     */
    getAsArrayWithDefault(index, defaultValue) {
        let result = this.getAsNullableArray(index);
        return result != null ? result : defaultValue;
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as a nullable AnyValueMap object (returns
     *                  null if the item at the given index is null).
     *
     * @see [[AnyValueMap]]
     * @see [[AnyValueMap.fromValue]]
     */
    getAsNullableMap(index) {
        let value = this[index];
        return value != null ? AnyValueMap_1.AnyValueMap.fromValue(value) : null;
    }
    /**
     * @param index     index of the item to retrieve.
     * @returns         the item at the given index as an AnyValueMap object.
     *
     * @see [[AnyValueMap]]
     * @see [[AnyValueMap.fromValue]]
     */
    getAsMap(index) {
        let value = this[index];
        return AnyValueMap_1.AnyValueMap.fromValue(value);
    }
    /**
     * @param index         index of the item to retrieve.
     * @param defaultValue  value to use if the item at the given index cannot be converted
     *                      into an AnyValueMap.
     * @returns             the item at the given index as an AnyValueMap object or 'defaultValue',
     *                      if conversion is not possible.
     *
     * @see [[getAsNullableMap]]
     */
    getAsMapWithDefault(index, defaultValue) {
        let result = this.getAsNullableMap(index);
        return result != null ? AnyValueMap_1.AnyValueMap.fromValue(result) : defaultValue;
    }
    /**
     * @param value     value to search for in this AnyValueArray.
     * @returns         whether or not this AnyValueArray contains the given value.
     */
    contains(value) {
        for (let index = 0; index < this.length; index++) {
            let element = this[index];
            if (value == null && element == null)
                return true;
            if (value == null || element == null)
                continue;
            if (value == element)
                return true;
        }
        return false;
    }
    /**
     * Checks whether or not this AnyValueArray contains a certain value as an object of type 'type'.
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
    containsAsType(type, value) {
        let typedValue = TypeConverter_1.TypeConverter.toType(type, value);
        for (let index = 0; index < this.length; index++) {
            let thisTypedValue = TypeConverter_1.TypeConverter.toNullableType(type, this[index]);
            if (typedValue == null && thisTypedValue == null)
                return true;
            if (typedValue == null || thisTypedValue == null)
                continue;
            if (typedValue == thisTypedValue)
                return true;
        }
        return false;
    }
    /** @returns a clone of this object. */
    clone() {
        return new AnyValueArray(this);
    }
    /**
     * @returns this AnyValueArray as a comma-separated values string.
     *
     * Example: "value1,,value3".
     */
    toString() {
        let builder = '';
        for (let index = 0; index < this.length; index++) {
            if (index > 0)
                builder += ',';
            builder += this.getAsStringWithDefault(index, "");
        }
        return builder;
    }
    /**
     * Static method for creating an AnyValueArray from the values passed as parameters.
     *
     * @param values    the values to initialize the AnyValueArray with, which are passed as parameters.
     * @returns         the AnyValueArray created and filled by the values provided.
     */
    static fromValues(...values) {
        return new AnyValueArray(values);
    }
    /**
     * Static method for creating an AnyValueArray from a value using [[ArrayConverter.toNullableArray]].
     *
     * @param value     value to convert to a nullable array and initialize the new AnyValueArray with.
     * @returns         the AnyValueArray that was created and filled by 'value'.
     *
     * @see [[ArrayConverter.toNullableArray]]
     */
    static fromValue(value) {
        let values = ArrayConverter_1.ArrayConverter.toNullableArray(value);
        return new AnyValueArray(values);
    }
    /**
     * Static method for creating an AnyValueArray from a string of 'values', separated using the char passed as
     * 'separator'.
     *
     * @param values            string of values, separated by the char passed as 'separator'
     * @param separator         char that is used to separate the values in the string passed as 'values'.
     * @param removeDuplicates  (optional) boolean that defines whether or not duplicate items should be removed.
     * @returns                 the AnyValueArray that was created and filled by 'values'.
     */
    static fromString(values, separator, removeDuplicates = false) {
        let result = new AnyValueArray();
        if (values == null || values.length == 0)
            return result;
        let items = values.split(separator, -1);
        for (let index = 0; index < items.length; index++) {
            let item = items[index];
            if ((item != null && item.length > 0) || removeDuplicates == false)
                result.push(item != null ? new AnyValue_1.AnyValue(item) : null);
        }
        return result;
    }
}
exports.AnyValueArray = AnyValueArray;
//# sourceMappingURL=AnyValueArray.js.map