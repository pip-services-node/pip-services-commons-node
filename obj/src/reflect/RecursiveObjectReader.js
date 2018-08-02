"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
/** @hidden */
var _ = require('lodash');
var TypeCode_1 = require("../convert/TypeCode");
var TypeConverter_1 = require("../convert/TypeConverter");
var ObjectReader_1 = require("./ObjectReader");
//TODO - private methods?
/**
 * Helper class that contains methods for reading nested object properties recursively.
 */
var RecursiveObjectReader = /** @class */ (function () {
    function RecursiveObjectReader() {
    }
    /**
     * Private static method that recursively check whether or not the given object contains a property,
     * whose nested name correspond to 'names'. The 'nameIndex' is used to track the depth of recursion.
     */
    RecursiveObjectReader.performHasProperty = function (obj, names, nameIndex) {
        if (nameIndex < names.length - 1) {
            var value = ObjectReader_1.ObjectReader.getProperty(obj, names[nameIndex]);
            if (value != null)
                return RecursiveObjectReader.performHasProperty(value, names, nameIndex + 1);
            else
                return false;
        }
        else
            return ObjectReader_1.ObjectReader.hasProperty(obj, names[nameIndex]);
    };
    /**
     * Static method that checks whether or not an object contains a nested property with the given
     * name (in dot-notation).
     *
     * @param obj 	the object to search for a property in.
     * @param name 	the name of the property (in dot-notation) to search for.
     * 				Example property name: "data.sampleData.sample1".
     * @returns whether or not the object has a property with the given name. If 'obj' or 'name'
     * 			are <code>null</code> - <code>false</code> will be returned.
     */
    RecursiveObjectReader.hasProperty = function (obj, name) {
        if (obj == null || name == null)
            return false;
        var names = name.split(".");
        if (names == null || names.length == 0)
            return false;
        return RecursiveObjectReader.performHasProperty(obj, names, 0);
    };
    /** @see [[performHasProperty]] */
    RecursiveObjectReader.performGetProperty = function (obj, names, nameIndex) {
        if (nameIndex < names.length - 1) {
            var value = ObjectReader_1.ObjectReader.getProperty(obj, names[nameIndex]);
            if (value != null)
                return RecursiveObjectReader.performGetProperty(value, names, nameIndex + 1);
            else
                return null;
        }
        else
            return ObjectReader_1.ObjectReader.getProperty(obj, names[nameIndex]);
    };
    /**
     * Static method that retrieves the value stored in the passed object by the given property name.
     * If 'obj' or 'name' are <code>null</code> - <code>null</code> will be returned.
     *
     * @param obj   the object to read a property from.
     * @param name  the name of the property (in dot-notation) to retrieve.
     * 				Example property name: "data.sampleData.sample1".
     * @returns the value stored by the given property name or null (if the property cannot be read).
     */
    RecursiveObjectReader.getProperty = function (obj, name) {
        if (obj == null || name == null)
            return null;
        var names = name.split(".");
        if (names == null || names.length == 0)
            return null;
        return RecursiveObjectReader.performGetProperty(obj, names, 0);
    };
    /** Checks whether or not value is of a primative type (not an array, map, or object). Primative types do not
     * need to use recursive calls. */
    RecursiveObjectReader.isSimpleValue = function (value) {
        var code = TypeConverter_1.TypeConverter.toTypeCode(value);
        return code != TypeCode_1.TypeCode.Array && code != TypeCode_1.TypeCode.Map && code != TypeCode_1.TypeCode.Object;
    };
    /**
     * Private static method that recursively retrieves the property names of the object that was passed.
     *
     * @param obj			the object to get nested property names from.
     * @param path			the path to the nested property that is being processed in the current  recursive call.
     * @param result		the string array to which full property names are added to, once resolved.
     * @param cycleDetect	used to detect (and stop) recursive cycling.
    */
    RecursiveObjectReader.performGetPropertyNames = function (obj, path, result, cycleDetect) {
        var map = ObjectReader_1.ObjectReader.getProperties(obj);
        if (!_.isEmpty(map) && cycleDetect.length < 100) {
            cycleDetect.push(obj);
            try {
                for (var key in map) {
                    var value = map[key];
                    // Prevent cycles 
                    if (cycleDetect.indexOf(value) >= 0)
                        continue;
                    var newPath = path != null ? path + "." + key : key;
                    // Add simple values directly
                    if (RecursiveObjectReader.isSimpleValue(value))
                        result.push(newPath);
                    // Recursively go to elements
                    else
                        RecursiveObjectReader.performGetPropertyNames(value, newPath, result, cycleDetect);
                }
            }
            finally {
                var index = cycleDetect.indexOf(obj);
                if (index >= 0)
                    cycleDetect.splice(index, 1);
            }
        }
        else {
            if (path != null)
                result.push(path);
        }
    };
    /**
     * Static method that retrieves the names of an object's properties, including all nested property names.
     * Nested properties' names represent the path to the property and are formatted using dot-notation.
     *
     * @param obj   the object, whose property names are to be retrieved.
     * @returns a string array, containing the names of the object's properties. Nested properties are formatted
     * 			using dot-notation. Example nested property name: "data.sampleData.sample1".
     */
    RecursiveObjectReader.getPropertyNames = function (obj) {
        var propertyNames = [];
        if (obj == null) {
            return propertyNames;
        }
        else {
            var cycleDetect = [];
            RecursiveObjectReader.performGetPropertyNames(obj, null, propertyNames, cycleDetect);
            return propertyNames;
        }
    };
    /** @see [[performGetPropertyNames]] */
    RecursiveObjectReader.performGetProperties = function (obj, path, result, cycleDetect) {
        var map = ObjectReader_1.ObjectReader.getProperties(obj);
        if (!_.isEmpty(map) && cycleDetect.length < 100) {
            cycleDetect.push(obj);
            try {
                for (var key in map) {
                    var value = map[key];
                    // Prevent cycles 
                    if (cycleDetect.indexOf(value) >= 0)
                        continue;
                    var newPath = path != null ? path + "." + key : key;
                    // Add simple values directly
                    if (RecursiveObjectReader.isSimpleValue(value))
                        result[newPath] = value;
                    // Recursively go to elements
                    else
                        RecursiveObjectReader.performGetProperties(value, newPath, result, cycleDetect);
                }
            }
            finally {
                var index = cycleDetect.indexOf(obj);
                if (index >= 0)
                    cycleDetect.splice(index, 1);
            }
        }
        else {
            if (path != null)
                result[path] = obj;
        }
    };
    /**
     * Static method that retrieves an object's properties as a map. Nested properties'
     * keys represent the path to the property and are set as dot-notation formatted strings.
     *
     * @param obj   the object to get a map of properties from.
     * @returns a map, containing property names and their values. Nested properties' keys are formatted
     * 			using dot-notation. Example nested property key: "data.sampleData.sample1".
     */
    RecursiveObjectReader.getProperties = function (obj) {
        var properties = {};
        if (obj != null) {
            var cycleDetect = [];
            RecursiveObjectReader.performGetProperties(obj, null, properties, cycleDetect);
        }
        return properties;
    };
    return RecursiveObjectReader;
}());
exports.RecursiveObjectReader = RecursiveObjectReader;
//# sourceMappingURL=RecursiveObjectReader.js.map