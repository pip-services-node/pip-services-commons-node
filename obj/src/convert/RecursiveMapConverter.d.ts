/**
 * Provides methods for recursively converting values.
 */
export declare class RecursiveMapConverter {
    private static objectToMap;
    private static valueToMap;
    private static mapToMap;
    private static arrayToMap;
    static toNullableMap(value: any): any;
    static toMap(value: any): any;
    static toMapWithDefault(value: any, defaultValue: any): any;
}
