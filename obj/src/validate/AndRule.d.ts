/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
/**
 * Validation rule that requires all set rules to pass for validation to pass.
 */
export declare class AndRule implements IValidationRule {
    private readonly _rules;
    /**
     * Creates a new AndRule object and initializes it using the rules passed.
     *
     * @param rules     the [[IValidationRule rules]] to initialize the new AndRule object with.
     *
     * @see [[IValidationRule]]
     */
    constructor(...rules: IValidationRule[]);
    /**
     * Validates the given value by calling the [[IValidationRule.validate validate]] method for
     * each rule that is set in this AndRule object.
     *
     * @param path      the dot notation path to the value that is to be validated.
     * @param schema    the schema to use for validation.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
