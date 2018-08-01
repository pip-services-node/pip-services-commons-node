/** @module validate */
/**
 * Used to categorize validation results and indicate the result's type.
 *
 * @see [[ValidationResult]]
 */
export declare enum ValidationResultType {
    /** Validation passed and the validation result contains additional information. */
    Information = 0,
    /** Validation gave a warning and, if strict mode is being used, a [[ValidationException]] should be raised. */
    Warning = 1,
    /** Validation failed with an error and a [[ValidationException]] should be raised. */
    Error = 2
}
