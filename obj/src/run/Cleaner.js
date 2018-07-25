"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
var _ = require('lodash');
var async = require('async');
/**
 * Helper class that can be used to clean the data of components.
 *
 * @see [[ICleanable]]
 */
var Cleaner = /** @class */ (function () {
    function Cleaner() {
    }
    /**
     * Static method for cleaning a component. For a component to be cleaned, it must implement
     * the [[ICleanable]] interface. This method calls ICleanable's [[ICleanable.clear clear]] method
     * to clear the component passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param component 		the component that is to be cleaned.
     * @param callback 			the function to call when the clearing process is complete. It will
     * 							be called with an error, if one is raised.
     *
     * @see [[ICleanable]]
     */
    Cleaner.clearOne = function (correlationId, component, callback) {
        if (_.isFunction(component.clear)) {
            try {
                component.clear(correlationId);
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
     * Static method for cleaning multiple components. For a component to be cleaned, it must implement
     * the [[ICleanable]] interface. This method calls the static [[clearOne]] method for each of the
     * components passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param components 		the list of components that are to be cleaned.
     * @param callback 			the function to call when the clearing process is complete. It will
     * 							be called with an error, if one is raised.
     *
     * @see [[clearOne]]
     * @see [[ICleanable]]
     */
    Cleaner.clear = function (correlationId, components, callback) {
        async.eachSeries(components, function (component, callback) {
            Cleaner.clearOne(correlationId, component, callback);
        }, function (err) {
            if (callback)
                callback(err);
            else if (err)
                throw err;
        });
    };
    return Cleaner;
}());
exports.Cleaner = Cleaner;
//# sourceMappingURL=Cleaner.js.map