/**
 * Helper class that contains methods for reading the properties of objects.
 */
export declare class ObjectReader {
    /**
     * Static method that gets the value of an object.
     *
     * @param obj   the object, whose value is to be retrieved.
     */
    static getValue(obj: any): any;
    /**
     * Static method that checks whether or not an object has a property with the given name.
     * If 'obj' or 'name' are <code>null</code> -  <code>false</code> will be returned.
     *
     * @param obj       the object to search in.
     * @param name      the name of the property to search for.
     * @returns whether or not a property with the given name was found in the given object.
     */
    static hasProperty(obj: any, name: string): boolean;
    /**
     * Static method that retrieves the value stored in the passed object by the given property name.
     * If 'obj' or 'name' are <code>null</code> - <code>null</code> will be returned.
     *
     * @param obj   the object to read a property from.
     * @param name  the name of the property to retrieve.
     * @returns the value stored by the given property name or null (if the property cannot be read).
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
     * Static method that retrieves an object's properties as a map.
     *
     * @param obj   the object to get a map of properties from.
     * @returns a map, containing property names and their values.
     */
    static getProperties(obj: any): any;
}
