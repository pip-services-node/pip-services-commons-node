"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
let _ = require('lodash');
class MethodReflector {
    static matchMethod(methodName, methodValue, expectedName) {
        if (!_.isFunction(methodValue))
            return false;
        if (_.startsWith(methodName, '_'))
            return false;
        if (expectedName == null)
            return true;
        return methodName.toLowerCase() == expectedName;
    }
    static hasMethod(obj, name) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Method name cannot be null");
        name = name.toLowerCase();
        for (let method in obj) {
            let methodValue = obj[method];
            if (MethodReflector.matchMethod(method, methodValue, name))
                return true;
        }
        return false;
    }
    static invokeMethod(obj, name, ...args) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Method name cannot be null");
        name = name.toLowerCase();
        for (let method in obj) {
            let methodValue = obj[method];
            try {
                if (MethodReflector.matchMethod(method, methodValue, name))
                    return methodValue.apply(obj, args);
            }
            catch (ex) {
                // Ignore exceptions
            }
        }
        return null;
    }
    static getMethodNames(obj) {
        let methods = [];
        for (let method in obj) {
            let methodValue = obj[method];
            if (MethodReflector.matchMethod(method, methodValue, null))
                methods.push(method);
        }
        return methods;
    }
}
exports.MethodReflector = MethodReflector;
//# sourceMappingURL=MethodReflector.js.map