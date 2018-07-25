"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
var _ = require('lodash');
var async = require('async');
/**
 * Helper class that can be used to close components.
 */
var Closer = /** @class */ (function () {
    function Closer() {
    }
    /**
     * Static method for closing a component. For a component to be closed, it must implement
     * the [[IClosable]] interface. This method calls ICloseable's [[ICloseable.close close]] method
     * to close the component passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param component 		the component that is to be closed.
     * @param callback 			the function to call when the closing process is complete. It will
     * 							be called with an error, if one is raised.
     *
     * @see [[IClosable]]
     */
    Closer.closeOne = function (correlationId, component, callback) {
        if (_.isFunction(component.close)) {
            try {
                component.close(correlationId, callback);
            }
            catch (err) {
                if (callback)
                    callback(err);
                else
                    throw err;
            }
        }
        else if (callback)
            callback(null);
    };
    /**
     * Static method for closing multiple components. For a component to be closed, it must implement
     * the [[IClosable]] interface. This method calls the static [[closeOne]] method for each of the
     * components passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param components 		the list of components that are to be closed.
     * @param callback 			the function to call when the closing process is complete. It will
     * 							be called with an error, if one is raised.
     *
     * @see [[closeOne]]
     * @see [[IClosable]]
     */
    Closer.close = function (correlationId, components, callback) {
        async.eachSeries(components, function (component, callback) {
            Closer.closeOne(correlationId, component, callback);
        }, function (err) {
            if (callback)
                callback(err);
            else if (err)
                throw err;
        });
    };
    return Closer;
}());
exports.Closer = Closer;
//# sourceMappingURL=Closer.js.map