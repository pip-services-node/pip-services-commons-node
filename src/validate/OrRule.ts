/** @module validate */
import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';

/**
 * Validation rule that requires any of the set rules to pass for validation to pass.
 */
export class OrRule implements IValidationRule {
    private readonly _rules: IValidationRule[];

    /**
     * Creates a new OrRule object and initializes it using the rules passed.
     * 
     * @param rules     the rules to initialize the new OrRule object with.
     */
    public constructor(...rules: IValidationRule[]) {
        this._rules = rules;
    }

    /**
     * Validates the given value by calling the [[IValidationRule.validate validate]] method for 
     * each rule that is set in this OrRule object, until at least one validation passes successfully.
     * 
     * @param path      the name of the value that is to be validated.
     * @param schema    the schema to use for validation.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        if (!this._rules || this._rules.length == 0) return;

        let localResults: ValidationResult[] = [];

        for (var i = 0; i < this._rules.length; i++) {
            var resultCount = localResults.length;

            this._rules[i].validate(path, schema, value, localResults);

            if (resultCount == localResults.length) return;
        }

        results.push.apply(results, localResults);
    }

}
