"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module validate */
const TypeCode_1 = require("../convert/TypeCode");
const ArraySchema_1 = require("./ArraySchema");
class ProjectionParamsSchema extends ArraySchema_1.ArraySchema {
    constructor() {
        super(TypeCode_1.TypeCode.String);
    }
}
exports.ProjectionParamsSchema = ProjectionParamsSchema;
//# sourceMappingURL=ProjectionParamsSchema.js.map