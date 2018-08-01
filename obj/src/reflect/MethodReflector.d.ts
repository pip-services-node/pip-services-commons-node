/**
 * Helper class that contains methods for working with an object's methods.
 */
export declare class MethodReflector {
    /** Used to identify methods by their names and verify that they are indeed methods. */
    private static matchMethod;
    /**
     * Static method that checks whether or not an object has a method with the given name.
     *
     * @param obj 	the object to search for the given method in. Cannot be <code>null</code>.
     * @param name 	the name of the method to search for. Cannot be <code>null</code>.
     * @returns whether or not a method with the given name was found in the object.
     *
     * @throws an Error if 'obj' or 'name' are <code>null</code>.
     */
    static hasMethod(obj: any, name: string): boolean;
    /**
     * Static method that invokes an object's method using the method's name.
     *
     * @param obj 	the object, whose method is to be invoked. Cannot be <code>null</code>.
     * @param name 	the name of the method that is to be invoked. Cannot be <code>null</code>.
     * @param args 	the arguments that should be passed to the method.
     * @returns the value that is returned by the invoked method.
     *
     * @throws an Error if 'obj' or 'name' are <code>null</code>.
     */
    static invokeMethod(obj: any, name: string, ...args: any[]): any;
    /**
     * Static method that retrieves the names of an object's methods.
     *
     * @param obj   the object, whose method names are to be retrieved.
     * @returns a string array, containing the names of the object's methods.
     */
    static getMethodNames(obj: any): string[];
}
