/**
 * Contains standard design patterns for generating GUIDs.
 */
export declare class IdGenerator {
    /**
     * Generates a new short (9-digit number) id using Math.random().
     */
    static nextShort(): string;
    private static uuidToHex;
    /**
     * Generates a new long (16-digit hex) id using UUID.
     */
    static nextLong(): string;
}
