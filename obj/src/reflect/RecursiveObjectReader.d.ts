export declare class RecursiveObjectReader {
    private static performHasProperty;
    static hasProperty(obj: any, name: string): boolean;
    private static performGetProperty;
    static getProperty(obj: any, name: string): any;
    private static isSimpleValue;
    private static performGetPropertyNames;
    static getPropertyNames(obj: any): string[];
    private static performGetProperties;
    static getProperties(obj: any): any;
}
