/** @module validate */
import { ValidationResultType } from './ValidationResultType';

/**
 * Stores the result of a given validation.
 */
export class ValidationResult {
    private _path: string;
    private _type: ValidationResultType;
    private _code: string;
    private _message: string;
    private _expected: any;
    private _actual: any;
 
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
    public constructor(path: string = null, type: ValidationResultType = null, code: string = null, message: string = null, 
        expected: any = null, actual: any = null) {
        this._path = path;
        this._type = type;
        this._code = code;
        this._message = message;
        this._expected = expected;
        this._actual = actual;
    }

    /** 
     * @returns the name of the result.
     */
    public getPath(): string {
        return this._path; 
    }

    /** 
     * @returns the result's [[ValidationResultType type]]. For example: Information, Warning, or Error.
     * 
     * @see [[ValidationResultType]]
     */
    public getType(): ValidationResultType {
        return this._type; 
    }

    /**
     * @returns the result's code.
     */
    public getCode(): string {
        return this._code; 
    }

    /**
     * @returns the result's message (additional information about the result).
     */
    public getMessage(): string {
        return this._message; 
    }

    /**
     * @returns the expected result of the validation.
     */
    public getExpected(): any {
        return this._expected; 
    }

    /**
     * @returns the validation's actual result.
     */
    public getActual(): any {
        return this._actual; 
    }
}
