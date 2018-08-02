"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
/** @hidden */
var _ = require('lodash');
var IntegerConverter_1 = require("../convert/IntegerConverter");
var ObjectReader_1 = require("./ObjectReader");
var ObjectWriter_1 = require("./ObjectWriter");
var RecursiveObjectReader_1 = require("./RecursiveObjectReader");
//TODO - private methods?
/**
 * Helper class that contains methods for writing nested object properties recursively.
 */
var RecursiveObjectWriter = /** @class */ (function () {
    function RecursiveObjectWriter() {
    }
    /**
     * Private static method that recursively create a nested property,
     * whose nested name correspond to 'names'. The 'nameIndex' is used to track the depth of recursion.
     */
    RecursiveObjectWriter.createProperty = function (obj, names, nameIndex) {
        // If next field is index then create an array
        var subField = names.length > nameIndex + 1 ? names[nameIndex + 1] : null;
        var subFieldIndex = IntegerConverter_1.IntegerConverter.toNullableInteger(subField);
        if (subFieldIndex != null)
            return [];
        // Else create a dictionary
        return {};
    };
    /** @see [[createProperty]] */
    RecursiveObjectWriter.performSetProperty = function (obj, names, nameIndex, value) {
        if (nameIndex < names.length - 1) {
            var subObj = ObjectReader_1.ObjectReader.getProperty(obj, names[nameIndex]);
            if (subObj != null)
                RecursiveObjectWriter.performSetProperty(subObj, names, nameIndex + 1, value);
            else {
                subObj = RecursiveObjectWriter.createProperty(obj, names, nameIndex);
                if (subObj != null) {
                    RecursiveObjectWriter.performSetProperty(subObj, names, nameIndex + 1, value);
                    ObjectWriter_1.ObjectWriter.setProperty(obj, names[nameIndex], subObj);
                }
            }
        }
        else
            ObjectWriter_1.ObjectWriter.setProperty(obj, names[nameIndex], value);
    };
    /**
     * Static method that sets an object's nested property to the value that is passed.
     *
     * @param obj 		the object to set a property in.
     * @param name		the name of the property (in dot-notation) to set.
     * 					Example property name: "data.sampleData.sample1".
     * @param value		the value to set in the object's given property.
     */
    RecursiveObjectWriter.setProperty = function (obj, name, value) {
        if (obj == null || name == null)
            return;
        var names = name.split(".");
        if (names == null || names.length == 0)
            return;
        RecursiveObjectWriter.performSetProperty(obj, names, 0, value);
    };
    /**
     * Static method that sets multiple object properties at once.
     *
     * @param obj 		the object to set properties in.
     * @param values 	a map, containing property names (in dot-notation) and the
     * 					values to set. Example property name: "data.sampleData.sample1".
     */
    RecursiveObjectWriter.setProperties = function (obj, values) {
        if (values == null)
            return;
        for (var key in values) {
            var value = values[key];
            RecursiveObjectWriter.setProperty(obj, key, value);
        }
    };
    /**
     * Copies object properties from a source to the given destination. Calls
     * [[RecursiveObjectReader.getProperties]] to retrieve properties from the source
     * and [[RecursiveObjectWriter.setProperties]] to set them in the destination.
     *
     * @param dest 	the destination to which the properties are to be copied.
     * @param src 	the source from which the properties are to be copied.
     */
    RecursiveObjectWriter.copyProperties = function (dest, src) {
        if (dest == null || src == null)
            return;
        var values = RecursiveObjectReader_1.RecursiveObjectReader.getProperties(src);
        RecursiveObjectWriter.setProperties(dest, values);
    };
    return RecursiveObjectWriter;
}());
exports.RecursiveObjectWriter = RecursiveObjectWriter;
//# sourceMappingURL=RecursiveObjectWriter.js.map