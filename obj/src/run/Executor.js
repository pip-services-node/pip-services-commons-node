"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module run */
/** @hidden */
var _ = require('lodash');
/** @hidden */
var async = require('async');
/**
 * Helper class that can be used to trigger execution of components.
 */
var Executor = /** @class */ (function () {
    function Executor() {
    }
    /**
     * Static method for triggering the execution of a component. For a component to be executed, it must
     * implement the [[IExecutable]] interface. This method calls IExecutable's [[IExecutable.execute execute]]
     * method to execute the component passed as 'component', using the [[Parameters]] passed as 'args'.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param component 		the component that is to be executed.
     * @param args              the parameters (arguments) to pass to the component for its execution.
     * @param callback 			the function to call when execution is complete. It will be called with
     *                          the result of the execution or with an error (if one is raised).
     *
     * @see [[IExecutable]]
     * @see [[Parameters]]
     */
    Executor.executeOne = function (correlationId, component, args, callback) {
        if (_.isFunction(component.execute)) {
            try {
                return component.execute(correlationId, args, callback);
            }
            catch (err) {
                callback(err, null);
            }
        }
        else
            callback(null, null);
    };
    /**
     * Static method for triggering the execution of multiple components. For a component to be executed,
     * it must implement the [[IExecutable]] interface. This method calls the static [[executeOne]] method
     * for each of the components passed, using the [[Parameters]] passed as 'args'.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param components 		the list of components that are to be executed.
     * @param args              the parameters (arguments) to pass to the components for their execution.
     * @param callback 			the function to call when execution is complete. It will be called with
     *                          the results of all executions or with an error (if one is raised).
     *
     * @see [[executeOne]]
     * @see [[IExecutable]]
     * @see [[Parameters]]
     */
    Executor.execute = function (correlationId, components, args, callback) {
        var results = [];
        async.eachSeries(components, function (component, callback) {
            Executor.executeOne(correlationId, component, args, function (err, result) {
                results.push(result);
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    return Executor;
}());
exports.Executor = Executor;
//# sourceMappingURL=Executor.js.map