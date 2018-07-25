"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module refer */
const InternalException_1 = require("../errors/InternalException");
/**
 * Exception thrown when required component is not found in references
 */
class ReferenceException extends InternalException_1.InternalException {
    constructor(correlationId, locator) {
        super(correlationId, "REF_ERROR", "Failed to obtain reference to " + locator);
        this.withDetails("locator", locator);
    }
}
exports.ReferenceException = ReferenceException;
//# sourceMappingURL=ReferenceException.js.map