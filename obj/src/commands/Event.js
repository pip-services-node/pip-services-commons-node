"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvocationException_1 = require("../errors/InvocationException");
/**
 * Events consist of a name and a set of listeners. Listeners are notified whenever
 * the event is raised and can be added or removed as needed. Events can be used for
 * asynchronous method calling.
 *
 * @see [[IEvent]]
 */
var Event = /** @class */ (function () {
    /**
     * Initializes a new event object using the given event name.
     *
     * @param name  the name of the event that is to be created.
     * @throws an Error if the name is null.
     */
    function Event(name) {
        if (!name)
            throw new Error("Name cannot be null");
        this._name = name;
    }
    /**
     * @returns the name of this event.
     */
    Event.prototype.getName = function () {
        return this._name;
    };
    /**
     * @returns the listeners that are to receive notifications for this event.
     */
    Event.prototype.getListeners = function () {
        return this._listeners;
    };
    /**
     * Adds a listener to receive notifications for this event.
     *
     * @param listener      the listener reference to add.
     */
    Event.prototype.addListener = function (listener) {
        this._listeners.push(listener);
    };
    /**
     * Removes a listener, so that it no longer receives notifications for this event.
     *
     * @param listener      the listener reference to remove.
     */
    Event.prototype.removeListener = function (listener) {
        var index = this._listeners.indexOf(listener);
        if (index > -1)
            this._listeners.splice(index, 1);
    };
    /**
     * Raises this event and notifies the listeners referenced using the correlationId
     * and [[Parameters parameters]] (arguments) given.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param args              the parameters to raise this event with.
     * @throws an [[InvocationException]] if the event fails to be raised.
     */
    Event.prototype.notify = function (correlationId, args) {
        for (var i = 0; i < this._listeners.length; i++) {
            try {
                var listener = this._listeners[i];
                listener.onEvent(correlationId, this, args);
            }
            catch (ex) {
                throw new InvocationException_1.InvocationException(correlationId, "EXEC_FAILED", "Raising event " + this.getName() + " failed: " + ex)
                    .withDetails("event", this.getName())
                    .wrap(ex);
            }
        }
    };
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map