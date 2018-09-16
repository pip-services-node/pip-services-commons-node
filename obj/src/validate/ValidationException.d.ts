/** @module validate */
import { ValidationResult } from './ValidationResult';
import { BadRequestException } from '../errors/BadRequestException';
/**
 * Caused by errors in validation. If using strict mode, warnings will also raise validation exceptions.
 */
export declare class ValidationException extends BadRequestException {
    private static readonly SerialVersionUid;
    /**
     * Creates a new ValidationException and initializes it using the given parameters.
     * If no message is given, [[composeMessage]] will be used to generate a message using the
     * given 'results'. Otherwise, the 'results' will be included as details.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param message           (optional) the message to include in this exception.
     * @param results           (optional) the validation results to include as details in this exception.
     *
     * @see [[composeMessage]]
     * @see [[ValidationResult]]
     * @see [[ApplicationException]]
     */
    constructor(correlationId: string, message?: string, results?: ValidationResult[]);
    /**
     * Static method that generates a message string for the given [[ValidationResult validation results]].
     *
     * @param results   the validation results to convert into a message string.
     * @returns the generated message string. For example: "Validation failed: <ErrorResult1>, <ErrorResult2>"
     */
    static composeMessage(results: ValidationResult[]): string;
    /**
     * Static method that returns a [[ValidationException]] when any [[ValidationResultType.Error Errors]]
     * are present in the given [[ValidationResult validation results]]. If strict is set to <code>true</code>,
     * then [[ValidationResultType.Warning Warnings]] will also cause a ValidationException to be returned.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param results           the results of a validation.
     * @param strict            defines whether or not an exception should be returned if a Warning
     *                          is found in the results.
     *
     * @see [[ValidationResult]]
     * @see [[ValidationException]]
     * @see [[ValidationResultType]]
     */
    static fromResults(correlationId: string, results: ValidationResult[], strict: boolean): ValidationException;
    /**
     * Static method that throws a [[ValidationException]] when any [[ValidationResultType.Error Errors]]
     * are present in the [[ValidationResult validation results]]. If strict is set to <code>true</code>,
     * then [[ValidationResultType.Warning Warnings]] will also cause a ValidationException to be thrown.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param results           the results of a validation.
     * @param strict            defines whether or not an exception should be returned if a Warning
     *                          is found in the results.
     *
     * @see [[ValidationResult]]
     * @see [[ValidationException]]
     * @see [[ValidationResultType]]
     */
    static throwExceptionIfNeeded(correlationId: string, results: ValidationResult[], strict: boolean): void;
}
