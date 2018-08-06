/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ObjectComparator } from './ObjectComparator';
import { ValidationResultType } from './ValidationResultType';
import { ObjectReader } from '../reflect/ObjectReader';

/**
 * Validation rule that requires values to be in a certain relation to the value that is set in the rule.
 */
export class ValueComparisonRule implements IValidationRule {
    private readonly _value: any;
    private readonly _operation: string;

    /**
     * Creates a new ValueComparisonRule object and initializes it using the passed operation and value.
     * 
     * @param operation     the operation to use for comparing values. For example: the operation ">=" 
     *                      validates that "someValue >= value".
     * @param value         the value to validate other values with, using the set operation.
     */
    public constructor(operation: string, value: any) {
        this._operation = operation;
        this._value = value;
    }

    /**
     * Validates that the value passed is in a certain relation to the value that is set in this ValueComparisonRule object. 
     * For example: if the operation ">=" is set, it will validate that "value >= this.value".
     * 
     * Comparison is done using ObjectComparator's [[ObjectComparator.compare compare]] method.
     * 
     * @param path      the dot notation path to the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     * 
     * @see [[ObjectComparator.compare]]
     */
    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        let name = path || "value";

        if (!ObjectComparator.compare(value, this._operation, this._value)) {
            results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "BAD_VALUE",
                    name + " must " + this._operation + " " + this._value + " but found " + value,
                    this._operation + " " + this._value,
                    value
                )
            );
        }
    }

}