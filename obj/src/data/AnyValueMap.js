"use strict";
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
var MapConverter_1 = require("../convert/MapConverter");
var AnyValue_1 = require("./AnyValue");
var AnyValueArray_1 = require("./AnyValueArray");
/**
 * Class that allows for usage of abstract, portable maps. Stores a set of key-value pairs, which can be retrieved
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
var AnyValueMap = /** @class */ (function () {
    /**
     * Creates a new instance and sets its values to the 'values' passed
     * as a parameter. If 'values' are omitted, they can be set later on using
     * [[setAsObject]] or [[append]].
     *
     * @param values    the values to store in this AnyValueMap.
     */
    function AnyValueMap(values) {
        if (values === void 0) { values = null; }
        this.append(values);
    }
    /**
     * @param key       key of the item to retrieve from this AnyValueMap.
     * @returns         the item stored by the given key.
     */
    AnyValueMap.prototype.get = function (key) {
        return this[key] || null;
    };
    /** @returns all of the keys that are contained in this AnyValueMap as a list of strings. */
    AnyValueMap.prototype.getKeys = function () {
        var keys = [];
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    };
    /**
     * @param key       the key by which to insert the given value.
     * @param value     the value to insert into this AnyValueMap by the given key.
     */
    AnyValueMap.prototype.put = function (key, value) {
        this[key] = value;
    };
    /**
     * @param key       key of the item to remove.
     */
    AnyValueMap.prototype.remove = function (key) {
        delete this[key];
    };
    /**
     * @param map   map of items to append to this AnyValueMap.
     */
    AnyValueMap.prototype.append = function (map) {
        if (map == null)
            return;
        for (var key in map) {
            var value = map[key];
            if (map.hasOwnProperty(key))
                this[key] = value;
        }
    };
    /** Removes all values from this AnyValueMap. */
    AnyValueMap.prototype.clear = function () {
        for (var key in this) {
            var value = this[key];
            if (this.hasOwnProperty(key))
                delete this[key];
        }
    };
    /** @returns the number of key-value pairs stored in this AnyValueMap. */
    AnyValueMap.prototype.length = function () {
        var count = 0;
        for (var key in this) {
            if (this.hasOwnProperty(key) && !_.isFunction(this[key])) {
                count++;
            }
        }
        return count;
    };
    /**
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key without any conversions or
     *                  all items (if 'key' is undefined or omitted).
     */
    AnyValueMap.prototype.getAsObject = function (key) {
        if (key === void 0) { key = undefined; }
        if (key === undefined) {
            var result = {};
            for (var key_1 in this) {
                var value = this[key_1];
                if (this.hasOwnProperty(key_1))
                    result[key_1] = value;
            }
            return result;
        }
        else {
            return this.get(key);
        }
    };
    /**
     * @param key       the key by which to set the 'value' passed.
     * @param value     the value to set in this AnyValueMap with the given 'key'.
     *                  If 'key' is omitted, then this AnyValueMap will be set (cleared and
     *                  filled anew) using 'value'. In this case 'value' will be converted to
     *                  a map using "MapConverter.toMap(value)" and set to this AnyValueMap.
     *
     * @see [[MapConverter.toMap]]
     */
    AnyValueMap.prototype.setAsObject = function (key, value) {
        if (value === void 0) { value = undefined; }
        if (value === undefined) {
            value = key;
            this.clear();
            var values = MapConverter_1.MapConverter.toMap(value);
            this.append(values);
        }
        else {
            this.put(key, value);
        }
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable string.
     *
     * @see [[StringConverter.toNullableString]]
     */
    AnyValueMap.prototype.getAsNullableString = function (key) {
        var value = this.get(key);
        return StringConverter_1.StringConverter.toNullableString(value);
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a string (or null as the default).
     *
     * @see [[getAsStringWithDefault]]
     */
    AnyValueMap.prototype.getAsString = function (key) {
        return this.getAsStringWithDefault(key, null);
    };
    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item with the given key as a string or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[StringConverter.toStringWithDefault]]
     */
    AnyValueMap.prototype.getAsStringWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return StringConverter_1.StringConverter.toStringWithDefault(value, defaultValue);
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable boolean.
     *
     * @see [[BooleanConverter.toNullableBoolean]]
     */
    AnyValueMap.prototype.getAsNullableBoolean = function (key) {
        var value = this.get(key);
        return BooleanConverter_1.BooleanConverter.toNullableBoolean(value);
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a boolean (or false as the default).
     *
     * @see [[getAsBooleanWithDefault]]
     */
    AnyValueMap.prototype.getAsBoolean = function (key) {
        return this.getAsBooleanWithDefault(key, false);
    };
    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item with the given key as a boolean or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[BooleanConverter.toBooleanWithDefault]]
     */
    AnyValueMap.prototype.getAsBooleanWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return BooleanConverter_1.BooleanConverter.toBooleanWithDefault(value, defaultValue);
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable integer.
     *
     * @see [[IntegerConverter.toNullableInteger]]
     */
    AnyValueMap.prototype.getAsNullableInteger = function (key) {
        var value = this.get(key);
        return IntegerConverter_1.IntegerConverter.toNullableInteger(value);
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as an integer (or 0 as the default).
     *
     * @see [[getAsIntegerWithDefault]]
     */
    AnyValueMap.prototype.getAsInteger = function (key) {
        return this.getAsIntegerWithDefault(key, 0);
    };
    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item with the given key as an integer or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[IntegerConverter.toIntegerWithDefault]]
     */
    AnyValueMap.prototype.getAsIntegerWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return IntegerConverter_1.IntegerConverter.toIntegerWithDefault(value, defaultValue);
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable long.
     *
     * @see [[LongConverter.toNullableLong]]
     */
    AnyValueMap.prototype.getAsNullableLong = function (key) {
        var value = this.get(key);
        return LongConverter_1.LongConverter.toNullableLong(value);
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a long (or 0 as the default).
     *
     * @see [[getAsLongWithDefault]]
     */
    AnyValueMap.prototype.getAsLong = function (key) {
        return this.getAsLongWithDefault(key, 0);
    };
    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item with the given key as a long or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[LongConverter.toLongWithDefault]]
     */
    AnyValueMap.prototype.getAsLongWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return LongConverter_1.LongConverter.toLongWithDefault(value, defaultValue);
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable float.
     *
     * @see [[FloatConverter.toNullableFloat]]
     */
    AnyValueMap.prototype.getAsNullableFloat = function (key) {
        var value = this.get(key);
        return FloatConverter_1.FloatConverter.toNullableFloat(value);
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a float (or 0 as the default).
     *
     * @see [[getAsFloatWithDefault]]
     */
    AnyValueMap.prototype.getAsFloat = function (key) {
        return this.getAsFloatWithDefault(key, 0);
    };
    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item with the given key as a float or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[FloatConverter.toFloatWithDefault]]
     */
    AnyValueMap.prototype.getAsFloatWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return FloatConverter_1.FloatConverter.toFloatWithDefault(value, defaultValue);
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable double.
     *
     * @see [[DoubleConverter.toNullableDouble]]
     */
    AnyValueMap.prototype.getAsNullableDouble = function (key) {
        var value = this.get(key);
        return DoubleConverter_1.DoubleConverter.toNullableDouble(value);
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a double (or 0 as the default).
     *
     * @see [[getAsDoubleWithDefault]]
     */
    AnyValueMap.prototype.getAsDouble = function (key) {
        return this.getAsDoubleWithDefault(key, 0);
    };
    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item with the given key as a double or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[DoubleConverter.toDoubleWithDefault]]
     */
    AnyValueMap.prototype.getAsDoubleWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return DoubleConverter_1.DoubleConverter.toDoubleWithDefault(value, defaultValue);
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a nullable Datetime.
     *
     * @see [[DateTimeConverter.toNullableDateTime]]
     */
    AnyValueMap.prototype.getAsNullableDateTime = function (key) {
        var value = this.get(key);
        return DateTimeConverter_1.DateTimeConverter.toNullableDateTime(value);
    };
    /**
     * @param key   key of the item to retrieve.
     * @returns     the item with the given key as a Datetime (or null as the default).
     *
     * @see [[getAsDateTimeWithDefault]]
     */
    AnyValueMap.prototype.getAsDateTime = function (key) {
        return this.getAsDateTimeWithDefault(key, null);
    };
    /**
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item with the given key as a Datetime or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[DateTimeConverter.toDateTimeWithDefault]]
     */
    AnyValueMap.prototype.getAsDateTimeWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return DateTimeConverter_1.DateTimeConverter.toDateTimeWithDefault(value, defaultValue);
    };
    /**
     * Converts the item with the given key into a nullable object of type 'type' using
     * [[TypeConverter.toNullableType]] and returns it.
     *
     * @param type      the TypeCode to be used in TypeConverter.toNullableType<T>(TypeCode, value);
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as a nullable object of type 'type'.
     *
     * @see [[TypeConverter.toNullableType]]
     */
    AnyValueMap.prototype.getAsNullableType = function (type, key) {
        var value = this.get(key);
        return TypeConverter_1.TypeConverter.toNullableType(type, value);
    };
    /**
     * Converts the item with the given key into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     *
     * @param type      the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, null);
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as an object of type 'type' (or null as the default).
     *
     * @see [[getAsTypeWithDefault]]
     */
    AnyValueMap.prototype.getAsType = function (type, key) {
        return this.getAsTypeWithDefault(type, key, null);
    };
    /**
     * Converts the item with the given key into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     *
     * @param type              the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, defaultValue);
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item with the given key as an object of type 'type' or the defaultValue,
     *                          if conversion is not possible.
     *
     * @see [[TypeConverter.toTypeWithDefault]]
     */
    AnyValueMap.prototype.getAsTypeWithDefault = function (type, key, defaultValue) {
        var value = this.get(key);
        return TypeConverter_1.TypeConverter.toTypeWithDefault(type, value, defaultValue);
    };
    /**
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as an AnyValue object.
     *
     * @see [[AnyValue]]
     * @see [[AnyValue.constructor]]
     */
    AnyValueMap.prototype.getAsValue = function (key) {
        var value = this.get(key);
        return new AnyValue_1.AnyValue(value);
    };
    /**
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as a nullable AnyValueArray object (returns
     *                  null if the item with the given key is null).
     *
     * @see [[AnyValueArray]]
     * @see [[AnyValueArray.fromValue]]
     */
    AnyValueMap.prototype.getAsNullableArray = function (key) {
        var value = this.get(key);
        return value != null ? AnyValueArray_1.AnyValueArray.fromValue(value) : null;
    };
    /**
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as an AnyValueArray object.
     *
     * @see [[AnyValueArray]]
     * @see [[AnyValueArray.fromValue]]
     */
    AnyValueMap.prototype.getAsArray = function (key) {
        var value = this.get(key);
        return AnyValueArray_1.AnyValueArray.fromValue(value);
    };
    /**
     * @param key           key of the item to retrieve.
     * @param defaultValue  value to use if the item with the given key cannot be converted
     *                      into an AnyValueArray.
     * @returns             the item with the given key as an AnyValueArray object or 'defaultValue',
     *                      if conversion is not possible.
     *
     * @see [[AnyValueArray]]
     * @see [[getAsNullableArray]]
     */
    AnyValueMap.prototype.getAsArrayWithDefault = function (key, defaultValue) {
        var result = this.getAsNullableArray(key);
        return result != null ? result : defaultValue;
    };
    /**
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as a nullable AnyValueMap object (returns
     *                  null if the item with the given key is null).
     *
     * @see [[fromValue]]
     */
    AnyValueMap.prototype.getAsNullableMap = function (key) {
        var value = this.get(key);
        return value != null ? AnyValueMap.fromValue(value) : null;
    };
    /**
     * @param key       key of the item to retrieve.
     * @returns         the item with the given key as an AnyValueMap object.
     *
     * @see [[fromValue]]
     */
    AnyValueMap.prototype.getAsMap = function (key) {
        var value = this.get(key);
        return AnyValueMap.fromValue(value);
    };
    /**
     * @param key           key of the item to retrieve.
     * @param defaultValue  value to use if the item with the given key cannot be converted
     *                      into an AnyValueMap.
     * @returns             the item with the given key as an AnyValueMap object or 'defaultValue',
     *                      if conversion is not possible.
     *
     * @see [[getAsNullableMap]]
     */
    AnyValueMap.prototype.getAsMapWithDefault = function (key, defaultValue) {
        var result = this.getAsNullableMap(key);
        return result != null ? result : defaultValue;
    };
    /**
     * @returns this AnyValueMap as a semicolon-separated values string.
     *
     * Example: "key1=value1;key2;key3=value3".
     */
    AnyValueMap.prototype.toString = function () {
        var builder = '';
        // Todo: User encoder
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                var value = this[key];
                if (builder.length > 0)
                    builder += ';';
                if (value != null)
                    builder += key + '=' + value;
                else
                    builder += key;
            }
        }
        return builder;
    };
    /** @returns a clone of this object. */
    AnyValueMap.prototype.clone = function () {
        return new AnyValueMap(this);
    };
    /**
     * Static method for creating an AnyValueMap from a value using [[setAsObject]].
     *
     * @param value     the value to set in the new AnyValueMap.
     * @returns         the AnyValueMap that was created and set to 'value'.
     *
     * @see [[setAsObject]]
     */
    AnyValueMap.fromValue = function (value) {
        var result = new AnyValueMap();
        result.setAsObject(value);
        return result;
    };
    /**
     * Static method for creating an AnyValueMap from the tuples that are passed as parameters.
     *
     * @param tuples    the key-value tuple parameters to initialize the new AnyValueMap with.
     * @returns         the AnyValueMap created and filled by the tuples provided.
     *
     * @see [[fromTuplesArray]]
     */
    AnyValueMap.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        return AnyValueMap.fromTuplesArray(tuples);
    };
    /**
     * Static method for creating an AnyValueMap from an array of tuples.
     *
     * @param tuples    the key-value tuples array to initialize the new AnyValueMap with.
     * @returns         the AnyValueMap created and filled by the 'tuples' array provided.
     */
    AnyValueMap.fromTuplesArray = function (tuples) {
        var result = new AnyValueMap();
        if (tuples == null || tuples.length == 0)
            return result;
        for (var index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length)
                break;
            var name_1 = StringConverter_1.StringConverter.toString(tuples[index]);
            var value = tuples[index + 1];
            result.setAsObject(name_1, value);
        }
        return result;
    };
    /**
     * Static method for creating an AnyValueMap using the maps passed as parameters.
     *
     * @param maps  the maps passed to this method to create an AnyValueMap with.
     * @returns     the AnyValueMap created.
     */
    AnyValueMap.fromMaps = function () {
        var maps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            maps[_i] = arguments[_i];
        }
        var result = new AnyValueMap();
        if (maps != null && maps.length > 0) {
            for (var index = 0; index < maps.length; index++)
                result.append(maps[index]);
        }
        return result;
    };
    return AnyValueMap;
}());
exports.AnyValueMap = AnyValueMap;
//# sourceMappingURL=AnyValueMap.js.map