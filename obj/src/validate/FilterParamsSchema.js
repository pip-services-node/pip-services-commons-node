"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module validate */
const TypeCode_1 = require("../convert/TypeCode");
const MapSchema_1 = require("./MapSchema");
class FilterParamsSchema extends MapSchema_1.MapSchema {
    constructor() {
        super(null, null, TypeCode_1.TypeCode.String, null);
    }
}
exports.FilterParamsSchema = FilterParamsSchema;
//# sourceMappingURL=FilterParamsSchema.js.map