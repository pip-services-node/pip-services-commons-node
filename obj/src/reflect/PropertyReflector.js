"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
let _ = require('lodash');
class PropertyReflector {
    static matchField(fieldName, fieldValue, expectedName) {
        if (_.isFunction(fieldValue))
            return false;
        if (_.startsWith(fieldName, '_'))
            return false;
        if (expectedName == null)
            return true;
        return fieldName.toLowerCase() == expectedName;
    }
    static hasProperty(obj, name) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Property name cannot be null");
        name = name.toLowerCase();
        for (let field in obj) {
            let fieldValue = obj[field];
            if (PropertyReflector.matchField(field, fieldValue, name))
                return true;
        }
        return false;
    }
    static getProperty(obj, name) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Property name cannot be null");
        name = name.toLowerCase();
        for (let field in obj) {
            let fieldValue = obj[field];
            try {
                if (PropertyReflector.matchField(field, fieldValue, name))
                    return fieldValue;
            }
            catch (ex) {
                // Ignore exceptions
            }
        }
        return null;
    }
    static getPropertyNames(obj) {
        let properties = [];
        for (let field in obj) {
            let fieldValue = obj[field];
            if (PropertyReflector.matchField(field, fieldValue, null))
                properties.push(field);
        }
        return properties;
    }
    static getProperties(obj) {
        let map = {};
        for (let field in obj) {
            let fieldValue = obj[field];
            try {
                if (PropertyReflector.matchField(field, fieldValue, null))
                    map[field] = fieldValue;
            }
            catch (ex) {
                // Ignore exception
            }
        }
        return map;
    }
    static setProperty(obj, name, value) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Property name cannot be null");
        let expectedName = name.toLowerCase();
        for (let field in obj) {
            let fieldValue = obj[field];
            try {
                if (PropertyReflector.matchField(field, fieldValue, expectedName)) {
                    obj[field] = value;
                    return;
                }
            }
            catch (ex) {
                // Ignore exception
            }
        }
        // If no existing properties found set it directly
        obj[name] = value;
    }
    static setProperties(obj, values) {
        if (values == null)
            return;
        for (let field in values) {
            let fieldValue = values[field];
            PropertyReflector.setProperty(obj, field, fieldValue);
        }
    }
}
exports.PropertyReflector = PropertyReflector;
//# sourceMappingURL=PropertyReflector.js.map