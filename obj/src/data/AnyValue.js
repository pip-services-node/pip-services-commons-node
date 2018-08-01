"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeConverter_1 = require("../convert/TypeConverter");
var StringConverter_1 = require("../convert/StringConverter");
var BooleanConverter_1 = require("../convert/BooleanConverter");
var IntegerConverter_1 = require("../convert/IntegerConverter");
var LongConverter_1 = require("../convert/LongConverter");
var FloatConverter_1 = require("../convert/FloatConverter");
var DoubleConverter_1 = require("../convert/DoubleConverter");
var DateTimeConverter_1 = require("../convert/DateTimeConverter");
var AnyValueArray_1 = require("./AnyValueArray");
var AnyValueMap_1 = require("./AnyValueMap");
/**
 * Class that allows for usage of abstract, portable data types. Stores a value in its
 * 'value' field, which can be retrieved in various ways with the help of numerous converters.
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
var AnyValue = /** @class */ (function () {
    /**
     * Creates a new instance and sets its 'value' field to the value passed
     * as a parameter. If 'value' is omitted, it can be set later on using
     * [[setAsObject]].
     *
     * @param value     value to store in this object's 'value' field. If this
     *                  parameter is an instance of AnyValue, its 'value' field will
     *                  be stored instead.
     */
    function AnyValue(value) {
        if (value === void 0) { value = null; }
        if (value instanceof AnyValue)
            this.value = value.value;
        else
            this.value = value;
    }
    /**
     * @returns this object's 'value' field as a TypeCode.
     *
     * @see [[TypeConverter.toTypeCode]]
     */
    AnyValue.prototype.getTypeCode = function () {
        return TypeConverter_1.TypeConverter.toTypeCode(this.value);
    };
    /** @returns this object's 'value' field without any conversions. */
    AnyValue.prototype.getAsObject = function () {
        return this.value;
    };
    /**
     * @param value     value to store in this object's 'value' field. If this
     *                  parameter is an instance of AnyValue, its 'value' field will
     *                  be stored instead.
     */
    AnyValue.prototype.setAsObject = function (value) {
        if (value instanceof AnyValue)
            this.value = value.value;
        else
            this.value = value;
    };
    /**
     * @returns this object's 'value' field as a nullable string.
     *
     * @see [[StringConverter.toNullableString]]
     */
    AnyValue.prototype.getAsNullableString = function () {
        return StringConverter_1.StringConverter.toNullableString(this.value);
    };
    /**
     * @returns this object's 'value' field as a string (or null as the default).
     *
     * @see [[getAsStringWithDefault]]
     */
    AnyValue.prototype.getAsString = function () {
        return this.getAsStringWithDefault(null);
    };
    /**
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as a string or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[StringConverter.toStringWithDefault]]
     */
    AnyValue.prototype.getAsStringWithDefault = function (defaultValue) {
        return StringConverter_1.StringConverter.toStringWithDefault(this.value, defaultValue);
    };
    /**
     * @returns this object's 'value' field as a nullable boolean.
     *
     * @see [[BooleanConverter.toNullableBoolean]]
     */
    AnyValue.prototype.getAsNullableBoolean = function () {
        return BooleanConverter_1.BooleanConverter.toNullableBoolean(this.value);
    };
    /**
     * @returns this object's 'value' field as a boolean (or false as the default).
     *
     * @see [[getAsBooleanWithDefault]]
     */
    AnyValue.prototype.getAsBoolean = function () {
        return this.getAsBooleanWithDefault(false);
    };
    /**
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as a boolean or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[BooleanConverter.toBooleanWithDefault]]
     */
    AnyValue.prototype.getAsBooleanWithDefault = function (defaultValue) {
        return BooleanConverter_1.BooleanConverter.toBooleanWithDefault(this.value, defaultValue);
    };
    /**
     * @returns this object's 'value' field as a nullable integer.
     *
     * @see [[IntegerConverter.toNullableInteger]]
     */
    AnyValue.prototype.getAsNullableInteger = function () {
        return IntegerConverter_1.IntegerConverter.toNullableInteger(this.value);
    };
    /**
     * @returns this object's 'value' field as an integer (or 0 as the default).
     *
     * @see [[getAsIntegerWithDefault]]
     */
    AnyValue.prototype.getAsInteger = function () {
        return this.getAsIntegerWithDefault(0);
    };
    /**
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as an integer or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[IntegerConverter.toIntegerWithDefault]]
     */
    AnyValue.prototype.getAsIntegerWithDefault = function (defaultValue) {
        return IntegerConverter_1.IntegerConverter.toIntegerWithDefault(this.value, defaultValue);
    };
    /**
     * @returns this object's 'value' field as a nullable long.
     *
     * @see [[LongConverter.toNullableLong]]
     */
    AnyValue.prototype.getAsNullableLong = function () {
        return LongConverter_1.LongConverter.toNullableLong(this.value);
    };
    /**
     * @returns this object's 'value' field as a long (or 0 as the default).
     *
     * @see [[getAsLongWithDefault]]
     */
    AnyValue.prototype.getAsLong = function () {
        return this.getAsLongWithDefault(0);
    };
    /**
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as a long or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[LongConverter.toLongWithDefault]]
     */
    AnyValue.prototype.getAsLongWithDefault = function (defaultValue) {
        return LongConverter_1.LongConverter.toLongWithDefault(this.value, defaultValue);
    };
    /**
     * @returns this object's 'value' field as a nullable float.
     *
     * @see [[FloatConverter.toNullableFloat]]
     */
    AnyValue.prototype.getAsNullableFloat = function () {
        return FloatConverter_1.FloatConverter.toNullableFloat(this.value);
    };
    /**
     * @returns this object's 'value' field as a float (or 0 as the default).
     *
     * @see [[getAsFloatWithDefault]]
     */
    AnyValue.prototype.getAsFloat = function () {
        return this.getAsFloatWithDefault(0);
    };
    /**
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as a float or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[FloatConverter.toFloatWithDefault]]
     */
    AnyValue.prototype.getAsFloatWithDefault = function (defaultValue) {
        return FloatConverter_1.FloatConverter.toFloatWithDefault(this.value, defaultValue);
    };
    /**
     * @returns this object's 'value' field as a nullable double.
     *
     * @see [[DoubleConverter.toNullableDouble]]
     */
    AnyValue.prototype.getAsNullableDouble = function () {
        return DoubleConverter_1.DoubleConverter.toNullableDouble(this.value);
    };
    /**
     * @returns this object's 'value' field as a double (or 0 as the default).
     *
     * @see [[getAsDoubleWithDefault]]
     */
    AnyValue.prototype.getAsDouble = function () {
        return this.getAsDoubleWithDefault(0);
    };
    /**
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as a double or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[DoubleConverter.toDoubleWithDefault]]
     */
    AnyValue.prototype.getAsDoubleWithDefault = function (defaultValue) {
        return DoubleConverter_1.DoubleConverter.toDoubleWithDefault(this.value, defaultValue);
    };
    /**
     * @returns this object's 'value' field as a nullable Datetime.
     *
     * @see [[DateTimeConverter.toNullableDateTime]]
     */
    AnyValue.prototype.getAsNullableDateTime = function () {
        return DateTimeConverter_1.DateTimeConverter.toNullableDateTime(this.value);
    };
    /**
     * @returns this object's 'value' field as a Datetime (or null as the default).
     *
     * @see [[getAsDateTimeWithDefault]]
     */
    AnyValue.prototype.getAsDateTime = function () {
        return this.getAsDateTimeWithDefault(null);
    };
    /**
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as a Datetime or the
     *                          defaultValue (if conversion is not possible).
     *
     * @see [[DateTimeConverter.toDateTimeWithDefault]]
     */
    AnyValue.prototype.getAsDateTimeWithDefault = function (defaultValue) {
        return DateTimeConverter_1.DateTimeConverter.toDateTimeWithDefault(this.value, defaultValue);
    };
    /**
     * Converts this object's 'value' field into a nullable object of type 'type' using
     * [[TypeConverter.toNullableType]] and returns it.
     *
     * @param type      the TypeCode to be used in TypeConverter.toNullableType<T>(TypeCode, value);
     * @returns this object's 'value' field as a nullable object of type 'type'.
     *
     * @see [[TypeConverter.toNullableType]]
     */
    AnyValue.prototype.getAsNullableType = function (type) {
        return TypeConverter_1.TypeConverter.toNullableType(type, this.value);
    };
    /**
     * Converts this object's 'value' field into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     *
     * @param type      the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, null);
     * @returns this object's 'value' field as an object of type 'type' (or null as the default).
     *
     * @see [[getAsTypeWithDefault]]
     */
    AnyValue.prototype.getAsType = function (type) {
        return this.getAsTypeWithDefault(type, null);
    };
    /**
     * Converts this object's 'value' field into an object of type 'type' using
     * [[TypeConverter.toTypeWithDefault]] and returns it.
     *
     * @param type              the TypeCode to be used in TypeConverter.toTypeWithDefault<T>(TypeCode, value, defaultValue);
     * @param defaultValue      value to return if conversion is not possible.
     * @returns                 this object's 'value' field as an object of type 'type' or the defaultValue,
     *                          if conversion is not possible.
     *
     * @see [[TypeConverter.toTypeWithDefault]]
     */
    AnyValue.prototype.getAsTypeWithDefault = function (type, defaultValue) {
        return TypeConverter_1.TypeConverter.toTypeWithDefault(type, this.value, defaultValue);
    };
    /**
     * @returns this object's 'value' field as an AnyValueArray.
     *
     * @see [[AnyValueArray.fromValue]]
     */
    AnyValue.prototype.getAsArray = function () {
        return AnyValueArray_1.AnyValueArray.fromValue(this.value);
    };
    /**
     * @returns this object's 'value' field as an AnyValueMap.
     *
     * @see [[AnyValueMap.fromValue]]
     */
    AnyValue.prototype.getAsMap = function () {
        return AnyValueMap_1.AnyValueMap.fromValue(this.value);
    };
    /**
     * Checks whether or not the parameter passed as 'obj' is equal to this object's
     * 'value' field.
     *
     * @param obj   the object to check against this object's 'value' field. If 'obj'
     *              is an instance of AnyValue, its 'value' field will be used.
     * @returns     whether or not this object's 'value' field and 'obj' are equal.
     *              If both items are null, true will be returned.
     */
    AnyValue.prototype.equals = function (obj) {
        if (obj == null && this.value == null)
            return true;
        if (obj == null || this.value == null)
            return false;
        if (obj instanceof AnyValue)
            obj = obj.value;
        var strThisValue = StringConverter_1.StringConverter.toString(this.value);
        var strValue = StringConverter_1.StringConverter.toString(obj);
        if (strThisValue == null && strValue == null)
            return true;
        if (strThisValue == null || strValue == null)
            return false;
        return strThisValue == strValue;
    };
    /**
     * Checks whether or not the parameter passed as 'obj' is equal to this object's
     * 'value' field after both are converted to the type passed as 'type' using
     * [[TypeConverter.toType]].
     *
     * @param type  the TypeCode to use in TypeConverter.toType<T>(TypeCode, value).
     * @param obj   the object to check against this object's 'value' field after
     *              conversion. If 'obj' is an instance of AnyValue, then its 'value'
     *              field will be used.
     * @returns     whether or not this object's 'value' field and 'obj' are equal
     *              as objects of type 'type'. If both items (or their converted versions)
     *              are null, true will be returned.
     *
     * @see [[TypeConverter.toType]]
     */
    AnyValue.prototype.equalsAsType = function (type, obj) {
        if (obj == null && this.value == null)
            return true;
        if (obj == null || this.value == null)
            return false;
        if (obj instanceof AnyValue)
            obj = obj.value;
        var typedThisValue = TypeConverter_1.TypeConverter.toType(type, this.value);
        var typedValue = TypeConverter_1.TypeConverter.toType(type, obj);
        if (typedThisValue == null && typedValue == null)
            return true;
        if (typedThisValue == null || typedValue == null)
            return false;
        return typedThisValue == typedValue;
    };
    /** @returns a clone of this object. */
    AnyValue.prototype.clone = function () {
        return new AnyValue(this.value);
    };
    /**
     * @returns this object's 'value' field as a string value using [[StringConverter.toString]].
     *
     * @see [[StringConverter.toString]]
     */
    AnyValue.prototype.toString = function () {
        return StringConverter_1.StringConverter.toString(this.value);
    };
    /** @returns the hash code of this object's 'value' field. 0 is returned if the 'value' field is null. */
    AnyValue.prototype.hashCode = function () {
        return this.value != null ? this.value.hashCode() : 0;
    };
    return AnyValue;
}());
exports.AnyValue = AnyValue;
//# sourceMappingURL=AnyValue.js.map