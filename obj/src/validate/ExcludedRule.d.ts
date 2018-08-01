/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
/**
 * Validation rule that requires the values that are set to be absent for validation to pass.
 */
export declare class ExcludedRule implements IValidationRule {
    private readonly _values;
    /**
     * Creates a new ExcludedRule object and initializes it using the values passed.
     *
     * @param values    the values to initialize the new ExcludedRule object with.
     */
    constructor(...values: any[]);
    /**
     * Validates the given value. None of the values set in this ExcludedRule object must exist
     * in the value that is given for validation to pass.
     *
     * @param path      the name of the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
