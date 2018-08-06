/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';

/**
 * Validation rule that requires the set rule to fail for validation to pass.
 */
export class NotRule implements IValidationRule {
    private readonly _rule: IValidationRule;

    /**
     * Creates a new NotRule object and initializes it using the rule passed.
     * 
     * @param rule     the "not" rule to initialize the new NotRule object with.
     */
    public constructor(rule: IValidationRule) {
        this._rule = rule;
    }

    /**
     * Validates the given value by calling the [[IValidationRule.validate validate]] method of 
     * the "not" rule that is set in this NotRule object. Validation fails if validation of the 
     * "not" rule passes.
     * 
     * @param path      the dot notation path to the value that is to be validated.
     * @param schema    the schema to use for validation.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        if (!this._rule) return;

        let name = path || "value";
        let localResults: ValidationResult[] = [];

        this._rule.validate(path, schema, value, localResults);

        if (localResults.length > 0) return;

        results.push(
            new ValidationResult(
                path,
                ValidationResultType.Error,
                "NOT_FAILED",
                "Negative check for " + name + " failed",
                null,
                null
            )
        );
    }

}
