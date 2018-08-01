import { TypeDescriptor } from './TypeDescriptor';
/**
 * Helper class that contains methods for working with [[TypeDescriptor TypeDescriptors]].
 *
 * @see [[TypeDescriptor]]
 */
export declare class TypeReflector {
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
    static getType(name: string, library: string): any;
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
    static getTypeByDescriptor(type: TypeDescriptor): any;
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
    static createInstanceByType(type: any, ...args: any[]): any;
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
    static createInstance(name: string, library: string, ...args: any[]): any;
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
    static createInstanceByDescriptor(type: TypeDescriptor, ...args: any[]): any;
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
    static isPrimitive(value: any): boolean;
}
