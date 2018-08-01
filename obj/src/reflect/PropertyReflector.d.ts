/**
 * Helper class that contains methods for working with an object's properties.
 */
export declare class PropertyReflector {
    /** Used to identify properties by their names and verify that they are indeed properties. */
    private static matchField;
    /**
     * Static method that checks whether or not an object has a property with the given name.
     *
     * @param obj 	the object to search for the given property in. Cannot be <code>null</code>.
     * @param name 	the name of the property to search for. Cannot be <code>null</code>.
     * @returns whether or not a property with the given name was found in the object.
     *
     * @throws an Error if 'obj' or 'name' are <code>null</code>.
     */
    static hasProperty(obj: any, name: string): boolean;
    /**
     * Static method that retrieves the value of an object's property using the property's name.
     *
     * @param obj 	the object, whose property is to be retrieved. Cannot be <code>null</code>.
     * @param name 	the name of the property that is to be retrieved. Cannot be <code>null</code>.
     * @returns the value that is retrieved.
     *
     * @throws an Error if 'obj' or 'name' are <code>null</code>.
     */
    static getProperty(obj: any, name: string): any;
    /**
     * Static method that retrieves the names of an object's properties.
     *
     * @param obj   the object, whose property names are to be retrieved.
     * @returns a string array, containing the names of the object's properties.
     */
    static getPropertyNames(obj: any): string[];
    /**
     * Static method that retrieves the properties of an object as a map.
     *
     * @param obj   the object, whose properties are to be retrieved.
     * @returns a map, containing the names of the object's properties and their values.
     */
    static getProperties(obj: any): any;
    /**
     * Static method that sets an object's property to the given value. If no properties
     * are found by the given name, then the value will be set directly in the object using
     * the provided name (if supported).
     *
     * @param obj   the object, whose property is to be set. Cannot be <code>null</code>.
     * @param name	the name of the property to set. Cannot be <code>null</code>.
     * @param value the value to set the object's property to.
     *
     * @throws an Error if 'obj' or 'name' are <code>null</code>.
     */
    static setProperty(obj: any, name: string, value: any): void;
    /**
     * Static method that sets multiple object properties at once. Uses this class's
     * static [[setProperty]] method for each value that is to be set.
     *
     * @param obj 		the object, whose properties are to be set.
     * @param values 	a map, containing property names as map keys and the values that are to be
     * 					set as map values.
     *
     * @see [[setProperty]]
     */
    static setProperties(obj: any, values: any): void;
}
