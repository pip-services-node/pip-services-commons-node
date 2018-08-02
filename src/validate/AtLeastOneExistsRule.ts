/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { ObjectReader } from '../reflect/ObjectReader';

/**
 * Validation rule that requires at least one of the properties that are set to be present for validation 
 * to pass.
 */
export class AtLeastOneExistsRule implements IValidationRule {
    private readonly _properties: string[];

    /**
     * Creates a new AtLeastOneExistsRule object and initializes it using the properties passed.
     * 
     * @param properties    the properties to initialize the new AtLeastOneExistsRule object with.
     */
    public constructor(...properties: string[]) {
        this._properties = properties;
    }

    /**
     * Validates the passed value. At least one of the properties set in this AtLeastOneExistsRule 
     * object must exist in the given value for validation to pass.
     * 
     * @param path      the name of the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        let name = path || "value";
        let found: string[] = [];

        for (var i = 0; i < this._properties.length; i++) {
            var propertyValue = ObjectReader.getProperty(value, this._properties[i]);
            if (propertyValue != null)
                found.push(this._properties[i]);
        }

        if (found.length === 0) {
            results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_NULL",
                    name + " must have at least one property from " + this._properties,
                    this._properties,
                    null
                )
            );
        }
    }

}