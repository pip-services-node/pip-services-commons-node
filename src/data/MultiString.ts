/** @module data */
/**
 * Class for creating localized strings. Works like a key-value pair, where the 'key' 
 * is the language in which the 'value' is written, and the 'value' is localized string
 * itself. 
 * 
 * ### Examples ###
 * 
 * Example MultiString object usage:
 * 
 *     let strings: MultiString;
 *     strings["en"] = "my string";
 *     strings["ru"] = "моя строка";
 * 
 */
export class MultiString {
    /** 
     * Field that immitates a key-value pair object, where the 'key' is the language in which 
     * the 'value' is written, and the 'value' is localized string itself. 
     */
    [language: string]: string;
}