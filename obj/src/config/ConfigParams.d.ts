import { StringValueMap } from '../data/StringValueMap';
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
export declare class ConfigParams extends StringValueMap {
    /**
     * Creates a new ConfigParams object from an array of tuples, a parameterized string
     * (Example: "Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z"), or from an object with
     * configuration parameters stored as properties.
     *
     * @param values 	configuration parameters to store in this object. Defaults to null.
     *
     * @see [[StringValueMap.constructor]]
     */
    constructor(values?: any);
    /**
     * @returns the names of all sections that are present in this object's complex keys.
     *
     * Example key "Section-1.Subsection-1-1.Key-1-1-1" contains the section named "Section-1".
     */
    getSectionNames(): string[];
    /**
     * @param section	name of the section to retrieve configuration parameters from.
     * @returns 		all configuration parameters that belong to the section named 'section'.
     *
     * Example key "Section-1.Subsection-1-1.Key-1-1-1" contains the section named "Section-1".
     * Calling <code>getSection("Section-1")</code> would return a ConfigParams object containing
     * the key "Subsection-1-1.Key-1-1-1"
     */
    getSection(section: string): ConfigParams;
    /**
     * Adds 'sectionParams' to this ConfigParams object under the section named 'section'.
     *
     * @param section 			name of the section, under which 'sectionParams' is to be added.
     * 							The keys of 'sectionParams' will be renamed to "(section).<key's name>",
     * 							when added to this ConfigParams object.
     * @param sectionParams 	ConfigParams that are to be added under the section named 'section'.
     */
    addSection(section: string, sectionParams: ConfigParams): void;
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
    override(configParams: ConfigParams): ConfigParams;
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
    setDefaults(defaultConfigParams: ConfigParams): ConfigParams;
    /**
     * Static method that creates a ConfigParams object based on the values that are stored
     * in the 'value' object's properties.
     *
     * @param value		configuration parameters in the form of an object with properties.
     * @returns			generated ConfigParams.
     *
     * @see [[RecursiveObjectReader.getProperties]]
     */
    static fromValue(value: any): ConfigParams;
    /**
     * Static method that creates a ConfigParams object using the tuples passed to the method.
     *
     * @param tuples	the tuples to convert to a ConfigParams object.
     * @returns			the generated ConfigParams.
     *
     * @see [[StringValueMap.fromTuplesArray]]
     */
    static fromTuples(...tuples: any[]): ConfigParams;
    /**
     * Static method that creates a ConfigParams object from a parameterized string.
     *
     * @param line 		configuration parameters in the form of a parameterized string.
     * 					Example: "Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z"
     * @returns			generated ConfigParams.
     *
     * @see [[StringValueMap.fromString]]
     */
    static fromString(line: string): ConfigParams;
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
    static mergeConfigs(...configs: ConfigParams[]): ConfigParams;
}
