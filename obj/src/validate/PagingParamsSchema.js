"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module validate */
const TypeCode_1 = require("../convert/TypeCode");
const ObjectSchema_1 = require("./ObjectSchema");
class PagingParamsSchema extends ObjectSchema_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty("skip", TypeCode_1.TypeCode.Long);
        this.withOptionalProperty("take", TypeCode_1.TypeCode.Long);
        this.withOptionalProperty("total", TypeCode_1.TypeCode.Boolean);
    }
}
exports.PagingParamsSchema = PagingParamsSchema;
//# sourceMappingURL=PagingParamsSchema.js.map