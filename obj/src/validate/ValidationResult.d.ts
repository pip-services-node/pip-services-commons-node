/** @module validate */
import { ValidationResultType } from './ValidationResultType';
/**
 * Stores the result of a given validation.
 */
export declare class ValidationResult {
    private _path;
    private _type;
    private _code;
    private _message;
    private _expected;
    private _actual;
    /**
     * Creates a new ValidationResult object and stores in it information about the
     * validation's result.
     *
     * @param path      the name of the result.
     * @param type      the result's [[ValidationResultType type]]. For example: Information, Warning, or Error.
     * @param code      the result's code.
     * @param message   additional information about the result.
     * @param expected  the expected result.
     * @param actual    the actual result.
     *
     * @see [[ValidationResultType]]
     */
    constructor(path?: string, type?: ValidationResultType, code?: string, message?: string, expected?: any, actual?: any);
    /**
     * @returns the name of the result.
     */
    getPath(): string;
    /**
     * @returns the result's [[ValidationResultType type]]. For example: Information, Warning, or Error.
     *
     * @see [[ValidationResultType]]
     */
    getType(): ValidationResultType;
    /**
     * @returns the result's code.
     */
    getCode(): string;
    /**
     * @returns the result's message (additional information about the result).
     */
    getMessage(): string;
    /**
     * @returns the expected result of the validation.
     */
    getExpected(): any;
    /**
     * @returns the validation's actual result.
     */
    getActual(): any;
}
