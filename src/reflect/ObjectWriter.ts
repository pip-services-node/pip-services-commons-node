/** @module reflect */
/** @hidden */ 
let _ = require('lodash');

import { PropertyReflector } from './PropertyReflector';
import { IntegerConverter } from '../convert/IntegerConverter';

/**
 * Helper class that contains methods for writing (setting) the properties of objects.
 */
export class ObjectWriter {
	/**
	 * Static method that sets an object's property to the value that is passed.
	 * 
	 * @param obj 		the object to set a property in.
	 * @param name		the name of the property to set.
	 * @param value		the value to set in the object's given property.
	 */ 
	public static setProperty(obj: any, name: string, value: any): void {
		if (obj == null)
			throw new Error("Object cannot be null");
		if (name == null)
			throw new Error("Property name cannot be null");

        if (_.isObject(obj) && !_.isDate(obj)) {
            PropertyReflector.setProperty(obj, name, value);
        } else if (_.isArray(obj)) {
            let index = IntegerConverter.toNullableInteger(name);
            if (index >= 0) {
                while (index < obj.length - 1)
                    obj.push(null);
                obj[index] = value;
            }
		}
	}

	/**
	 * Static method that sets multiple object properties at once.
	 * 
	 * @param obj 		the object to set properties in.
	 * @param values 	a map, containing property names and the values to set.
	 */
	public static setProperties(obj: any, values: any): void {
		if (values == null) return;
		
		for (let key in values) {
            let value = values[key];
			ObjectWriter.setProperty(obj, key, value);
		}
	}
}
