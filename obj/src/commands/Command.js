"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module commands */
let _ = require('lodash');
const InvocationException_1 = require("../errors/InvocationException");
class Command {
    constructor(name, schema, func) {
        if (!name)
            throw new Error("Name cannot be null");
        if (!func)
            throw new Error("Function cannot be null");
        this._name = name;
        this._schema = schema;
        if (!_.isFunction(func))
            this._function = func.execute;
        else
            this._function = func;
        if (!_.isFunction(this._function))
            throw new Error("Function doesn't have function type");
    }
    getName() {
        return this._name;
    }
    execute(correlationId, args, callback) {
        if (this._schema) {
            try {
                this._schema.validateAndThrowException(correlationId, args);
            }
            catch (ex) {
                callback(ex, null);
                return;
            }
        }
        try {
            this._function(correlationId, args, callback);
        }
        catch (ex) {
            let err = new InvocationException_1.InvocationException(correlationId, "EXEC_FAILED", "Execution " + this.getName() + " failed: " + ex).withDetails("command", this.getName()).wrap(ex);
            callback(err, null);
        }
    }
    validate(args) {
        if (this._schema)
            return this._schema.validate(args);
        return [];
    }
}
exports.Command = Command;
//# sourceMappingURL=Command.js.map