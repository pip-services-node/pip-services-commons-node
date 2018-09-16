"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
/** @hidden */
var _ = require('lodash');
/** @hidden */
var async = require('async');
/**
 * Helper class that can be used to open components.
 */
var Opener = /** @class */ (function () {
    function Opener() {
    }
    /**
     * Static method for checking whether or not a component has been opened. For a component to be checked,
     * it must implement the [[IOpenable]] interface. This method calls IOpenable's [[IOpenable.isOpen isOpen]]
     * method to check if the component has been opened.
     *
     * @param component 	the component that is to be checked.
     *
     * @see [[IOpenable]]
     */
    Opener.isOpenOne = function (component) {
        if (_.isFunction(component.isOpen))
            return component.isOpen();
        else
            return true;
    };
    /**
     * Static method for checking whether or not a list of components have been opened. For a component to be checked,
     * it must implement the [[IOpenable]] interface. This method calls the static [[isOpen]] method for each
     * component passed, to check if it has been opened.
     *
     * @param components 	the list of components that are to be checked.
     *
     * @see [[isOpen]]
     * @see [[IOpenable]]
     */
    Opener.isOpen = function (components) {
        if (components == null)
            return true;
        var result = true;
        for (var index = 0; index < components.length; index++)
            result = result && Opener.isOpenOne(components[index]);
        return result;
    };
    /**
     * Static method for opening a component. For a component to be opened, it must implement
     * the [[IOpenable]] interface. This method calls IOpenable's [[IOpenable.open open]] method
     * to open the component passed.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param component 		the component that is to be opened.
     * @param callback 			the function to call when the opening process is complete. It will
     * 							be called with an error if one is raised.
     *
     * @see [[IOpenable]]
     */
    Opener.openOne = function (correlationId, component, callback) {
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
    };
    /**
     * Static method for opening multiple components. For a component to be opened, it must implement
     * the [[IOpenable]] interface. This method calls the static [[openOne]] method for each of the
     * components passed.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param components 		the list of components that are to be opened.
     * @param callback 			the function to call when the opening process is complete. It will
     * 							be called with an error if one is raised.
     *
     * @see [[openOne]]
     * @see [[IOpenable]]
     */
    Opener.open = function (correlationId, components, callback) {
        async.eachSeries(components, function (component, callback) {
            Opener.openOne(correlationId, component, callback);
        }, function (err) {
            if (callback)
                callback(err);
            else if (err)
                throw err;
        });
    };
    return Opener;
}());
exports.Opener = Opener;
//# sourceMappingURL=Opener.js.map