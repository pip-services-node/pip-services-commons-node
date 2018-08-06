/** @module validate */
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';

/**
 * Interface for creating validation rules. 
 * 
 * Various validation frameworks exist for various languages, but they are all different and not portable. 
 * PipServices' validation rules provide identical implementation across various languages. This is key, 
 * since validation is one of the underlying functions that is incorporated into (various) other packages, 
 * making it vital for it to be in a portable format.
 */
export interface IValidationRule {

    /**
     * Abstract method that will contain the logic for validating a value using the given schema.
     * 
     * @param path      the dot notation path to the value that is to be validated.
     * @param schema    the schema to use for validation.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
