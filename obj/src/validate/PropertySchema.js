"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = require("./Schema");
class PropertySchema extends Schema_1.Schema {
    constructor(required, rules, name, type) {
        super(required, rules);
        this._name = name;
        this._type = type;
    }
    getName() {
        return this._name;
    }
    setName(value) {
        this._name = value;
    }
    getType() {
        return this._type;
    }
    setType(value) {
        this._type = value;
    }
    performValidation(path, value, results) {
        path = path != "" ? path + "." + this.getName() : this.getName();
        super.performValidation(path, value, results);
        super.performTypeValidation(path, this.getType(), value, results);
    }
}
exports.PropertySchema = PropertySchema;
//# sourceMappingURL=PropertySchema.js.map