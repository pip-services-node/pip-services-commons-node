/** @module reflect */
/** @hidden */ 
let _ = require('lodash');

import { PropertyReflector } from './PropertyReflector';
import { IntegerConverter } from '../convert/IntegerConverter';

/**
 * Helper class that contains methods for reading the properties of objects.
 */
export class ObjectReader {
    
    /**
     * Static method that gets the value of an object.
     * 
     * @param obj   the object, whose value is to be retrieved. 
     */
    public static getValue(obj: any): any {
    	// Todo: just a blank implementation for compatibility
        return obj;
    }

    /**
     * Static method that checks whether or not an object has a property with the given name.
     * If 'obj' or 'name' are <code>null</code> -  <code>false</code> will be returned.
     * 
     * @param obj       the object to search in.
     * @param name      the name of the property to search for.
     * @returns whether or not a property with the given name was found in the given object.
     */
	public static hasProperty(obj: any, name: string): boolean {
        if (obj == null || name == null) {
        	return false;
        } else if (_.isObject(obj) && !_.isDate(obj)) {
            return PropertyReflector.hasProperty(obj, name);
        } else if (_.isArray(obj)) {
            let index = IntegerConverter.toNullableInteger(name);
            return index != null && index < obj.length;
        } else {
            return false;
        }
    }

    /**
     * Static method that retrieves the value stored in the passed object by the given property name.
     * If 'obj' or 'name' are <code>null</code> - <code>null</code> will be returned.
     * 
     * @param obj   the object to read a property from.
     * @param name  the name of the property to retrieve.
     * @returns the value stored by the given property name or null (if the property cannot be read).
     */
	public static getProperty(obj: any, name: string): any {
        if (obj == null || name == null) {
        	return null;
        } else if (_.isObject(obj) && !_.isDate(obj)) {
            return PropertyReflector.getProperty(obj, name);
        } else if (_.isArray(obj)) {
            let index = IntegerConverter.toNullableInteger(name);
            return index != null && index < obj.length ? obj[index] : null;
        } else {
            return null;
        }
    }

    /**
     * Static method that retrieves the names of an object's properties.
     * 
     * @param obj   the object, whose property names are to be retrieved.
     * @returns a string array, containing the names of the object's properties.
     */
	public static getPropertyNames(obj: any): string[] {
        let properties: string[] = [];
        
        if (obj == null) {
        	// Do nothing
        } else if (_.isObject(obj) && !_.isDate(obj)) {
            properties = PropertyReflector.getPropertyNames(obj);
        } else if (_.isArray(obj)) {
			let length = obj.length;
            for (let index = 0; index < length; index++)
            	properties.push(index.toString());
        } else {
            // Do nothing
        }

        return properties;
    }

    /**
     * Static method that retrieves an object's properties as a map.
     * 
     * @param obj   the object to get a map of properties from.
     * @returns a map, containing property names and their values.
     */
	public static getProperties(obj: any): any {
        let map: any = {};
        
        if (obj == null) {
        	// Do nothing
        } else if (_.isObject(obj) && !_.isDate(obj)) {
            map = PropertyReflector.getProperties(obj);
        } else if (_.isArray(obj)) {
			let length = obj.length;
            for (let index = 0; index < length; index++)
                map[index.toString()] = obj[index];
        } else {
            // Do nothing
        }

        return map;
    }
}
