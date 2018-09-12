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
/** @module config */
/** @hidden */
var _ = require('lodash');
var StringValueMap_1 = require("../data/StringValueMap");
var RecursiveObjectReader_1 = require("../reflect/RecursiveObjectReader");
/**
 * ConfigParams represent a hierarchical map that contains configuration parameters and
 * uses complex keys with dot-notation to store simple string values.
 *
 * Provides hierarchical organization of various configuration parameters using sections,
 * subsections, and keys.
 *
 * Examples of values, stored in configuration parameters:
 *
 * - Section-1.Subsection-1-1.Key-1-1-1=123
 * - Section-1.Subsection-1-2.Key-1-2-1="ABC"
 * - Section-2.Subsection-1.Key-2-1-1="2016-09-16T00:00:00.00Z"
 *
 * Configuration parameters support getting and adding sections from the map.
 *
 * Also, configuration parameters may come in the form of a parameterized string:
 * Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z
 *
 * All keys stored in the map are case-insensitive.
 *
 * ConfigParams can be used to configure objects of classes that implement [[IConfigurable]].
 *
 * @see [[IConfigurable]]
 * @see [[StringValueMap]]
 *
 * ### Examples ###
 *
 * Example usage of the ConfigParams class and its methods:
 *
 *     public MyMethod () {
 *         let config = ConfigParams.fromTuples(
 *            "Section1.Key1", "Value1",
 *            "Section1.Key2", "Value2",
 *            "Section1.Key3", "Value3"
 *         );
 *
 *         ...
 *
 *         let value = config.get("Section1.Key1");
 *
 *         ...
 *
 *         MyDataConfigClass myConfig = MyDataConfigClass.fromConfig(config);
 *         //or
 *         MyDataConfigClass myConfig = new MyDataConfigClass(config);
 *     }
 */
