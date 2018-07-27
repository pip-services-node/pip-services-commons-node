/** @module validate */
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { BadRequestException } from '../errors/BadRequestException';

//TODO - check attentively
/**
 * Caused by errors in validation.
 */
export class ValidationException extends BadRequestException {
    private static readonly SerialVersionUid: number = -1459801864235223845;

    public constructor(correlationId: string, message?: string, results?: ValidationResult[]) {
        super(correlationId, "INVALID_DATA", message || ValidationException.composeMessage(results));

        if (results)
            this.withDetails("results", results);
    }

    public static composeMessage(results: ValidationResult[]): string {
        let builder: string = "Validation failed";

        if (results && results.length > 0) {
            var first = true;
            for (var i = 0; i < results.length; i++) {
                let result: ValidationResult = results[i];

                if (result.getType() == ValidationResultType.Information)
                    continue;

                builder += !first ? ": " : ", ";
                builder += result.getMessage();
                first = false;
            }
        }

        return builder;
    }

    /**
     * Static method that returns a [[ValidationException]] when any [[ValidationResultType.Error Errors]] 
     * are present in the [[ValidationResult validation results]]. If strict is set to <code>true</code>,
     * then [[ValidationResultType.Warning Warnings]] will also return a ValidationException.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param results           the results of a validation.
     * @param strict            defines whether or not an exception should be returned if a Warning 
     *                          is found in the results.
     * 
     * @see [[ValidationResult]]
     * @see [[ValidationException]]
     * @see [[ValidationResultType]]
     */
    public static fromResults(correlationId: string, results: ValidationResult[], strict: boolean): ValidationException {
        var hasErrors = false;

        for (var i = 0; i < results.length; i++) {
            let result: ValidationResult = results[i];

            if (result.getType() == ValidationResultType.Error)
                hasErrors = true;

            if (strict && result.getType() == ValidationResultType.Warning)
                hasErrors = true;
        }

        return hasErrors ? new ValidationException(correlationId, null, results) : null;
    }

    /**
     * Static method that throws a [[ValidationException]] when any [[ValidationResultType.Error Errors]] 
     * are present in the [[ValidationResult validation results]]. If strict is set to <code>true</code>,
     * then [[ValidationResultType.Warning Warnings]] will also cause a ValidationException to be thrown.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param results           the results of a validation.
     * @param strict            defines whether or not an exception should be returned if a [[ValidationResultType.Warning Warning]] 
     *                          is found in the results.
     * 
     * @see [[ValidationResult]]
     * @see [[ValidationException]]
     * @see [[ValidationResultType]]
     */
    public static throwExceptionIfNeeded(correlationId: string, results: ValidationResult[], strict: boolean): void {
        let ex = ValidationException.fromResults(correlationId, results, strict);
        if (ex) throw ex;
    }

}
