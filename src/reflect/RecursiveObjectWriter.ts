/** @module reflect */
/** @hidden */ 
let _ = require('lodash');

import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';
import { IntegerConverter } from '../convert/IntegerConverter';
import { ObjectReader } from './ObjectReader';
import { ObjectWriter } from './ObjectWriter';
import { RecursiveObjectReader } from './RecursiveObjectReader';

//TODO - private methods?
/**
 * Helper class that contains methods for writing nested object properties recursively.
 */
export class RecursiveObjectWriter {

	/**
	 * Private static method that recursively create a nested property, 
	 * whose nested name correspond to 'names'. The 'nameIndex' is used to track the depth of recursion.
	 */
	private static createProperty(obj: any, names: string[], nameIndex: number): any {
		// If next field is index then create an array
		let subField = names.length > nameIndex + 1 ? names[nameIndex + 1] : null;
		let subFieldIndex = IntegerConverter.toNullableInteger(subField);
		if (subFieldIndex != null)
			return [];

		// Else create a dictionary
		return {};
	}
	
	/** @see [[createProperty]] */
    private static performSetProperty(obj: any, names: string[], nameIndex: number, value: any): any {
		if (nameIndex < names.length - 1) {
			let subObj = ObjectReader.getProperty(obj, names[nameIndex]);
			if (subObj != null)
				RecursiveObjectWriter.performSetProperty(subObj, names, nameIndex + 1, value);
			else {
				subObj = RecursiveObjectWriter.createProperty(obj, names, nameIndex);
				if (subObj != null) {					
					RecursiveObjectWriter.performSetProperty(subObj, names, nameIndex + 1, value);
					ObjectWriter.setProperty(obj, names[nameIndex], subObj);
				}
			}
		} else
			ObjectWriter.setProperty(obj, names[nameIndex], value);
	}

	/**
	 * Static method that sets an object's nested property to the value that is passed.
	 * 
	 * @param obj 		the object to set a property in.
	 * @param name		the name of the property (in dot-notation) to set. 
	 * 					Example property name: "data.sampleData.sample1".
	 * @param value		the value to set in the object's given property.
	 */ 
	public static setProperty(obj: any, name: string, value: any): void {
        if (obj == null || name == null) return;

        let names = name.split(".");
        if (names == null || names.length == 0) 
        	return;

        RecursiveObjectWriter.performSetProperty(obj, names, 0, value);
	}

	/**
	 * Static method that sets multiple object properties at once.
	 * 
	 * @param obj 		the object to set properties in.
	 * @param values 	a map, containing property names (in dot-notation) and the 
	 * 					values to set. Example property name: "data.sampleData.sample1".
	 */
	public static setProperties(obj: any, values: any): void {
		if (values == null) return;
		
		for (let key in values) {
            let value = values[key];
			RecursiveObjectWriter.setProperty(obj, key, value);
		}
	}

	/**
	 * Copies object properties from a source to the given destination. Calls 
	 * [[RecursiveObjectReader.getProperties]] to retrieve properties from the source 
	 * and [[RecursiveObjectWriter.setProperties]] to set them in the destination.
	 * 
	 * @param dest 	the destination to which the properties are to be copied.
	 * @param src 	the source from which the properties are to be copied.
	 */
	public static copyProperties(dest: any, src: any): void {
		if (dest == null || src == null) return;
		
		let values = RecursiveObjectReader.getProperties(src);
		RecursiveObjectWriter.setProperties(dest, values);
	}

}
