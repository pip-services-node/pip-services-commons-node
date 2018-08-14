/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { ObjectComparator } from './ObjectComparator';

/**
 * Validation rule that requires at least one of the set values to be present for validation to pass.
 */
export class IncludedRule implements IValidationRule {
    private readonly _values: any[];

    /**
     * Creates a new IncludedRule object and initializes it using the values passed.
     * 
     * @param values    the values to initialize the new IncludedRule object with.
     */
    public constructor(...values: any[]) {
        this._values = values;
    }

    /**
     * Validates the given value, which must be found amongst the values set in this IncludedRule object 
     * for validation to pass.
     * 
     * @param path      the dot notation path to the value that is to be validated.
     * @param schema    (not used in this implementation).
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        if (!this._values) return;

        let name = path || "value";
        let found: boolean = false;

        for (var i = 0; i < this._values.length && !found; i++) {
            let thisValue: any = this._values[i];

            if (ObjectComparator.compare(value, 'EQ', thisValue)) {
                found = true;
                break;
            }
        }

        if (!found) {
            results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_NOT_INCLUDED",
                    name + " must be one of " + this._values,
                    this._values,
                    null
                )
            );
        }
    }

}