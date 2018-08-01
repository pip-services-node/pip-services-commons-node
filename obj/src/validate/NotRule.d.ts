/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
/**
 * Validation rule that requires the set rule to fail for validation to pass.
 */
export declare class NotRule implements IValidationRule {
    private readonly _rule;
    /**
     * Creates a new NotRule object and initializes it using the rule passed.
     *
     * @param rule     the "not" rule to initialize the new NotRule object with.
     */
    constructor(rule: IValidationRule);
    /**
     * Validates the given value by calling the [[IValidationRule.validate validate]] method of
     * the "not" rule that is set in this NotRule object. Validation fails if validation of the
     * "not" rule passes.
     *
     * @param path      the name of the value that is to be validated.
     * @param schema    the schema to use for validation.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
