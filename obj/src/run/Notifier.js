"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
let _ = require('lodash');
/**
 * Helper class that can be used to trigger notifications for components.
 */
class Notifier {
    /**
     * Static method for triggering notifications for a component. For a component to be notified, it must
     * implement the [[INotifiable]] interface. This method calls INotifiable's [[INotifiable.notify notify]]
     * method to notify the component passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param component 		the component that is to be notified.
     * @param args              the parameters (arguments) to pass to the component.
     *
     * @see [[INotifiable]]
     */
    static notifyOne(correlationId, component, args) {
        if (_.isFunction(component.notify))
            component.notify(correlationId, args);
    }
    /**
     * Static method for triggering notifications for multiple components. For a component to be notified,
     * it must implement the [[INotifiable]] interface. This method calls the static [[notifyOne]] method
     * for each of the components passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param components 		the list of components that are to be notified.
     * @param args              the parameters (arguments) to pass to the components.
     *
     * @see [[notifyOne]]
     * @see [[INotifiable]]
     */
    static notify(correlationId, components, args) {
        if (components == null)
            return;
        for (let index = 0; index < components.length; index++)
            Notifier.notifyOne(correlationId, components[index], args);
    }
}
exports.Notifier = Notifier;
//# sourceMappingURL=Notifier.js.map