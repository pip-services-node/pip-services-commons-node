/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
/**
 * Validation rule that requires at least one of the set values to be present for validation to pass.
 */
export declare class IncludedRule implements IValidationRule {
    private readonly _values;
    /**
     * Creates a new IncludedRule object and initializes it using the values passed.
     *
     * @param values    the values to initialize the new IncludedRule object with.
     */
    constructor(...values: any[]);
    /**
     * Validates the given value, which must be found amongst the values set in this IncludedRule object
     * for validation to pass.
     *
     * @param path      the name of the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
