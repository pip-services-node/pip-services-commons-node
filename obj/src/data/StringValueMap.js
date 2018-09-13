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
var AnyValueMap_1 = require("./AnyValueMap");
/**
 * Class that allows for usage of abstract, portable string-value maps. Stores a set of values using string keys. The values that are
 * stored can be retrieved in various ways with the help of numerous converters.
 *
 * StringValueMap is crucial to the PipServices framework, as it is used to create serializable objects. [[ConfigParams]],
 * [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/classes/connect.connectionparams.html ConnectionParams]],
 * [[FilterParams]], and many other PipServices classes extend StringValueMap.
 *
 * @see [[StringConverter]]
 * @see [[TypeConverter]]
 * @see [[BooleanConverter]]
 * @see [[IntegerConverter]]
 * @see [[LongConverter]]
 * @see [[DoubleConverter]]
 * @see [[FloatConverter]]
 * @see [[DateTimeConverter]]
 *
 * ### Examples ###
 *
 * Example StringValueMap object usage:
 *
 *     public MyMethod (map: any) {
 *         let map1 = StringValueMap.fromTuples(
 *             "key1", 123,
 *             "key2", "ABC"
 *         );
 *         ...
 *
 *         let map2 = new StringValueMap(map);
 *         ...
 *     }
 */
