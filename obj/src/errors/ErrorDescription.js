"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class allows us to represent ApplicationExceptions in a serializable form.
 *
 * When an exception is raised, the {@link ApplicationException} class (or its child)
 * can be used to structurize the exception. Afterwards, the ApplicationException can be
 * transformed it into an ErrorDescription using the {@link ErrorDescriptionFactory}, serialized
 * in one language, transferred to the receiving side, and deserialized in another language.
 *
 * After deserialization, one of the following is done:
 *
 * - if the exception was initally a child of ApplicationException, the exception's class can be
 * restored using the {@link ApplicationExceptionFactory}.
 *
 * - if a specific exception was raised and transferred between microservices that are written
 * in different languages, then the exception type that is closest to the original exception's
 * type can be chosen from the exceptions available in the target language.
 * This provides cross-language error propagation via serialization.
 *
 * @see ApplicationException
 * @see ApplicationExceptionFactory
 */
var ErrorDescription = /** @class */ (function () {
    function ErrorDescription() {
    }
    return ErrorDescription;
}());
exports.ErrorDescription = ErrorDescription;
//# sourceMappingURL=ErrorDescription.js.map