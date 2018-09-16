"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
/** @hidden */
var _ = require('lodash');
/**
 * Helper class that can be used to trigger notifications for components.
 */
var Notifier = /** @class */ (function () {
    function Notifier() {
    }
    /**
     * Static method for triggering notifications for a component. For a component to be notified, it must
     * implement the [[INotifiable]] interface. This method calls INotifiable's [[INotifiable.notify notify]]
     * method to notify the component passed.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param component 		the component that is to be notified.
     * @param args              the parameters (arguments) to pass to the component.
     *
     * @see [[INotifiable]]
     */
    Notifier.notifyOne = function (correlationId, component, args) {
        if (_.isFunction(component.notify))
            component.notify(correlationId, args);
    };
    /**
     * Static method for triggering notifications for multiple components. For a component to be notified,
     * it must implement the [[INotifiable]] interface. This method calls the static [[notifyOne]] method
     * for each of the components passed.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param components 		the list of components that are to be notified.
     * @param args              the parameters (arguments) to pass to the components.
     *
     * @see [[notifyOne]]
     * @see [[INotifiable]]
     */
    Notifier.notify = function (correlationId, components, args) {
        if (components == null)
            return;
        for (var index = 0; index < components.length; index++)
            Notifier.notifyOne(correlationId, components[index], args);
    };
    return Notifier;
}());
exports.Notifier = Notifier;
//# sourceMappingURL=Notifier.js.map