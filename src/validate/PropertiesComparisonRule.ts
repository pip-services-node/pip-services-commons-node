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
 * must be successfully applied to the properties of the value that are set.
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
     * @param property2     the first property in the pair.
     */
    public constructor(property1: string, operation: string, property2: string) {
        this._property1 = property1;
        this._property2 = property2;
        this._operation = operation;
    }

    /**
     * Validates the passed value against the value set in this PropertiesComparisonRule object. 
     * The operation set in this object must pass upon being applied to the given and set values 
     * for validation to pass.
     * 
     * Properties are retrieved from the value using the ObjectComparator class's 
     * [[ObjectComparator.getProperty getProperty]] method.
     * 
     * @param path      the name of the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value, whose properties are to be validated.
     * @param results   the results of the validation.
     * 
     * @see [[ObjectComparator.getProperty]]
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
