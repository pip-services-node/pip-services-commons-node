/**
 * Contains standard design patterns for generating GUIDs.
 *
 * ### Example ###
 *
 *     public MyMethod () {
 *        let id1 = IdGenerator.nextShort();
 *        ...
 *
 *        let id2 = IdGenerator.nextLong();
 *     }
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
