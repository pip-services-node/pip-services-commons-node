/**
 * Class that stores information about an object's type, specifically - the type's name
 * and the library it can be found in.
 */
export declare class TypeDescriptor {
    private _name;
    private _library;
    /**
     * Creates a new TypeDescriptor object using the values provided.
     *
     * @param name 		the name of the data type.
     * @param library 	the library in which the data type can be found.
     */
    constructor(name: string, library: string);
    /**
     * @returns the name of the data type that is stored in this TypeDescriptor object.
     */
    getName(): string;
    /**
     * @returns the library in which this TypeDescriptor's type can be found.
     */
    getLibrary(): string;
    /**
     * Checks whether or not the object passed is an instance of TypeDescriptor and
     * equals this current TypeDescriptor object.
     *
     * @param obj	the TypeDescriptor to check.
     * @returns whether or not the passed TypeDescriptor and this TypeDescriptor object
     * 			are equal.
     */
    equals(obj: any): boolean;
    /**
     * Converts this TypeDescriptor object to a string.
     *
     * @returns this TypeDescriptor as a string. Example
     * 			result: "typesName,library".
     *
     * @see [[fromString]]
     */
    toString(): string;
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
    static fromString(value: string): TypeDescriptor;
}
