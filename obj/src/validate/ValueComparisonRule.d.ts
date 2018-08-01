/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
/**
 * Validation rule that requires values to be in a certain relation to the value that is set in the rule.
 */
export declare class ValueComparisonRule implements IValidationRule {
    private readonly _value;
    private readonly _operation;
    /**
     * Creates a new ValueComparisonRule object and initializes it using the passed operation and value.
     *
     * @param operation     the operation to use for comparing values. For example: the operation ">="
     *                      validates that "someValue >= value".
     * @param value         the value to validate other values with, using the set operation.
     */
    constructor(operation: string, value: any);
    /**
     * Validates that the value passed is in a certain relation to the value that is set in this ValueComparisonRule object.
     * For example: if the operation ">=" is set, it will validate that "value >= this.value".
     *
     * Comparison is done using ObjectComparator's [[ObjectComparator.compare compare]] method.
     *
     * @param path      the name of the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     *
     * @see [[ObjectComparator.compare]]
     */
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
