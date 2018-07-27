/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ObjectComparator } from './ObjectComparator';
import { ValidationResultType } from './ValidationResultType';
import { ObjectReader } from '../reflect/ObjectReader';

//TODO - check attentively
/**
 * Validation rule that requires the operation that is set to pass successfully. For validation to pass, the operation 
 * must be successfully applied to the value that is being validated and the set value.
 */
export class ValueComparisonRule implements IValidationRule {
    private readonly _value: any;
    private readonly _operation: string;

    /**
     * Creates a new ValueComparisonRule object and initializes it using the passed operation and value.
     * 
     * @param operation     the operation to use to compare values.
     * @param value         the value to validate other values against, using the set operation.
     */
    public constructor(operation: string, value: any) {
        this._operation = operation;
        this._value = value;
    }

    /**
     * Validates the passed value against the value set in this ValueComparisonRule object. The operation 
     * set in this object must pass upon being applied to the given and set values for validation to pass.
     * 
     * Comparison is done using the ObjectComparator class's [[ObjectComparator.compare compare]] method.
     * 
     * @param path      the name of the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated against the set value.
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