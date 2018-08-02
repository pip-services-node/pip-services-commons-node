/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { ObjectReader } from '../reflect/ObjectReader';

/**
 * Validation rule that requires only one of the properties that are set to be present for validation 
 * to pass.
 */
export class OnlyOneExistsRule implements IValidationRule {
    private readonly _properties: string[];

    /**
     * Creates a new OnlyOneExistsRule object and initializes it using the properties passed.
     * 
     * @param properties    the properties to initialize the new OnlyOneExistsRule object with.
     */
    public constructor(...properties: string[]) {
        this._properties = properties;
    }

    /**
     * Validates the passed value. Only one of the properties set in this OnlyOneExistsRule 
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
            let property: string = this._properties[i];

            var propertyValue = ObjectReader.getProperty(value, property);

            if (propertyValue)
                found.push(property);
        }

        if (found.length == 0) {
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
        } else if (found.length > 1) {
            results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_ONLY_ONE",
                    name + "must have only one property from " + this._properties,
                    this._properties,
                    null
                )
            );
        }
    }

}
