/** @module reflect */
import { ConfigException } from '../errors/ConfigException';

/**
 * Class that stores information about an object's type, specifically - the type's name 
 * and the library it can be found in.
 */
export class TypeDescriptor {
	private _name: string;
	private _library: string;
		
	/**
	 * Creates a new TypeDescriptor object using the values provided.
	 * 
	 * @param name 		the name of the data type.
	 * @param library 	the library in which the data type can be found.
	 */
	public constructor(name: string, library: string) {
		this._name = name;
		this._library = library;
	}
	
	/**
	 * @returns the name of the data type that is stored in this TypeDescriptor object.
	 */
	public getName(): string { 
        return this._name; 
    }
	
	/**
	 * @returns the library in which this TypeDescriptor's type can be found.
	 */
	public getLibrary(): string { 
        return this._library; 
    }
	
	/**
	 * Checks whether or not the object passed is an instance of TypeDescriptor and
	 * equals this current TypeDescriptor object.
	 * 
	 * @param obj	the TypeDescriptor to check.
	 * @returns whether or not the passed TypeDescriptor and this TypeDescriptor object 
	 * 			are equal.
	 */
	public equals(obj: any): boolean {
		if (obj instanceof TypeDescriptor) {
			let otherType = <TypeDescriptor>obj;
			if (this.getName() == null || otherType.getName() == null)
				return false;
			if (this.getName() != otherType.getName())
				return false;
			if (this.getLibrary() == null || otherType.getLibrary() == null
				|| this.getLibrary() == otherType.getLibrary())
				return true;
		}
		
		return false;
	}
	
	/**
	 * Converts this TypeDescriptor object to a string.
	 * 
	 * @returns this TypeDescriptor as a string. Example 
	 * 			result: "typesName,library".
	 * 
	 * @see [[fromString]]
	 */
	public toString(): string {
		let builder = '' + this._name;
		if (this._library != null)
			builder += ',' + this._library;
		return builder.toString();
	}
	
	/**
	 * Static method that generates a TypeDescriptor object using the string provided.
	 * 
	 * @param value 	the string to use to generate a TypeDescriptor object. 
	 * 					Example strings: "typesName,library", "typesNameOnly".
	 * @returns the generated TypeDescriptor. If value is <code>null</code> or an 
	 * 			empty string - <code>null</code> will be returned.
	 * 
	 * @throws a [[ConfigException]] if the type descriptor string is not formatted correctly.
	 * 
	 * @see [[toString]]
	 */
	public static fromString(value: string): TypeDescriptor {
		if (value == null || value.length == 0) 
			return null;
				
		let tokens = value.split(",");
		if (tokens.length == 1) {
			return new TypeDescriptor(tokens[0].trim(), null);
		} else if (tokens.length == 2) {
			return new TypeDescriptor(tokens[0].trim(), tokens[1].trim());		
		} else {
			throw new ConfigException(
				null, "BAD_DESCRIPTOR", "Type descriptor " + value + " is in wrong format"
			).withDetails("descriptor", value);
		}			
	}

}
