/** @module reflect */
/** @hidden */ 
let _ = require('lodash');
/** @hidden */ 
let path = require("path");

import { TypeDescriptor } from './TypeDescriptor';
import { NotFoundException } from '../errors/NotFoundException';
import { UnsupportedException } from '../errors/UnsupportedException';
import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';

/**
 * Helper class that contains methods for working with [[TypeDescriptor TypeDescriptors]].
 * 
 * @see [[TypeDescriptor]]
 */
export class TypeReflector {

	/**
	 * Static method that loads modules to resolve exported types using the provided 
	 * 'name' and 'library' parameters. Once a type has been found, its constructor is 
	 * returned as 'type'.
	 * 
	 * @param name 		the type's name.
	 * @param library 	the library that contains the type.
	 * @returns the constructor for the type that was found or <code>null</code> 
	 * 			(if none were found).
	 */
	public static getType(name: string, library: string): any {
		try {
			if (!library)
				library = name;

			let absPath = library;
			if (_.startsWith(absPath, '.'))
				absPath = path.resolve(absPath)

	        // Load module
            let type = require(absPath);
            if (type == null) return null;

            // Get exported type by name
            if (name != null && name.length > 0)
                type = type[name];

            return type;
	    } catch (ex) {
	    	return null;
	    }
	}

	/**
	 * Static method that retrieves the constructor for the type that correspondes to the provided 
	 * [[TypeDescriptor]].
	 * 
	 * @param type 	the TypeDescriptor to find the type by. Cannot be <code>null</code>.
	 * @returns the constructor for the type that was found or <code>null</code> 
	 * 			(if none were found).
	 * 
	 * @throws an Error if 'type' is <code>null</code>.
	 * 
	 * @see [[getType]]
	 * @see [[TypeDescriptor]]
	 */
	public static getTypeByDescriptor(type: TypeDescriptor): any {
		if (type == null)
			throw new Error("Type descriptor cannot be null");
			
		return TypeReflector.getType(type.getName(), type.getLibrary());
	}

	/**
	 * Static method that creates an instance (object) of the given type.
	 * 
	 * @param type 		the type's constructor to create an instance with.
	 * @param args		the arguments to pass to the constructor.
	 * @returns the created instance (object).
	 * 
	 * @throws an Error if 'type' is <code>null</code>.
	 * @throws an Error if 'type' is not a constructor.
	 */
	public static createInstanceByType(type: any, ...args: any[]): any {
        if (type == null)
            throw new Error("Type constructor cannot be null");
        if (!_.isFunction(type))
            throw new Error("Type contructor has to be a function");

        return new type(...args);
	}

	/**
	 * Static method that resolves the type that corresponds to the provided 'name' and 'library' 
	 * parameters and creates an instance (object) of the type that was found.
	 * 
	 * @param name 		the type's name.
	 * @param library 	the library that contains the type.
	 * @param args		the arguments to pass to the constructor.
	 * @returns the created instance (object).
	 * 
	 * @throws a [[NotFoundException]] if no type is found by the given name/library.
	 * 
	 * @see [[getType]]
	 * @see [[createInstanceByType]]
	 */
	public static createInstance(name: string, library: string, ...args: any[]): any {
		let type = TypeReflector.getType(name, library);		
		if (type == null)
			throw new NotFoundException(null, "TYPE_NOT_FOUND", "Type " + name + "," + library + " was not found")
				.withDetails("type", name).withDetails("library", library);
		
		return TypeReflector.createInstanceByType(type, ...args);
	}

	/**
	 * Static method that resolves the type that corresponds to the provided 
	 * [[TypeDescriptor]] and creates an instance (object) of the type that was found.
	 * 
	 * @param type 	the TypeDescriptor to find the type by. Cannot be <code>null</code>.
	 * @param args	the arguments to pass to the constructor.
	 * @returns the created instance (object).
	 * 
	 * @throws an Error if 'type' is <code>null</code>.
	 * 
	 * @see [[createInstance]]
	 * @see [[TypeDescriptor]]
	 */
	public static createInstanceByDescriptor(type: TypeDescriptor, ...args: any[]): any {
		if (type == null)
			throw new Error("Type descriptor cannot be null");

		return TypeReflector.createInstance(type.getName(), type.getLibrary(), ...args);
	}

	/**
	 * Static method that checks whether or not a value is of a primitive type. 
	 * Uses [[TypeConverter.toTypeCode]] to identify the given value's type.
	 * 
	 * The following [[TypeCode types]] are considered to be primitive: String, 
	 * Enum, Boolean, Integer, Long, Float, Double, DateTime, Duration.
	 * 
	 * @param value 	the value to check.
	 * @returns whether or not the value is a primitive type.
	 * 
	 * @see [[TypeConverter.toTypeCode]]
	 * @see [[TypeCode]]
	 */
	public static isPrimitive(value: any): boolean {
		let typeCode = TypeConverter.toTypeCode(value);
		return typeCode == TypeCode.String || typeCode == TypeCode.Enum
			|| typeCode == TypeCode.Boolean || typeCode == TypeCode.Integer
			|| typeCode == TypeCode.Long || typeCode == TypeCode.Float
			|| typeCode == TypeCode.Double || typeCode == TypeCode.DateTime
			|| typeCode == TypeCode.Duration;
	}

}
