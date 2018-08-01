/**
 * Helper class that contains methods for reading nested object properties recursively.
 */
export declare class RecursiveObjectReader {
    /**
     * Private static method that recursively check whether or not the given object contains a property,
     * whose nested name correspond to 'names'. The 'nameIndex' is used to track the depth of recursion.
     */
    private static performHasProperty;
    /**
     * Static method that checks whether or not an object contains a nested property with the given
     * name (in dot-notation).
     *
     * @param obj 	the object to search for a property in.
     * @param name 	the name of the property (in dot-notation) to search for.
     * 				Example property name: "data.sampleData.sample1".
     * @returns whether or not the object has a property with the given name. If 'obj' or 'name'
     * 			are <code>null</code> - <code>false</code> will be returned.
     */
    static hasProperty(obj: any, name: string): boolean;
    /** @see [[performHasProperty]] */
    private static performGetProperty;
    /**
     * Static method that retrieves the value stored in the passed object by the given property name.
     * If 'obj' or 'name' are <code>null</code> - <code>null</code> will be returned.
     *
     * @param obj   the object to read a property from.
     * @param name  the name of the property (in dot-notation) to retrieve.
     * 				Example property name: "data.sampleData.sample1".
     * @returns the value stored by the given property name or null (if the property cannot be read).
     */
    static getProperty(obj: any, name: string): any;
    /** Checks whether or not value is of a primative type (not an array, map, or object). Primative types do not
     * need to use recursive calls. */
    private static isSimpleValue;
    /**
     * Private static method that recursively retrieves the property names of the object that was passed.
     *
     * @param obj			the object to get nested property names from.
     * @param path			the path to the nested property that is being processed in the current  recursive call.
     * @param result		the string array to which full property names are added to, once resolved.
     * @param cycleDetect	used to detect (and stop) recursive cycling.
    */
    private static performGetPropertyNames;
    /**
     * Static method that retrieves the names of an object's properties, including all nested property names.
     * Nested properties' names represent the path to the property and are formatted using dot-notation.
     *
     * @param obj   the object, whose property names are to be retrieved.
     * @returns a string array, containing the names of the object's properties. Nested properties are formatted
     * 			using dot-notation. Example nested property name: "data.sampleData.sample1".
     */
    static getPropertyNames(obj: any): string[];
    /** @see [[performGetPropertyNames]] */
    private static performGetProperties;
    /**
     * Static method that retrieves an object's properties as a map. Nested properties'
     * keys represent the path to the property and are set as dot-notation formatted strings.
     *
     * @param obj   the object to get a map of properties from.
     * @returns a map, containing property names and their values. Nested properties' keys are formatted
     * 			using dot-notation. Example nested property key: "data.sampleData.sample1".
     */
    static getProperties(obj: any): any;
}
