"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
/** @hidden */
var _ = require('lodash');
/**
 * Helper class that contains methods for working with an object's methods.
 */
var MethodReflector = /** @class */ (function () {
    function MethodReflector() {
    }
    /** Used to identify methods by their names and verify that they are indeed methods. */
    MethodReflector.matchMethod = function (methodName, methodValue, expectedName) {
        if (!_.isFunction(methodValue))
            return false;
        if (_.startsWith(methodName, '_'))
            return false;
        if (expectedName == null)
            return true;
        return methodName.toLowerCase() == expectedName;
    };
    /**
     * Static method that checks whether or not an object has a method with the given name.
     *
     * @param obj 	the object to search for the given method in. Cannot be <code>null</code>.
     * @param name 	the name of the method to search for. Cannot be <code>null</code>.
     * @returns whether or not a method with the given name was found in the object.
     *
     * @throws an Error if 'obj' or 'name' are <code>null</code>.
     */
    MethodReflector.hasMethod = function (obj, name) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Method name cannot be null");
        name = name.toLowerCase();
        for (var method in obj) {
            var methodValue = obj[method];
            if (MethodReflector.matchMethod(method, methodValue, name))
                return true;
        }
        return false;
    };
    /**
     * Static method that invokes an object's method using the method's name.
     *
     * @param obj 	the object, whose method is to be invoked. Cannot be <code>null</code>.
     * @param name 	the name of the method that is to be invoked. Cannot be <code>null</code>.
     * @param args 	the arguments that should be passed to the method.
     * @returns the value that is returned by the invoked method.
     *
     * @throws an Error if 'obj' or 'name' are <code>null</code>.
     */
    MethodReflector.invokeMethod = function (obj, name) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Method name cannot be null");
        name = name.toLowerCase();
        for (var method in obj) {
            var methodValue = obj[method];
            try {
                if (MethodReflector.matchMethod(method, methodValue, name))
                    return methodValue.apply(obj, args);
            }
            catch (ex) {
                // Ignore exceptions
            }
        }
        return null;
    };
    /**
     * Static method that retrieves the names of an object's methods.
     *
     * @param obj   the object, whose method names are to be retrieved.
     * @returns a string array, containing the names of the object's methods.
     */
    MethodReflector.getMethodNames = function (obj) {
        var methods = [];
        for (var method in obj) {
            var methodValue = obj[method];
            if (MethodReflector.matchMethod(method, methodValue, null))
                methods.push(method);
        }
        return methods;
    };
    return MethodReflector;
}());
exports.MethodReflector = MethodReflector;
//# sourceMappingURL=MethodReflector.js.map