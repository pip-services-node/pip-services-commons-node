"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module config */
let _ = require('lodash');
const StringValueMap_1 = require("../data/StringValueMap");
const RecursiveObjectReader_1 = require("../reflect/RecursiveObjectReader");
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
 */
class ConfigParams extends StringValueMap_1.StringValueMap {
    /**
     * Creates a new ConfigParams object from an array of tuples, a parameterized string
     * (Example: "Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z"), or from an object with
     * configuration parameters stored as properties.
     *
     * @param values 	configuration parameters to store in this object. Defaults to null.
     *
     * @see [[StringValueMap.StringValueMap]]
     */
    constructor(values = null) {
        super(values);
    }
    /**
     * @returns the names of all sections that are present in this object's complex keys.
     *
     * Example key "Section-1.Subsection-1-1.Key-1-1-1" contains the section named "Section-1".
     */
    getSectionNames() {
        let sections = [];
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                let pos = key.indexOf('.');
                let section = key;
                if (pos > 0)
                    section = key.substring(0, pos);
                // Perform case sensitive search
                let found = false;
                for (let index = 0; index < sections.length; index++) {
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
    }
    /**
     * @param section	name of the section to retrieve configuration parameters from.
     * @returns 		all configuration parameters that belong to the section named 'section'.
     *
     * Example key "Section-1.Subsection-1-1.Key-1-1-1" contains the section named "Section-1".
     * Calling <code>getSection("Section-1")</code> would return a ConfigParams object containing
     * the key "Subsection-1-1.Key-1-1-1"
     */
    getSection(section) {
        let result = new ConfigParams();
        let prefix = section + ".";
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                // Prevents exception on the next line
                if (key.length < prefix.length)
                    continue;
                // Perform case sensitive match
                let keyPrefix = key.substring(0, prefix.length);
                if (keyPrefix == prefix) {
                    let name = key.substring(prefix.length);
                    result.put(name, this[key]);
                }
            }
        }
        return result;
    }
    /**
     * Adds 'sectionParams' to this ConfigParams object under the section named 'section'.
     *
     * @param section 			name of the section, under which 'sectionParams' is to be added.
     * 							The keys of 'sectionParams' will be renamed to "(section).<key's name>",
     * 							when added to this ConfigParams object.
     * @param sectionParams 	ConfigParams that are to be added under the section named 'section'.
     */
    addSection(section, sectionParams) {
        if (section == null)
            throw new Error("Section name cannot be null");
        if (sectionParams != null) {
            for (let key in sectionParams) {
                if (sectionParams.hasOwnProperty(key)) {
                    let name = key;
                    if (name.length > 0 && section.length > 0)
                        name = section + "." + name;
                    else if (name.length == 0)
                        name = section;
                    let value = sectionParams[key];
                    this.put(name, value);
                }
            }
        }
    }
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
    override(configParams) {
        let map = StringValueMap_1.StringValueMap.fromMaps(this, configParams);
        return new ConfigParams(map);
    }
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
    setDefaults(defaultConfigParams) {
        let map = StringValueMap_1.StringValueMap.fromMaps(defaultConfigParams, this);
        return new ConfigParams(map);
    }
    /**
     * Static method that creates a ConfigParams object based on the values that are stored
     * in the 'value' object's properties.
     *
     * @param value		configuration parameters in the form of an object with properties.
     * @returns			generated ConfigParams.
     *
     * @see [[RecursiveObjectReader.getProperties]]
     */
    static fromValue(value) {
        let map = RecursiveObjectReader_1.RecursiveObjectReader.getProperties(value);
        return new ConfigParams(map);
    }
    /**
     * Static method that creates a ConfigParams object using the tuples passed to the method.
     *
     * @param tuples	the tuples to convert to a ConfigParams object.
     * @returns			the generated ConfigParams.
     *
     * @see [[StringValueMap.fromTuplesArray]]
     */
    static fromTuples(...tuples) {
        let map = StringValueMap_1.StringValueMap.fromTuplesArray(tuples);
        return new ConfigParams(map);
    }
    /**
     * Static method that creates a ConfigParams object from a parameterized string.
     *
     * @param line 		configuration parameters in the form of a parameterized string.
     * 					Example: "Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z"
     * @returns			generated ConfigParams.
     *
     * @see [[StringValueMap.fromString]]
     */
    static fromString(line) {
        let map = StringValueMap_1.StringValueMap.fromString(line);
        return new ConfigParams(map);
    }
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
    static mergeConfigs(...configs) {
        let map = StringValueMap_1.StringValueMap.fromMaps(...configs);
        return new ConfigParams(map);
    }
}
exports.ConfigParams = ConfigParams;
//# sourceMappingURL=ConfigParams.js.map