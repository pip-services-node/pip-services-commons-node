/**
 * Helper class that contains methods for writing nested object properties recursively.
 */
export declare class RecursiveObjectWriter {
    /**
     * Private static method that recursively create a nested property,
     * whose nested name correspond to 'names'. The 'nameIndex' is used to track the depth of recursion.
     */
    private static createProperty;
    /** @see [[createProperty]] */
    private static performSetProperty;
    /**
     * Static method that sets an object's nested property to the value that is passed.
     *
     * @param obj 		the object to set a property in.
     * @param name		the name of the property (in dot-notation) to set.
     * 					Example property name: "data.sampleData.sample1".
     * @param value		the value to set in the object's given property.
     */
    static setProperty(obj: any, name: string, value: any): void;
    /**
     * Static method that sets multiple object properties at once.
     *
     * @param obj 		the object to set properties in.
     * @param values 	a map, containing property names (in dot-notation) and the
     * 					values to set. Example property name: "data.sampleData.sample1".
     */
    static setProperties(obj: any, values: any): void;
    /**
     * Copies object properties from a source to the given destination. Calls
     * [[RecursiveObjectReader.getProperties]] to retrieve properties from the source
     * and [[RecursiveObjectWriter.setProperties]] to set them in the destination.
     *
     * @param dest 	the destination to which the properties are to be copied.
     * @param src 	the source from which the properties are to be copied.
     */
    static copyProperties(dest: any, src: any): void;
}
