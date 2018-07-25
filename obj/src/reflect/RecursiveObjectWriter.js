"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
let _ = require('lodash');
const IntegerConverter_1 = require("../convert/IntegerConverter");
const ObjectReader_1 = require("./ObjectReader");
const ObjectWriter_1 = require("./ObjectWriter");
const RecursiveObjectReader_1 = require("./RecursiveObjectReader");
class RecursiveObjectWriter {
    static createProperty(obj, names, nameIndex) {
        // If next field is index then create an array
        let subField = names.length > nameIndex + 1 ? names[nameIndex + 1] : null;
        let subFieldIndex = IntegerConverter_1.IntegerConverter.toNullableInteger(subField);
        if (subFieldIndex != null)
            return [];
        // Else create a dictionary
        return {};
    }
    static performSetProperty(obj, names, nameIndex, value) {
        if (nameIndex < names.length - 1) {
            let subObj = ObjectReader_1.ObjectReader.getProperty(obj, names[nameIndex]);
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
    }
    static setProperty(obj, name, value) {
        if (obj == null || name == null)
            return;
        let names = name.split(".");
        if (names == null || names.length == 0)
            return;
        RecursiveObjectWriter.performSetProperty(obj, names, 0, value);
    }
    static setProperties(obj, values) {
        if (values == null)
            return;
        for (let key in values) {
            let value = values[key];
            RecursiveObjectWriter.setProperty(obj, key, value);
        }
    }
    static copyProperties(dest, src) {
        if (dest == null || src == null)
            return;
        let values = RecursiveObjectReader_1.RecursiveObjectReader.getProperties(src);
        RecursiveObjectWriter.setProperties(dest, values);
    }
}
exports.RecursiveObjectWriter = RecursiveObjectWriter;
//# sourceMappingURL=RecursiveObjectWriter.js.map