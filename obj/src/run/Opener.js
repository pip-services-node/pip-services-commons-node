"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
let _ = require('lodash');
let async = require('async');
/**
 * Helper class that can be used to open components.
 */
class Opener {
    /**
     * Static method for checking whether or not a component has been opened. For a component to be checked,
     * it must implement the [[IOpenable]] interface. This method calls IOpenable's [[IOpenable.isOpened isOpened]]
     * method to check if the component has been opened.
     *
     * @param component 	the component that is to be checked.
     *
     * @see [[IOpenable]]
     */
    static isOpenedOne(component) {
        if (_.isFunction(component.isOpened))
            return component.isOpened();
        else
            return true;
    }
    /**
     * Static method for checking whether or not a list of components have been opened. For a component to be checked,
     * it must implement the [[IOpenable]] interface. This method calls the static [[isOpenedOne]] method for each
     * component passed, to check if it has been opened.
     *
     * @param components 	the list of components that are to be checked.
     *
     * @see [[isOpenedOne]]
     * @see [[IOpenable]]
     */
    static isOpened(components) {
        if (components == null)
            return true;
        let result = true;
        for (let index = 0; index < components.length; index++)
            result = result && Opener.isOpenedOne(components[index]);
        return result;
    }
    /**
     * Static method for opening a component. For a component to be opened, it must implement
     * the [[IOpenable]] interface. This method calls IOpenable's [[IOpenable.open open]] method
     * to open the component passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param component 		the component that is to be opened.
     * @param callback 			the function to call when the opening process is complete. It will
     * 							be called with an error, if one is raised.
     *
     * @see [[IOpenable]]
     */
    static openOne(correlationId, component, callback) {
        if (_.isFunction(component.open)) {
            try {
                component.open(correlationId, callback);
            }
            catch (err) {
                if (callback)
                    callback(err);
                else if (err)
                    throw err;
            }
        }
        else if (callback)
            callback(null);
    }
    /**
     * Static method for opening multiple components. For a component to be opened, it must implement
     * the [[IOpenable]] interface. This method calls the static [[openOne]] method for each of the
     * components passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param components 		the list of components that are to be opened.
     * @param callback 			the function to call when the opening process is complete. It will
     * 							be called with an error, if one is raised.
     *
     * @see [[openOne]]
     * @see [[IOpenable]]
     */
    static open(correlationId, components, callback) {
        async.eachSeries(components, (component, callback) => {
            Opener.openOne(correlationId, component, callback);
        }, (err) => {
            if (callback)
                callback(err);
            else if (err)
                throw err;
        });
    }
}
exports.Opener = Opener;
//# sourceMappingURL=Opener.js.map