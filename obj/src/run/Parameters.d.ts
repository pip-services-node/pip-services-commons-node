/** @module run */
import { AnyValueMap } from '../data/AnyValueMap';
import { ConfigParams } from '../config/ConfigParams';
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
export declare class Parameters extends AnyValueMap {
    constructor(map?: any);
    get(key: string): any;
    put(key: string, value: any): any;
    getAsNullableParameters(key: string): Parameters;
    getAsParameters(key: string): Parameters;
    getAsParametersWithDefault(key: string, defaultValue: Parameters): Parameters;
    containsKey(key: string): boolean;
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
    override(parameters: Parameters, recursive?: boolean): Parameters;
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
    setDefaults(defaultParameters: Parameters, recursive?: boolean): Parameters;
    /**
     *
     * @param value 	property in the
     *
     * @see [[RecursiveObjectWriter.copyProperties]]
     * @see [[RecursiveObjectReader.performGetProperties]]
     * @see [[ObjectReader.getProperties]]
     */
    assignTo(value: any): void;
    /**
     * Picks select parameters from this Parameters object using the keys passed as 'paths'.
     *
     * @param paths 	the keys passed to this method, whose data must be included in the
     * 					Parameters object that will be returned.
     *
     * @returns a Parameters object that contains only the selected parameters.
     */
    pick(...paths: string[]): Parameters;
    /**
     * Omits select parameters from this Parameters object using the keys passed as 'paths'.
     *
     * @param paths 	the keys passed to this method, whose data must be excluded from the
     * 					Parameters object that will be returned.
     *
     * @returns this Parameters object's parameters with the given parameters omitted.
     */
    omit(...paths: string[]): Parameters;
    /**
     * Convert this Parameters object into a JSON string using [[JsonConverter.toJson]].
     *
     * @returns		this Parameters object as a JSON string.
     *
     * @see [[JsonConverter.toJson]]
     */
    toJson(): string;
    /**
     * Static method that creates a Parameters object based on the values that are stored
     * in the 'value' object's properties.
     *
     * @param value		parameters in the form of an object with properties.
     * @returns			generated Parameters.
     *
     * @see [[AnyValueMap.AnyValueMap]]
     */
    static fromValue(value: any): Parameters;
    /**
     * Static method that creates a Parameters object using the tuples passed to the method.
     *
     * @param tuples	the tuples to convert to a Parameters object.
     * @returns			the generated Parameters.
     *
     * @see [[AnyValueMap.fromTuplesArray]]
     */
    static fromTuples(...tuples: any[]): Parameters;
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
    static mergeParams(...parameters: Parameters[]): Parameters;
    /**
     * Static method that can convert a JSON string to a Parameters object using
     * [[JsonConverter.toNullableMap]].
     *
     * @param json 	the JSON string containing parameters.
     * @returns		the Parameters generated.
     *
     * @see [[JsonConverter.toNullableMap]]
     */
    static fromJson(json: string): Parameters;
    /**
     * Static method that can convert a ConfigParams object into a Parameters object.
     *
     * @param config 	the ConfigParams that contain parameters.
     * @returns			the Parameters generated.
     *
     * @see [[ConfigParams]]
     */
    static fromConfig(config: ConfigParams): Parameters;
}
