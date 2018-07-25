"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InterceptedCommand {
    constructor(intercepter, next) {
        this._intercepter = intercepter;
        this._next = next;
    }
    getName() {
        return this._intercepter.getName(this._next);
    }
    execute(correlationId, args, callback) {
        this._intercepter.execute(correlationId, this._next, args, callback);
    }
    validate(args) {
        return this._intercepter.validate(this._next, args);
    }
}
exports.InterceptedCommand = InterceptedCommand;
//# sourceMappingURL=InterceptedCommand.js.map