/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
/**
 * Validation rule that requires an object's properties to be in a certain relation for validation to pass successfully.
 */
export declare class PropertiesComparisonRule implements IValidationRule {
    private readonly _property1;
    private readonly _property2;
    private readonly _operation;
    /**
     * Creates a new PropertiesComparisonRule object and initializes it using the passed pair of properties.
     *
     * @param property1     the first property in the pair.
     * @param operation     the operation to apply to the pair of properties.
     *                      For example: the operation ">=" validates that "property1 >= property2".
     * @param property2     the second property in the pair.
     *
     * @see [[ObjectComparator.compare]]
     */
    constructor(property1: string, operation: string, property2: string);
    /**
     * Validates that the set properties of 'value' are in a certain relation to one another. The 'operation' that is set
     * in this object must pass upon being applied to the passed value's 'property1' and 'property2' for validation to pass.
     * For example: if the operation ">=" is set, it will validate that "value.property1 >= value.property2".
     *
     * Properties are retrieved from the value using [[ObjectReader.getProperty]], and comparison is done using
     * [[ObjectComparator.compare]].
     *
     * @param path      the dot notation path to the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value, whose properties are to be validated.
     * @param results   the results of the validation.
     *
     * @see [[constructor]]
     * @see [[ObjectReader.getProperty]]
     * @see [[ObjectComparator.compare]]
     */
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
