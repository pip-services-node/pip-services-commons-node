"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module commands */
/** @hidden */
var _ = require('lodash');
var InvocationException_1 = require("../errors/InvocationException");
/**
 * Implementation of the Command pattern, which provides an alternative way of calling method.
 * Instead of calling methods via their signatures, any call of any method can be represented
 * and executed using this universal Command class.
 *
 * @see [[ICommand]]
 */
var Command = /** @class */ (function () {
    /**
     * @param name      the name of the command.
     * @param schema    the command's schema.
     * @param func      the function that is to be executed by this command.
     * @throws  an Error if 'name' or 'func' are null, or if 'func' does not have
     *          a function type.
     */
    function Command(name, schema, func) {
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
    /**
     * @returns the name of this command.
     */
    Command.prototype.getName = function () {
        return this._name;
    };
    /**
     * Executes this command using the given [[Parameters parameters]] (arguments).
     *
     * @param correlationId unique business transaction id to trace calls across components.
     * @param args          the parameters (arguments) to pass to this command for execution.
     * @param callback      the function that is to be called once execution is complete. If an exception is raised,
     *                      then it will be called with the error.
     * @throws an [[InvocationException]] if the execution fails.
     *
     * @see [[Parameters]]
     * @see [[InvocationException]]
     */
    Command.prototype.execute = function (correlationId, args, callback) {
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
            var err = new InvocationException_1.InvocationException(correlationId, "EXEC_FAILED", "Execution " + this.getName() + " failed: " + ex).withDetails("command", this.getName()).wrap(ex);
            callback(err, null);
        }
    };
    /**
     * Validates the [[Parameters parameters]] (arguments) that are to be passed to this command
     * using the set schema.
     *
     * @param args  the parameters (arguments) to validate using this command's schema.
     * @returns     an array of ValidationResults or an empty array (if no schema is set).
     *
     * @see [[Parameters]]
     * @see [[ValidationResult]]
     */
    Command.prototype.validate = function (args) {
        if (this._schema)
            return this._schema.validate(args);
        return [];
    };
    return Command;
}());
exports.Command = Command;
//# sourceMappingURL=Command.js.map