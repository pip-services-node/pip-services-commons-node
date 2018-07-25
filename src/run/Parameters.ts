/** @module run */
import { AnyValueMap } from '../data/AnyValueMap';
import { JsonConverter } from '../convert/JsonConverter';
import { RecursiveObjectReader } from '../reflect/RecursiveObjectReader';
import { RecursiveObjectWriter } from '../reflect/RecursiveObjectWriter';
import { ObjectWriter } from '../reflect/ObjectWriter';
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
export class Parameters extends AnyValueMap {

	/**
	 * Creates a new Parameters object from the map passed.
	 * 
	 * @param map 	parameters to store in this object. Defaults to null.
	 * 
	 * @see [[AnyValueMap.AnyValueMap]]
	 */
	public constructor(map: any = null) {
		super(map);
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
	public get(key: string): any {
		if (key == null)
			return null;
		else if (key.indexOf('.') > 0)
			return RecursiveObjectReader.getProperty(this, key);
		else
			return super.get(key);
	}

	/**
	 * @param key 	the complex key of the parameter that is to be stored. 
	 * 				The key can be complex with dot-notation, for example 
	 * 				"Parameter-group-1.Sub-param-group-1-1.Param-1-1-1". In this 
	 * 				case, RecursiveObjectReader's [[RecursiveObjectReader.setProperty setProperty]]
	 * 				method will be used.
	 * @param value	
	 * @returns		the value that was stored by the given key.
	 * 
	 * @see [[RecursiveObjectReader.setProperty]]
	 */
	public put(key: string, value: any): any {
		if (key == null)
			return null;
		else if (key.indexOf('.') > 0)
			RecursiveObjectWriter.setProperty(this, key, value);
		else
			super.put(key, value);
		return value;
    }

	/** 
     * @param key   key of the parameter to retrieve.
     * @returns     the parameter with the given key as a nullable Parameters object.
	 * 				Null is returned if no parameters are found by the given key. 
     * 
     * @see [[AnyValueMap.getAsNullableMap]]
     */
    public getAsNullableParameters(key: string): Parameters {
        let value = this.getAsNullableMap(key);
    	return value != null ? new Parameters(value) : null;
    }

	/** 
     * @param key   key of the parameter to retrieve.
     * @returns     the parameter with the given key as a Parameters object. 
     * 
     * @see [[AnyValueMap.getAsMap]]
     */
    public getAsParameters(key: string): Parameters {
        let value = this.getAsMap(key);
    	return new Parameters(value);
    }

	/**
     * @param key               key of the parameter to retrieve.
     * @param defaultValue      the value to return if no parameters are found by the given key.
     * @returns                 the parameter with the given key or the
     *                          defaultValue (if no parameters are found by the given key 
	 * 							and null is returned by [[getAsNullableParameters]]).
     * 
     * @see [[getAsNullableParameters]]
     */
    public getAsParametersWithDefault(key: string, defaultValue: Parameters): Parameters {
        let result = this.getAsNullableParameters(key);
    	return result != null ? result: defaultValue;
    }

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
	public containsKey(key: string): boolean {
		return RecursiveObjectReader.hasProperty(this, key.toString());
	}
	
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
 	public override(parameters: Parameters, recursive: boolean = false): Parameters {
 		let result = new Parameters();
 		if (recursive) {
 			RecursiveObjectWriter.copyProperties(result, this);
 			RecursiveObjectWriter.copyProperties(result, parameters);
 		} else {
 			ObjectWriter.setProperties(result, this);
 			ObjectWriter.setProperties(result, parameters);
 		}
        return result;
    }

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
	public setDefaults(defaultParameters: Parameters, recursive: boolean = false): Parameters {
 		let result = new Parameters();
 		if (recursive) {
 			RecursiveObjectWriter.copyProperties(result, defaultParameters);
 			RecursiveObjectWriter.copyProperties(result, this);
 		} else {
 			ObjectWriter.setProperties(result, defaultParameters);
 			ObjectWriter.setProperties(result, this);
 		}
        return result;
	}

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
    public assignTo(value: any): void {
        if (value == null) return;        
        RecursiveObjectWriter.copyProperties(value, this);
    }
	
	/**
	 * Picks select parameters from this Parameters object using the keys passed as 'paths'.
	 * 
	 * @param paths 	the keys passed to this method, whose data must be included in the
	 * 					Parameters object that will be returned.
	 * 
	 * @returns a Parameters object that contains only the selected parameters.
	 */
    public pick(...paths: string[]): Parameters {
    	let result = new Parameters();
        for (let index = 0; index < paths.length; index++) {
            let path = paths[index];
            if (this.containsKey(path))
                result.put(path, this.get(path));
        }
        return result;
    }

	/**
	 * Omits select parameters from this Parameters object using the keys passed as 'paths'.
	 * 
	 * @param paths 	the keys passed to this method, whose data must be excluded from the
	 * 					Parameters object that will be returned.
	 * 
	 * @returns this Parameters object's parameters with the given parameters omitted.
	 */
    public omit(...paths: string[]): Parameters {
    	let result = new Parameters(this);        
        for (let index = 0; index < paths.length; index++) {
            let path = paths[index];
            result.remove(path);
        }
        return result;
    }
	
	/**
	 * Convert this Parameters object into a JSON string using [[JsonConverter.toJson]].
	 * 
	 * @returns		this Parameters object as a JSON string.
	 * 
	 * @see [[JsonConverter.toJson]]
	 */
	public toJson(): string {
		return JsonConverter.toJson(this);
	}
	
	/**
	 * Static method that creates a Parameters object based on the values that are stored 
	 * in the map passed as 'value'.
	 * 
	 * @param value		parameters in the form of a map.
	 * @returns			generated Parameters.
	 * 
	 * @see [[AnyValueMap.AnyValueMap]]
	 */
    public static fromValue(value: any): Parameters {
        return new Parameters(value);
    }
	
	/**
	 * Static method that creates a Parameters object using the tuples passed to the method.
	 * 
	 * @param tuples	the tuples to convert to a Parameters object.
	 * @returns			the generated Parameters.
	 * 
	 * @see [[AnyValueMap.fromTuplesArray]]
	 */
	public static fromTuples(...tuples: any[]): Parameters {
		let map = AnyValueMap.fromTuples(...tuples);
		return new Parameters(map);
	}
		
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
	public static mergeParams(...parameters: Parameters[]): Parameters {
		let map = AnyValueMap.fromMaps(...parameters);
		return new Parameters(map);
	}
	
	/**
	 * Static method that can convert a JSON string to a Parameters object using 
	 * [[JsonConverter.toNullableMap]].
	 * 
	 * @param json 	the JSON string containing parameters.
	 * @returns		the Parameters generated.
	 * 
	 * @see [[JsonConverter.toNullableMap]]
	 */
	public static fromJson(json: string): Parameters {
		let map = JsonConverter.toNullableMap(json);
		return new Parameters(map);
	}
	
	/**
	 * Static method that can convert a ConfigParams object into a Parameters object.
	 * 
	 * @param config 	the ConfigParams that contain parameters.
	 * @returns			the Parameters generated.
	 * 
	 * @see [[ConfigParams]]
	 */
	public static fromConfig(config: ConfigParams): Parameters {
		let result = new Parameters();
		
		if (config == null)
			return result;
		
		for (let key in config) {
            if (config.hasOwnProperty(key))
			    result.put(key, config[key]);
		}
		
		return result;
	}
}
