/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
/**
 * Validation rule that requires only one of the properties that are set to be present for validation
 * to pass.
 */
export declare class OnlyOneExistsRule implements IValidationRule {
    private readonly _properties;
    /**
     * Creates a new OnlyOneExistRule object and initializes it using the properties passed.
     *
     * @param properties    the properties to initialize the new OnlyOneExistRule object with.
     */
    constructor(...properties: string[]);
    /**
     * Validates the passed value. Only one of the properties set in this OnlyOneExistRule
     * object must exist in the given value for validation to pass.
     *
     * @param path      the name of the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
