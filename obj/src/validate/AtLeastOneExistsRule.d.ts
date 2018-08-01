/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
/**
 * Validation rule that requires at least one of the properties that are set to be present for validation
 * to pass.
 */
export declare class AtLeastOneExistsRule implements IValidationRule {
    private readonly _properties;
    /**
     * Creates a new AtLeastOneExistRule object and initializes it using the properties passed.
     *
     * @param properties    the properties to initialize the new AtLeastOneExistRule object with.
     */
    constructor(...properties: string[]);
    /**
     * Validates the passed value. At least one of the properties set in this AtLeastOneExistRule
     * object must exist in the given value for validation to pass.
     *
     * @param path      the name of the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
