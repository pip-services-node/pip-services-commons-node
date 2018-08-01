/**
 * Helper class that contains methods for writing (setting) the properties of objects.
 */
export declare class ObjectWriter {
    /**
     * Static method that sets an object's property to the value that is passed.
     *
     * @param obj 		the object to set a property in.
     * @param name		the name of the property to set.
     * @param value		the value to set in the object's given property.
     */
    static setProperty(obj: any, name: string, value: any): void;
    /**
     * Static method that sets multiple object properties at once.
     *
     * @param obj 		the object to set properties in.
     * @param values 	a map, containing property names and the values to set.
     */
    static setProperties(obj: any, values: any): void;
}
