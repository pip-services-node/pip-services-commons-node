"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class for [[ICommand commands]] that were intercepted by a [[ICommandInterceptor command interceptor]]
 * and are to be executed next.
 *
 * @see [[ICommand]]
 * @see [[ICommandInterceptor]]
 */
var InterceptedCommand = /** @class */ (function () {
    /**
     * @param interceptor   the interceptor that intercepted the next command.
     * @param next          the command that is to be executed next.
     */
    function InterceptedCommand(interceptor, next) {
        this._interceptor = interceptor;
        this._next = next;
    }
    /**
     * @returns the name of the next command.
     */
    InterceptedCommand.prototype.getName = function () {
        return this._interceptor.getName(this._next);
    };
    /**
     * Executes the next [[ICommand command]] using the given [[Parameters parameters]] (arguments).
     *
     * @param correlationId unique business transaction id to trace calls across components.
     * @param args          the parameters (arguments) to pass to the command for execution.
     * @param callback      the function that is to be called once execution is complete. If an exception is raised, then
     *                      it will be called with the error.
     *
     * @see [[Parameters]]
     */
    InterceptedCommand.prototype.execute = function (correlationId, args, callback) {
        this._interceptor.execute(correlationId, this._next, args, callback);
    };
    /**
     * Validates the [[Parameters parameters]] (arguments) that are to be passed to the next
     * [[ICommand command]].
     *
     * @param args      the parameters (arguments) to validate for the next command.
     * @returns         an array of ValidationResults.
     *
     * @see [[Parameters]]
     * @see [[ValidationResult]]
     */
    InterceptedCommand.prototype.validate = function (args) {
        return this._interceptor.validate(this._next, args);
    };
    return InterceptedCommand;
}());
exports.InterceptedCommand = InterceptedCommand;
//# sourceMappingURL=InterceptedCommand.js.map