var ConfigParams = /** @class */ (function (_super) {
    __extends(ConfigParams, _super);
    /**
     * Creates a new ConfigParams object from an array of tuples, a parameterized string
     * (Example: "Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z"), or from an object with
     * configuration parameters stored as properties.
     *
     * @param values 	configuration parameters to store in this object. Defaults to null.
     *
     * @see [[StringValueMap.constructor]]
     */
    function ConfigParams(values) {
        if (values === void 0) { values = null; }
        return _super.call(this, values) || this;
    }
    /**
     * @returns the names of all sections that are present in this object's complex keys.
     *
     * Example key "Section-1.Subsection-1-1.Key-1-1-1" contains the section named "Section-1".
     */
    ConfigParams.prototype.getSectionNames = function () {
        var sections = [];
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                var pos = key.indexOf('.');
                var section = key;
                if (pos > 0)
                    section = key.substring(0, pos);
                // Perform case sensitive search
                var found = false;
                for (var index = 0; index < sections.length; index++) {
                    if (section == sections[index]) {
                        found = true;
                        break;
                    }
                }
                if (!found)
                    sections.push(section);
            }
        }
        return sections;
    };
    /**
     * @param section	name of the section to retrieve configuration parameters from.
     * @returns 		all configuration parameters that belong to the section named 'section'.
     *
     * Example key "Section-1.Subsection-1-1.Key-1-1-1" contains the section named "Section-1".
     * Calling <code>getSection("Section-1")</code> would return a ConfigParams object containing
     * the key "Subsection-1-1.Key-1-1-1"
     */
    ConfigParams.prototype.getSection = function (section) {
        var result = new ConfigParams();
        var prefix = section + ".";
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                // Prevents exception on the next line
                if (key.length < prefix.length)
                    continue;
                // Perform case sensitive match
                var keyPrefix = key.substring(0, prefix.length);
                if (keyPrefix == prefix) {
                    var name_1 = key.substring(prefix.length);
                    result.put(name_1, this[key]);
                }
            }
        }
        return result;
    };
    /**
     * Adds 'sectionParams' to this ConfigParams object under the section named 'section'.
     *
     * @param section 			name of the section, under which 'sectionParams' is to be added.
     * 							The keys of 'sectionParams' will be renamed to "(section).<key's name>",
     * 							when added to this ConfigParams object.
     * @param sectionParams 	ConfigParams that are to be added under the section named 'section'.
     */
    ConfigParams.prototype.addSection = function (section, sectionParams) {
        if (section == null)
            throw new Error("Section name cannot be null");
        if (sectionParams != null) {
            for (var key in sectionParams) {
                if (sectionParams.hasOwnProperty(key)) {
                    var name_2 = key;
                    if (name_2.length > 0 && section.length > 0)
                        name_2 = section + "." + name_2;
                    else if (name_2.length == 0)
                        name_2 = section;
                    var value = sectionParams[key];
                    this.put(name_2, value);
                }
            }
        }
    };
    /**
     * Overrides the configuration parameters stored in this object with the ones in
     * 'configParams'. If a configuration is already set in this ConfigParams object,
     * it will be overwritten by the value in 'configParams' with the same key.
     *
     * @param configParams		configuration parameters to override the
     * 							parameters of this object with.
     * @returns					ConfigParams object with overridden parameters.
     *
     * @see [[setDefaults]]
     */
    ConfigParams.prototype.override = function (configParams) {
        var map = StringValueMap_1.StringValueMap.fromMaps(this, configParams);
        return new ConfigParams(map);
    };
    /**
     * Sets the default configurations for this ConfigParams object, based on the
     * default configuration parameters passed in 'defaultConfigParams'. If a
     * configuration is already set in this ConfigParams object, it will not be
     * overwritten by the default value in 'defaultConfigParams' with the same key.
     *
     * @param defaultConfigParams	the default configuration parameters to use.
     * @returns						this ConfigParams object with the newly set defaults.
     *
     * @see [[override]]
     */
    ConfigParams.prototype.setDefaults = function (defaultConfigParams) {
        var map = StringValueMap_1.StringValueMap.fromMaps(defaultConfigParams, this);
        return new ConfigParams(map);
    };
    /**
     * Static method that creates a ConfigParams object based on the values that are stored
     * in the 'value' object's properties.
     *
     * @param value		configuration parameters in the form of an object with properties.
     * @returns			generated ConfigParams.
     *
     * @see [[RecursiveObjectReader.getProperties]]
     */
    ConfigParams.fromValue = function (value) {
        var map = RecursiveObjectReader_1.RecursiveObjectReader.getProperties(value);
        return new ConfigParams(map);
    };
    /**
     * Static method that creates a ConfigParams object using the tuples passed to the method.
     *
     * @param tuples	the tuples to convert to a ConfigParams object.
     * @returns			the generated ConfigParams.
     *
     * @see [[StringValueMap.fromTuplesArray]]
     */
    ConfigParams.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        var map = StringValueMap_1.StringValueMap.fromTuplesArray(tuples);
        return new ConfigParams(map);
    };
    /**
     * Static method that creates a ConfigParams object from a parameterized string.
     *
     * @param line 		configuration parameters in the form of a parameterized string.
     * 					Example: "Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z"
     * @returns			generated ConfigParams.
     *
     * @see [[StringValueMap.fromString]]
     */
    ConfigParams.fromString = function (line) {
        var map = StringValueMap_1.StringValueMap.fromString(line);
        return new ConfigParams(map);
    };
    /**
     * Static method that can merge two or more ConfigParams into one.
     *
     * @param configs 	the ConfigParams that are to be merged into one ConfigParams object.
     * 					The order in which the ConfigParams are passed to this method is important,
     * 					as it regulates which values to keep in the case of identical complex keys
     * 					(the ConfigParams passed later/last override the values of other ConfigParams
     * 					with the same key).
     * @returns			merged ConfigParams.
     *
     * @see [[StringValueMap.fromMaps]]
     */
    ConfigParams.mergeConfigs = function () {
        var configs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            configs[_i] = arguments[_i];
        }
        var map = StringValueMap_1.StringValueMap.fromMaps.apply(StringValueMap_1.StringValueMap, configs);
        return new ConfigParams(map);
    };
    return ConfigParams;
}(StringValueMap_1.StringValueMap));
exports.ConfigParams = ConfigParams;
//# sourceMappingURL=ConfigParams.js.map