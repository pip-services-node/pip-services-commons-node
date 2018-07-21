export declare class RecursiveObjectWriter {
    private static createProperty;
    private static performSetProperty;
    static setProperty(obj: any, name: string, value: any): void;
    static setProperties(obj: any, values: any): void;
    static copyProperties(dest: any, src: any): void;
}
