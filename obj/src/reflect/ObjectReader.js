"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
let _ = require('lodash');
const PropertyReflector_1 = require("./PropertyReflector");
const IntegerConverter_1 = require("../convert/IntegerConverter");
class ObjectReader {
    static getValue(obj) {
        // Todo: just a blank implementation for compatibility
        return obj;
    }
    static hasProperty(obj, name) {
        if (obj == null || name == null) {
            return false;
        }
        else if (_.isObject(obj) && !_.isDate(obj)) {
            return PropertyReflector_1.PropertyReflector.hasProperty(obj, name);
        }
        else if (_.isArray(obj)) {
            let index = IntegerConverter_1.IntegerConverter.toNullableInteger(name);
            return index != null && index < obj.length;
        }
        else {
            return false;
        }
    }
    static getProperty(obj, name) {
        if (obj == null || name == null) {
            return null;
        }
        else if (_.isObject(obj) && !_.isDate(obj)) {
            return PropertyReflector_1.PropertyReflector.getProperty(obj, name);
        }
        else if (_.isArray(obj)) {
            let index = IntegerConverter_1.IntegerConverter.toNullableInteger(name);
            return index != null && index < obj.length ? obj[index] : null;
        }
        else {
            return null;
        }
    }
    static getPropertyNames(obj) {
        let properties = [];
        if (obj == null) {
            // Do nothing
        }
        else if (_.isObject(obj) && !_.isDate(obj)) {
            properties = PropertyReflector_1.PropertyReflector.getPropertyNames(obj);
        }
        else if (_.isArray(obj)) {
            let length = obj.length;
            for (let index = 0; index < length; index++)
                properties.push(index.toString());
        }
        else {
            // Do nothing
        }
        return properties;
    }
    static getProperties(obj) {
        let map = {};
        if (obj == null) {
            // Do nothing
        }
        else if (_.isObject(obj) && !_.isDate(obj)) {
            map = PropertyReflector_1.PropertyReflector.getProperties(obj);
        }
        else if (_.isArray(obj)) {
            let length = obj.length;
            for (let index = 0; index < length; index++)
                map[index.toString()] = obj[index];
        }
        else {
            // Do nothing
        }
        return map;
    }
}
exports.ObjectReader = ObjectReader;
//# sourceMappingURL=ObjectReader.js.map