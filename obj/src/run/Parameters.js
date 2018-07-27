"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
var AnyValueMap_1 = require("../data/AnyValueMap");
var JsonConverter_1 = require("../convert/JsonConverter");
var RecursiveObjectReader_1 = require("../reflect/RecursiveObjectReader");
var RecursiveObjectWriter_1 = require("../reflect/RecursiveObjectWriter");
var ObjectWriter_1 = require("../reflect/ObjectWriter");
/**
 * Parameters represent a hierarchical map that uses complex keys with dot-notation
 * to store and access various data.
 *
 * Examples of key that can be used to store parameters:
 *
 * - Parameter-group-1.Sub-param-group-1-1.Param-1-1-1
 * - Parameter-group-1.Sub-param-group-1-2.Param-1-2-1
 * - Parameter-group-2.Sub-param-group-1.Param-2-1-1
 *
 * All keys stored in the map are case-insensitive.
 *
 * Parameters can be used to with classes that implement [[IParameterized]].
 *
 * @see [[IParameterized]]
 * @see [[AnyValueMap]]
 */
var Parameters = /** @class */ (function (_super) {
    __extends(Parameters, _super);
    /**
     * Creates a new Parameters object from the map passed.
     *
     * @param map 	parameters to store in this object. Defaults to null.
     *
     * @see [[AnyValueMap.constructor]]
     */
    function Parameters(map) {
        if (map === void 0) { map = null; }
        return _super.call(this, map) || this;
    }
    /**
     * @param key 	the complex key of the parameter that is to be retrieved.
     * 				The key can be complex with dot-notation, for example
     * 				"Parameter-group-1.Sub-param-group-1-1.Param-1-1-1". In this
     * 				case, RecursiveObjectReader's [[RecursiveObjectReader.getProperty getProperty]]
     * 				method will be used.
     * @returns		the parameter stored by the given key.
     *
     * @see [[RecursiveObjectReader.getProperty]]
     */
    Parameters.prototype.get = function (key) {
        if (key == null)
            return null;
        else if (key.indexOf('.') > 0)
            return RecursiveObjectReader_1.RecursiveObjectReader.getProperty(this, key);
        else
            return _super.prototype.get.call(this, key);
    };
    /**
     * @param key 	the complex key of the parameter that is to be stored.
     * 				The key can be complex with dot-notation, for example
     * 				"Parameter-group-1.Sub-param-group-1-1.Param-1-1-1". In this
     * 				case, RecursiveObjectWriter's [[RecursiveObjectWriter.setProperty setProperty]]
     * 				method will be used.
     * @param value
     * @returns		the value that was stored by the given key.
     *
     * @see [[RecursiveObjectWriter.setProperty]]
     */
    Parameters.prototype.put = function (key, value) {
        if (key == null)
            return null;
        else if (key.indexOf('.') > 0)
            RecursiveObjectWriter_1.RecursiveObjectWriter.setProperty(this, key, value);
        else
            _super.prototype.put.call(this, key, value);
        return value;
    };
    /**
     * @param key   key of the parameter to retrieve.
     * @returns     the parameter with the given key as a nullable Parameters object.
     * 				Null is returned if no parameters are found by the given key.
     *
     * @see [[AnyValueMap.getAsNullableMap]]
     */
    Parameters.prototype.getAsNullableParameters = function (key) {
        var value = this.getAsNullableMap(key);
        return value != null ? new Parameters(value) : null;
    };
    /**
     * @param key   key of the parameter to retrieve.
     * @returns     the parameter with the given key as a Parameters object.
     *
     * @see [[AnyValueMap.getAsMap]]
     */
    Parameters.prototype.getAsParameters = function (key) {
        var value = this.getAsMap(key);
        return new Parameters(value);
    };
    /**
     * @param key               key of the parameter to retrieve.
     * @param defaultValue      the value to return if no parameters are found by the given key.
     * @returns                 the parameter with the given key or the
     *                          defaultValue (if no parameters are found by the given key
     * 							and null is returned by [[getAsNullableParameters]]).
     *
     * @see [[getAsNullableParameters]]
     */
    Parameters.prototype.getAsParametersWithDefault = function (key, defaultValue) {
        var result = this.getAsNullableParameters(key);
        return result != null ? result : defaultValue;
    };
    /**
     * Checks whether or not this Parameter's object contains a parameter with the given key.
     *
     * @param key 	the complex key of the parameter that is to be searched for.
     * 				The key can be complex with dot-notation, for example
     * 				"Parameter-group-1.Sub-param-group-1-1.Param-1-1-1". In this
     * 				case, RecursiveObjectReader's [[RecursiveObjectReader.hasProperty hasProperty]]
     * 				method will be used.
     *
     * @see [[RecursiveObjectReader.hasProperty hasProperty]]
     */
    Parameters.prototype.containsKey = function (key) {
        return RecursiveObjectReader_1.RecursiveObjectReader.hasProperty(this, key.toString());
    };
    /**
     * Overrides the parameters stored in this object with the ones in
     * 'parameters'. If a parameter is already set in this Parameters object,
     * it will be overwritten by the value in 'parameters' with the same key.
     *
     * @param parameters		the parameters to override the parameters of this object with.
     * @param recursive			whether or not the parameters need to be set recursively.
     * 							Defaults to false.
     * @returns					this Parameters object with overridden parameters.
     *
     * @see [[setDefaults]]
     */
    Parameters.prototype.override = function (parameters, recursive) {
        if (recursive === void 0) { recursive = false; }
        var result = new Parameters();
        if (recursive) {
            RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(result, this);
            RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(result, parameters);
        }
        else {
            ObjectWriter_1.ObjectWriter.setProperties(result, this);
            ObjectWriter_1.ObjectWriter.setProperties(result, parameters);
        }
        return result;
    };
    /**
     * Sets the defaults for this Parameters object, based on the
     * default parameters passed in 'defaultParameters'. If a
     * parameter is already set in this Parameters object, it will not be
     * overwritten by the default value in 'defaultParameters' with the same key.
     *
     * @param defaultParameters		the default parameters to use.
     * @param recursive				whether or not the defaults need to be set recursively.
     * 								Defaults to false.
     * @returns						this Parameters object with the newly set defaults.
     *
     * @see [[override]]
     */
    Parameters.prototype.setDefaults = function (defaultParameters, recursive) {
        if (recursive === void 0) { recursive = false; }
        var result = new Parameters();
        if (recursive) {
            RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(result, defaultParameters);
            RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(result, this);
        }
        else {
            ObjectWriter_1.ObjectWriter.setProperties(result, defaultParameters);
            ObjectWriter_1.ObjectWriter.setProperties(result, this);
        }
        return result;
    };
    /**
     * Copies the parameters passed in 'value' to this Parameters object using
     * [[RecursiveObjectWriter.copyProperties]]. Parameters are read from 'value'
     * using [[ObjectReader.getProperties]] recursively (for maps), which means
     * that they can be in the form of a map or an array.
     *
     * @param value 	the parameters to copy to this Parameters object.
     *
     * @see [[RecursiveObjectWriter.copyProperties]]
     * @see [[RecursiveObjectReader.performGetProperties]]
     * @see [[ObjectReader.getProperties]]
     */
    Parameters.prototype.assignTo = function (value) {
        if (value == null)
            return;
        RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(value, this);
    };
    /**
     * Picks select parameters from this Parameters object using the keys passed as 'paths'.
     *
     * @param paths 	the keys passed to this method, whose data must be included in the
     * 					Parameters object that will be returned.
     *
     * @returns a Parameters object that contains only the selected parameters.
     */
    Parameters.prototype.pick = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        var result = new Parameters();
        for (var index = 0; index < paths.length; index++) {
            var path = paths[index];
            if (this.containsKey(path))
                result.put(path, this.get(path));
        }
        return result;
    };
    /**
     * Omits select parameters from this Parameters object using the keys passed as 'paths'.
     *
     * @param paths 	the keys passed to this method, whose data must be excluded from the
     * 					Parameters object that will be returned.
     *
     * @returns this Parameters object's parameters with the given parameters omitted.
     */
    Parameters.prototype.omit = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        var result = new Parameters(this);
        for (var index = 0; index < paths.length; index++) {
            var path = paths[index];
            result.remove(path);
        }
        return result;
    };
    /**
     * Convert this Parameters object into a JSON string using [[JsonConverter.toJson]].
     *
     * @returns		this Parameters object as a JSON string.
     *
     * @see [[JsonConverter.toJson]]
     */
    Parameters.prototype.toJson = function () {
        return JsonConverter_1.JsonConverter.toJson(this);
    };
    /**
     * Static method that creates a Parameters object based on the values that are stored
     * in the map passed as 'value'.
     *
     * @param value		parameters in the form of a map.
     * @returns			generated Parameters.
     *
     * @see [[AnyValueMap.constructor]]
     */
    Parameters.fromValue = function (value) {
        return new Parameters(value);
    };
    /**
     * Static method that creates a Parameters object using the tuples passed to the method.
     *
     * @param tuples	the tuples to convert to a Parameters object.
     * @returns			the generated Parameters.
     *
     * @see [[AnyValueMap.fromTuplesArray]]
     */
    Parameters.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        var map = AnyValueMap_1.AnyValueMap.fromTuples.apply(AnyValueMap_1.AnyValueMap, tuples);
        return new Parameters(map);
    };
    /**
     * Static method that can merge two or more Parameters into one.
     *
     * @param configs 	the Parameters that are to be merged into one Parameters object.
     * 					The order in which the Parameters are passed to this method is important,
     * 					as it regulates which values to keep in the case of identical complex keys
     * 					(the Parameters passed later/last override the values of other Parameters
     * 					with the same key).
     * @returns			merged Parameters.
     *
     * @see [[AnyValueMap.fromMaps]]
     */
    Parameters.mergeParams = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        var map = AnyValueMap_1.AnyValueMap.fromMaps.apply(AnyValueMap_1.AnyValueMap, parameters);
        return new Parameters(map);
    };
    /**
     * Static method that can convert a JSON string to a Parameters object using
     * [[JsonConverter.toNullableMap]].
     *
     * @param json 	the JSON string containing parameters.
     * @returns		the Parameters generated.
     *
     * @see [[JsonConverter.toNullableMap]]
     */
    Parameters.fromJson = function (json) {
        var map = JsonConverter_1.JsonConverter.toNullableMap(json);
        return new Parameters(map);
    };
    /**
     * Static method that can convert a ConfigParams object into a Parameters object.
     *
     * @param config 	the ConfigParams that contain parameters.
     * @returns			the Parameters generated.
     *
     * @see [[ConfigParams]]
     */
    Parameters.fromConfig = function (config) {
        var result = new Parameters();
        if (config == null)
            return result;
        for (var key in config) {
            if (config.hasOwnProperty(key))
                result.put(key, config[key]);
        }
        return result;
    };
    return Parameters;
}(AnyValueMap_1.AnyValueMap));
exports.Parameters = Parameters;
//# sourceMappingURL=Parameters.js.map