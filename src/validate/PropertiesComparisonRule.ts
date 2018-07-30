/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ObjectComparator } from './ObjectComparator';
import { ValidationResultType } from './ValidationResultType';
import { ObjectReader } from '../reflect/ObjectReader';

/**
 * Validation rule that requires an object's properties to be in a certain relation for validation to pass successfully.
 */
export class PropertiesComparisonRule implements IValidationRule {
    private readonly _property1: string;
    private readonly _property2: string;
    private readonly _operation: string;

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
    public constructor(property1: string, operation: string, property2: string) {
        this._property1 = property1;
        this._property2 = property2;
        this._operation = operation;
    }

    /**
     * Validates that the set properties of 'value' are in a certain relation to one another. The 'operation' that is set 
     * in this object must pass upon being applied to the passed value's 'property1' and 'property2' for validation to pass.
     * For example: if the operation ">=" is set, it will validate that "value.property1 >= value.property2".
     * 
     * Properties are retrieved from the value using [[ObjectReader.getProperty]], and comparison is done using 
     * [[ObjectComparator.compare]].
     * 
     * @param path      the name of the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value, whose properties are to be validated.
     * @param results   the results of the validation.
     * 
     * @see [[constructor]]
     * @see [[ObjectReader.getProperty]]
     * @see [[ObjectComparator.compare]]
     */
    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        let name = path || "value";
        let value1 = ObjectReader.getProperty(value, this._property1);
        let value2 = ObjectReader.getProperty(value, this._property2);

        if (!ObjectComparator.compare(value1, this._operation, value2)) {
            results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "PROPERTIES_NOT_MATCH",
                    name + " must have " + this._property1 + " " + this._operation + " " + this._property2,
                    value2,
                    value1
                )
            );
        }
    }

}
