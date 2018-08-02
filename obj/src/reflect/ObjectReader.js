"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
/** @hidden */
var _ = require('lodash');
var PropertyReflector_1 = require("./PropertyReflector");
var IntegerConverter_1 = require("../convert/IntegerConverter");
/**
 * Helper class that contains methods for reading the properties of objects.
 */
var ObjectReader = /** @class */ (function () {
    function ObjectReader() {
    }
    /**
     * Static method that gets the value of an object.
     *
     * @param obj   the object, whose value is to be retrieved.
     */
    ObjectReader.getValue = function (obj) {
        // Todo: just a blank implementation for compatibility
        return obj;
    };
    /**
     * Static method that checks whether or not an object has a property with the given name.
     * If 'obj' or 'name' are <code>null</code> -  <code>false</code> will be returned.
     *
     * @param obj       the object to search in.
     * @param name      the name of the property to search for.
     * @returns whether or not a property with the given name was found in the given object.
     */
    ObjectReader.hasProperty = function (obj, name) {
        if (obj == null || name == null) {
            return false;
        }
        else if (_.isObject(obj) && !_.isDate(obj)) {
            return PropertyReflector_1.PropertyReflector.hasProperty(obj, name);
        }
        else if (_.isArray(obj)) {
            var index = IntegerConverter_1.IntegerConverter.toNullableInteger(name);
            return index != null && index < obj.length;
        }
        else {
            return false;
        }
    };
    /**
     * Static method that retrieves the value stored in the passed object by the given property name.
     * If 'obj' or 'name' are <code>null</code> - <code>null</code> will be returned.
     *
     * @param obj   the object to read a property from.
     * @param name  the name of the property to retrieve.
     * @returns the value stored by the given property name or null (if the property cannot be read).
     */
    ObjectReader.getProperty = function (obj, name) {
        if (obj == null || name == null) {
            return null;
        }
        else if (_.isObject(obj) && !_.isDate(obj)) {
            return PropertyReflector_1.PropertyReflector.getProperty(obj, name);
        }
        else if (_.isArray(obj)) {
            var index = IntegerConverter_1.IntegerConverter.toNullableInteger(name);
            return index != null && index < obj.length ? obj[index] : null;
        }
        else {
            return null;
        }
    };
    /**
     * Static method that retrieves the names of an object's properties.
     *
     * @param obj   the object, whose property names are to be retrieved.
     * @returns a string array, containing the names of the object's properties.
     */
    ObjectReader.getPropertyNames = function (obj) {
        var properties = [];
        if (obj == null) {
            // Do nothing
        }
        else if (_.isObject(obj) && !_.isDate(obj)) {
            properties = PropertyReflector_1.PropertyReflector.getPropertyNames(obj);
        }
        else if (_.isArray(obj)) {
            var length_1 = obj.length;
            for (var index = 0; index < length_1; index++)
                properties.push(index.toString());
        }
        else {
            // Do nothing
        }
        return properties;
    };
    /**
     * Static method that retrieves an object's properties as a map.
     *
     * @param obj   the object to get a map of properties from.
     * @returns a map, containing property names and their values.
     */
    ObjectReader.getProperties = function (obj) {
        var map = {};
        if (obj == null) {
            // Do nothing
        }
        else if (_.isObject(obj) && !_.isDate(obj)) {
            map = PropertyReflector_1.PropertyReflector.getProperties(obj);
        }
        else if (_.isArray(obj)) {
            var length_2 = obj.length;
            for (var index = 0; index < length_2; index++)
                map[index.toString()] = obj[index];
        }
        else {
            // Do nothing
        }
        return map;
    };
    return ObjectReader;
}());
exports.ObjectReader = ObjectReader;
//# sourceMappingURL=ObjectReader.js.map