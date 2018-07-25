"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InvocationException_1 = require("../errors/InvocationException");
class Event {
    constructor(name) {
        if (!name)
            throw new Error("Name cannot be null");
        this._name = name;
    }
    getName() {
        return this._name;
    }
    getListeners() {
        return this._listeners;
    }
    addListener(listener) {
        this._listeners.push(listener);
    }
    removeListener(listener) {
        var index = this._listeners.indexOf(listener);
        if (index > -1)
            this._listeners.splice(index, 1);
    }
    notify(correlationId, args) {
        for (var i = 0; i < this._listeners.length; i++) {
            try {
                let listener = this._listeners[i];
                listener.onEvent(correlationId, this, args);
            }
            catch (ex) {
                throw new InvocationException_1.InvocationException(correlationId, "EXEC_FAILED", "Raising event " + this.getName() + " failed: " + ex)
                    .withDetails("event", this.getName())
                    .wrap(ex);
            }
        }
    }
}
exports.Event = Event;
//# sourceMappingURL=Event.js.map