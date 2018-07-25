/**
 * Provides methods for converting nested maps using recursion.
 */
export declare class RecursiveMapConverter {
    /**
     * Recursively converts the object passed into a map using [[valueToMap]].
     *
     * @param value the object to recursively convert into a map.
     *
     * @see [[valueToMap]]
     */
    private static objectToMap;
    /**
     * Conversion cases:
     * - if 'value' is null, then null will be returned;
     * - if 'value' is a string or a primitive type, then it will be returned as is;
     * - if 'value' is a map, then it will be passed to [[mapToMap]], and the result will be returned;
     * - if 'value' is an array, then it will be passed to [[arrayToMap]], and the result will be returned;
     * - otherwise 'value' will be passed to [[objectToMap]], and the result will be returned;
     *
     * @param value the value to convert to a map recursively.
     *
     * @see [[mapToMap]]
     * @see [[arrayToMap]]
     * @see [[objectToMap]]
     */
    private static valueToMap;
    /**
     * Recursively converts the map passed using [[valueToMap]].
     *
     * @param value the map to recursively convert.
     *
     * @see [[valueToMap]]
     */
    private static mapToMap;
    /**
     * Recursively converts the array passed into a map using [[valueToMap]].
     *
     * @param value the array to recursively convert into a map.
     *
     * @see [[valueToMap]]
     */
    private static arrayToMap;
    /**
     * Static method for recursively converting the value passed to a nullable map using [[valueToMap]].
     *
     * @param value     the map to recursively convert.
     * @returns         the converted map or null.
     *
     * @see [[valueToMap]]
     */
    static toNullableMap(value: any): any;
    /**
     * Static method for recursively converting the value passed to a map using [[toNullableMap]]
     * (which uses [[valueToMap]]).
     *
     * @param value     the map to recursively convert.
     * @returns         the converted map or an empty map, if the conversion returns null.
     *
     * @see [[toNullableMap]]
     * @see [[valueToMap]]
     */
    static toMap(value: any): any;
    /**
     * Static method for recursively converting the value passed to a map using [[toNullableMap]]
     * (which uses [[valueToMap]]).
     *
     * @param value         the map to recursively convert.
     * @param defaultValue  the value to return if the conversion returns null.
     * @returns             the converted map or the default value, if the conversion returns null.
     *
     * @see [[toNullableMap]]
     * @see [[valueToMap]]
     */
    static toMapWithDefault(value: any, defaultValue: any): any;
}