var StringValueMap = /** @class */ (function () {
    /**
     * Creates a new object and sets its values to the 'values' passed
     * as a parameter. If 'values' are omitted, they can be set later on using
     * [[setAsObject]] or [[append]].
     *
     * @param values    the values to store in this StringValueMap.
     */
    function StringValueMap(map) {
        if (map === void 0) { map = null; }
        if (map != null)
            this.append(map);
    }
    /**
     * Returns the item stored by the given key.
     *
     * @param key       key of the item to retrieve from this StringValueMap.
     * @returns         the item stored by the given key.
     */
    StringValueMap.prototype.get = function (key) {
        return this[key] || null;
    };
    /**
     * Returns this StringValueMap's keyset as a list of strings.
     *
     * @returns all of the keys that are contained in this StringValueMap as a list of strings.
     */
    StringValueMap.prototype.getKeys = function () {
        var keys = [];
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    };
    /**
     * Puts a value into this StringValueMap by the given key.
     *
     * @param key       the key by which to insert the given value.
     * @param value     the value to insert into this StringValueMap by the given key.
     */
    StringValueMap.prototype.put = function (key, value) {
        this[key] = StringConverter_1.StringConverter.toNullableString(value);
    };
    /**
     * Removes an item by its key from this StringValueMap.
     *
     * @param key       the key of the item to remove.
     */
    StringValueMap.prototype.remove = function (key) {
        delete this[key];
    };
    /**
     * Appends a map of items to this StringValueMap.
     *
     * @param map   the map of items to append to this StringValueMap.
     */
    StringValueMap.prototype.append = function (map) {
        if (map == null)
            return;
        for (var key in map) {
            var value = map[key];
            if (map.hasOwnProperty(key))
                this[key] = StringConverter_1.StringConverter.toNullableString(value);
        }
    };
    /** Removes all values from this StringValueMap. */
    StringValueMap.prototype.clear = function () {
        for (var key in this) {
            var value = this[key];
            if (this.hasOwnProperty(key))
                delete this[key];
        }
    };
    //TODO: key-value "mappings" or "pairs"?
    /**
     * Returns the number of key-value mappings present in this map.
     *
     * @returns the number of key-value pairs stored in this StringValueMap.
     */
    StringValueMap.prototype.length = function () {
        var count = 0;
        for (var key in this) {
            if (this.hasOwnProperty(key))
                count++;
        }
        return count;
    };
    /**
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key without any conversions or
     *                  all items (if 'key' is undefined or omitted).
     */
    StringValueMap.prototype.getAsObject = function (key) {
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
     * @param value     the value to set in this StringValueMap at the given 'key'.
     *                  If 'key' is omitted, then this StringValueMap will be set (cleared and
     *                  filled anew) using 'value'. In this case 'value' will be converted to
     *                  a map using "MapConverter.toMap(value)" and set to this StringValueMap.
     *
     * @see [[MapConverter.toMap]]
     */
    StringValueMap.prototype.setAsObject = function (key, value) {
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
     * Converts the item at the given key into a nullable string object using
     * [[StringConverter.toNullableString]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable string.
     *
     * @see [[StringConverter.toNullableString]]
     */
    StringValueMap.prototype.getAsNullableString = function (key) {
        var value = this.get(key);
        return StringConverter_1.StringConverter.toNullableString(value);
    };
    /**
     * Converts the item at the given key into a defaultable string object using
     * [[StringValueMap.getAsStringWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a string (or null as the default).
     *
     * @see [[getAsStringWithDefault]]
     */
    StringValueMap.prototype.getAsString = function (key) {
        return this.getAsStringWithDefault(key, null);
    };
    /**
     * Converts the item at the given key into a defaultable string object using
     * [[StringConverter.toStringWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a string or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[StringConverter.toStringWithDefault]]
     */
    StringValueMap.prototype.getAsStringWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return StringConverter_1.StringConverter.toStringWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given key into a nullable boolean object using
     * [[BooleanConverter.toNullableBoolean]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable boolean.
     *
     * @see [[BooleanConverter.toNullableBoolean]]
     */
    StringValueMap.prototype.getAsNullableBoolean = function (key) {
        var value = this.get(key);
        return BooleanConverter_1.BooleanConverter.toNullableBoolean(value);
    };
    /**
     * Converts the item at the given key into a defaultable boolean object using
     * [[StringValueMap.getAsBooleanWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a boolean (or false as the default).
     *
     * @see [[getAsBooleanWithDefault]]
     */
    StringValueMap.prototype.getAsBoolean = function (key) {
        return this.getAsBooleanWithDefault(key, false);
    };
    /**
     * Converts the item at the given key into a defaultable boolean object using
     * [[BooleanConverter.toBooleanWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a boolean or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[BooleanConverter.toBooleanWithDefault]]
     */
    StringValueMap.prototype.getAsBooleanWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return BooleanConverter_1.BooleanConverter.toBooleanWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given key into a nullable integer object using
     * [[IntegerConverter.toNullableInteger]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable integer.
     *
     * @see [[IntegerConverter.toNullableInteger]]
     */
    StringValueMap.prototype.getAsNullableInteger = function (key) {
        var value = this.get(key);
        return IntegerConverter_1.IntegerConverter.toNullableInteger(value);
    };
    /**
     * Converts the item at the given key into a defaultable integer object using
     * [[StringValueMap.getAsIntegerWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as an integer (or 0 as the default).
     *
     * @see [[getAsIntegerWithDefault]]
     */
    StringValueMap.prototype.getAsInteger = function (key) {
        return this.getAsIntegerWithDefault(key, 0);
    };
    /**
     * Converts the item at the given key into a defaultable integer object using
     * [[IntegerConverter.toIntegerWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as an integer or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[IntegerConverter.toIntegerWithDefault]]
     */
    StringValueMap.prototype.getAsIntegerWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return IntegerConverter_1.IntegerConverter.toIntegerWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given key into a nullable long object using
     * [[LongConverter.toNullableLong]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable long.
     *
     * @see [[LongConverter.toNullableLong]]
     */
    StringValueMap.prototype.getAsNullableLong = function (key) {
        var value = this.get(key);
        return LongConverter_1.LongConverter.toNullableLong(value);
    };
    /**
     * Converts the item at the given key into a defaultable long object using
     * [[StringValueMap.getAsLongWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a long (or 0 as the default).
     *
     * @see [[getAsLongWithDefault]]
     */
    StringValueMap.prototype.getAsLong = function (key) {
        return this.getAsLongWithDefault(key, 0);
    };
    /**
     * Converts the item at the given key into a defaultable long object using
     * [[LongConverter.toLongWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a long or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[LongConverter.toLongWithDefault]]
     */
    StringValueMap.prototype.getAsLongWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return LongConverter_1.LongConverter.toLongWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given key into a nullable float object using
     * [[FloatConverter.toNullableFloat]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable float.
     *
     * @see [[FloatConverter.toNullableFloat]]
     */
    StringValueMap.prototype.getAsNullableFloat = function (key) {
        var value = this.get(key);
        return FloatConverter_1.FloatConverter.toNullableFloat(value);
    };
    /**
     * Converts the item at the given key into a defaultable float object using
     * [[StringValueMap.getAsFloatWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a float (or 0 as the default).
     *
     * @see [[getAsFloatWithDefault]]
     */
    StringValueMap.prototype.getAsFloat = function (key) {
        return this.getAsFloatWithDefault(key, 0);
    };
    /**
     * Converts the item at the given key into a defaultable float object using
     * [[FloatConverter.toFloatWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a float or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[FloatConverter.toFloatWithDefault]]
     */
    StringValueMap.prototype.getAsFloatWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return FloatConverter_1.FloatConverter.toFloatWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given key into a nullable double object using
     * [[DoubleConverter.toNullableDouble]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable double.
     *
     * @see [[DoubleConverter.toNullableDouble]]
     */
    StringValueMap.prototype.getAsNullableDouble = function (key) {
        var value = this.get(key);
        return DoubleConverter_1.DoubleConverter.toNullableDouble(value);
    };
    /**
     * Converts the item at the given key into a defaultable double object using
     * [[StringValueMap.getAsDoubleWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a double (or 0 as the default).
     *
     * @see [[getAsDoubleWithDefault]]
     */
    StringValueMap.prototype.getAsDouble = function (key) {
        return this.getAsDoubleWithDefault(key, 0);
    };
    /**
     * Converts the item at the given key into a defaultable double object using
     * [[DoubleConverter.toDoubleWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a double or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[DoubleConverter.toDoubleWithDefault]]
     */
    StringValueMap.prototype.getAsDoubleWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return DoubleConverter_1.DoubleConverter.toDoubleWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given key into a nullable Datetime object using
     * [[DateTimeConverter.toNullableDateTime]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a nullable Datetime.
     *
     * @see [[DateTimeConverter.toNullableDateTime]]
     */
    StringValueMap.prototype.getAsNullableDateTime = function (key) {
        var value = this.get(key);
        return DateTimeConverter_1.DateTimeConverter.toNullableDateTime(value);
    };
    /**
     * Converts the item at the given key into a defaultable Datetime object using
     * [[StringValueMap.getAsDateTimeWithDefault]] and returns it.
     *
     * @param key   key of the item to retrieve.
     * @returns     the item at the given key as a Datetime (or null as the default).
     *
     * @see [[getAsDateTimeWithDefault]]
     */
    StringValueMap.prototype.getAsDateTime = function (key) {
        return this.getAsDateTimeWithDefault(key, null);
    };
    /**
     * Converts the item at the given key into a defaultable Datetime object using
     * [[DateTimeConverter.toDateTimeWithDefault]] and returns it.
     *
     * @param key               key of the item to retrieve.
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as a Datetime or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[DateTimeConverter.toDateTimeWithDefault]]
     */
    StringValueMap.prototype.getAsDateTimeWithDefault = function (key, defaultValue) {
        var value = this.get(key);
        return DateTimeConverter_1.DateTimeConverter.toDateTimeWithDefault(value, defaultValue);
    };
    /**
     * Converts the item at the given key into a nullable object of type 'type' using
     * [[TypeConverter.toNullableType]] and returns it.
     *
     * @param type      the TypeCode to be used in TypeConverter.toNullableType<T>(TypeCode, value);
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as a nullable object of type 'type'.
     *
     * @see [[TypeConverter.toNullableType]]
     */
    StringValueMap.prototype.getAsNullableType = function (type, key) {
        var value = this.get(key);
        return TypeConverter_1.TypeConverter.toNullableType(type, value);
    };
    /**
     * Converts the item at the given key into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     *
     * @param type      the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, null);
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as an object of type 'type' (or null as the default).
     *
     * @see [[getAsTypeWithDefault]]
     */
    StringValueMap.prototype.getAsType = function (type, key) {
        return this.getAsTypeWithDefault(type, key, null);
    };
    /**
     * Converts the item at the given key into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     *
     * @param type              the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, defaultValue);
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 the item at the given key as an object of type 'type' or the defaultValue,
     *                          if conversion is not possible.
     *
     * @see [[TypeConverter.toTypeWithDefault]]
     */
    StringValueMap.prototype.getAsTypeWithDefault = function (type, key, defaultValue) {
        var value = this.get(key);
        return TypeConverter_1.TypeConverter.toTypeWithDefault(type, value, defaultValue);
    };
    /**
     * Returns the item at the given key as an AnyValue object.
     *
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as an AnyValue object.
     *
     * @see [[AnyValue]]
     * @see [[AnyValue.constructor]]
     */
    StringValueMap.prototype.getAsValue = function (key) {
        var value = this.get(key);
        return new AnyValue_1.AnyValue(value);
    };
    /**
     * Returns the item at the given key as a nullable AnyValueArray object.
     *
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as a nullable AnyValueArray object (returns
     *                  null if the item at the given key is null).
     *
     * @see [[AnyValueArray]]
     * @see [[AnyValueArray.fromValue]]
     */
    StringValueMap.prototype.getAsNullableArray = function (key) {
        var value = this.get(key);
        return value != null ? AnyValueArray_1.AnyValueArray.fromValue(value) : null;
    };
    /**
     * Returns the item at the given key as an AnyValueArray object.
     *
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as an AnyValueArray object.
     *
     * @see [[AnyValueArray]]
     * @see [[AnyValueArray.fromValue]]
     */
    StringValueMap.prototype.getAsArray = function (key) {
        var value = this.get(key);
        return AnyValueArray_1.AnyValueArray.fromValue(value);
    };
    /**
     * Returns the item at the given key as an AnyValueArray object
     * (or 'defaultValue' if conversion is not possible).
     *
     * @param key           key of the item to retrieve.
     * @param defaultValue  value to use if the item at the given key cannot be converted
     *                      into an AnyValueArray.
     * @returns             the item at the given key as an AnyValueArray object or 'defaultValue'
     *                      (if conversion is not possible).
     *
     * @see [[AnyValueArray]]
     * @see [[getAsNullableArray]]
     */
    StringValueMap.prototype.getAsArrayWithDefault = function (key, defaultValue) {
        var result = this.getAsNullableArray(key);
        return result != null ? result : defaultValue;
    };
    /**
     * Returns the item at the given key as a nullable AnyValueMap object.
     *
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as a nullable AnyValueMap object (returns
     *                  null if the item at the given key is null).
     *
     * @see [[fromValue]]
     */
    StringValueMap.prototype.getAsNullableMap = function (key) {
        var value = this.get(key);
        return value != null ? AnyValueMap_1.AnyValueMap.fromValue(value) : null;
    };
    /**
     * Returns the item at the given key as an AnyValueMap object.
     *
     * @param key       key of the item to retrieve.
     * @returns         the item at the given key as an AnyValueMap object.
     *
     * @see [[fromValue]]
     */
    StringValueMap.prototype.getAsMap = function (key) {
        var value = this.get(key);
        return AnyValueMap_1.AnyValueMap.fromValue(value);
    };
    /**
     * Returns the item at the given key as an AnyValueMap object
     * (or 'defaultValue' if conversion is not possible).
     *
     * @param key           key of the item to retrieve.
     * @param defaultValue  value to use if the item at the given key cannot be converted
     *                      into an AnyValueMap.
     * @returns             the item at the given key as an AnyValueMap object or 'defaultValue'
     *                      (if conversion is not possible).
     *
     * @see [[getAsNullableMap]]
     */
    StringValueMap.prototype.getAsMapWithDefault = function (key, defaultValue) {
        var result = this.getAsNullableMap(key);
        return result != null ? result : defaultValue;
    };
    /**
     * @returns this StringValueMap as a semicolon-separated values string.
     *
     * Example: "key1=value1;key2;key3=value3".
     */
    StringValueMap.prototype.toString = function () {
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
    StringValueMap.prototype.clone = function () {
        return new StringValueMap(this);
    };
    /**
     * Static method for creating a StringValueMap from a value.
     *
     * @param value     the value to initialize the new StringValueMap with.
     * @returns         the StringValueMap that was created and initialized with 'value'.
     *
     * @see [[StringValueMap]]
     */
    StringValueMap.fromValue = function (value) {
        return new StringValueMap(value);
    };
    /**
     * Static method for creating a StringValueMap from the tuples that are passed as parameters.
     *
     * @param tuples    the key-value tuple parameters to initialize the new StringValueMap with.
     * @returns         the StringValueMap created and filled by the tuples provided.
     *
     * @see [[fromTuplesArray]]
     */
    StringValueMap.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        return StringValueMap.fromTuplesArray(tuples);
    };
    /**
     * Static method for creating a StringValueMap from an array of tuples.
     *
     * @param tuples    the key-value tuples array to initialize the new StringValueMap with.
     * @returns         the StringValueMap created and filled by the 'tuples' array provided.
     */
    StringValueMap.fromTuplesArray = function (tuples) {
        var result = new StringValueMap();
        if (tuples == null || tuples.length == 0)
            return result;
        for (var index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length)
                break;
            var name_1 = StringConverter_1.StringConverter.toString(tuples[index]);
            var value = StringConverter_1.StringConverter.toNullableString(tuples[index + 1]);
            result[name_1] = value;
        }
        return result;
    };
    /**
     * Static method for creating StringValueMaps from semicolon-separated values strings.
     *
     * @param line      semicolon-separated values string containing keys and values.
     *                  Example string: "key1=value1;key2;key3=value3".
     * @returns         the StringValueMap created, using the key-value pairs in 'line'.
     */
    StringValueMap.fromString = function (line) {
        var result = new StringValueMap();
        if (line == null || line.length == 0)
            return result;
        // Todo: User tokenizer / decoder
        var tokens = line.split(";");
        for (var index = 0; index < tokens.length; index++) {
            var token = tokens[index];
            if (token.length == 0)
                continue;
            var pos = token.indexOf('=');
            var key = pos > 0 ? token.substring(0, pos).trim() : token.trim();
            var value = pos > 0 ? token.substring(pos + 1).trim() : null;
            result.put(key, value);
        }
        return result;
    };
    /**
     * Static method for creating a StringValueMap using the maps passed as parameters.
     *
     * @param maps  the maps passed to this method to create a StringValueMap with.
     * @returns     the StringValueMap created.
     */
    StringValueMap.fromMaps = function () {
        var maps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            maps[_i] = arguments[_i];
        }
        var result = new StringValueMap();
        if (maps != null && maps.length > 0) {
            for (var index = 0; index < maps.length; index++)
                result.append(maps[index]);
        }
        return result;
    };
    return StringValueMap;
}());
exports.StringValueMap = StringValueMap;
//# sourceMappingURL=StringValueMap.js.map