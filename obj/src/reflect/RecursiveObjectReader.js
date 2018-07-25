"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
let _ = require('lodash');
const TypeCode_1 = require("../convert/TypeCode");
const TypeConverter_1 = require("../convert/TypeConverter");
const ObjectReader_1 = require("./ObjectReader");
class RecursiveObjectReader {
    static performHasProperty(obj, names, nameIndex) {
        if (nameIndex < names.length - 1) {
            let value = ObjectReader_1.ObjectReader.getProperty(obj, names[nameIndex]);
            if (value != null)
                return RecursiveObjectReader.performHasProperty(value, names, nameIndex + 1);
            else
                return false;
        }
        else
            return ObjectReader_1.ObjectReader.hasProperty(obj, names[nameIndex]);
    }
    static hasProperty(obj, name) {
        if (obj == null || name == null)
            return false;
        let names = name.split(".");
        if (names == null || names.length == 0)
            return false;
        return RecursiveObjectReader.performHasProperty(obj, names, 0);
    }
    static performGetProperty(obj, names, nameIndex) {
        if (nameIndex < names.length - 1) {
            let value = ObjectReader_1.ObjectReader.getProperty(obj, names[nameIndex]);
            if (value != null)
                return RecursiveObjectReader.performGetProperty(value, names, nameIndex + 1);
            else
                return null;
        }
        else
            return ObjectReader_1.ObjectReader.getProperty(obj, names[nameIndex]);
    }
    static getProperty(obj, name) {
        if (obj == null || name == null)
            return null;
        let names = name.split(".");
        if (names == null || names.length == 0)
            return null;
        return RecursiveObjectReader.performGetProperty(obj, names, 0);
    }
    static isSimpleValue(value) {
        let code = TypeConverter_1.TypeConverter.toTypeCode(value);
        return code != TypeCode_1.TypeCode.Array && code != TypeCode_1.TypeCode.Map && code != TypeCode_1.TypeCode.Object;
    }
    static performGetPropertyNames(obj, path, result, cycleDetect) {
        let map = ObjectReader_1.ObjectReader.getProperties(obj);
        if (!_.isEmpty(map) && cycleDetect.length < 100) {
            cycleDetect.push(obj);
            try {
                for (let key in map) {
                    let value = map[key];
                    // Prevent cycles 
                    if (cycleDetect.indexOf(value) >= 0)
                        continue;
                    let newPath = path != null ? path + "." + key : key;
                    // Add simple values directly
                    if (RecursiveObjectReader.isSimpleValue(value))
                        result.push(newPath);
                    // Recursively go to elements
                    else
                        RecursiveObjectReader.performGetPropertyNames(value, newPath, result, cycleDetect);
                }
            }
            finally {
                let index = cycleDetect.indexOf(obj);
                if (index >= 0)
                    cycleDetect.splice(index, 1);
            }
        }
        else {
            if (path != null)
                result.push(path);
        }
    }
    static getPropertyNames(obj) {
        let propertyNames = [];
        if (obj == null) {
            return propertyNames;
        }
        else {
            let cycleDetect = [];
            RecursiveObjectReader.performGetPropertyNames(obj, null, propertyNames, cycleDetect);
            return propertyNames;
        }
    }
    static performGetProperties(obj, path, result, cycleDetect) {
        let map = ObjectReader_1.ObjectReader.getProperties(obj);
        if (!_.isEmpty(map) && cycleDetect.length < 100) {
            cycleDetect.push(obj);
            try {
                for (let key in map) {
                    let value = map[key];
                    // Prevent cycles 
                    if (cycleDetect.indexOf(value) >= 0)
                        continue;
                    let newPath = path != null ? path + "." + key : key;
                    // Add simple values directly
                    if (RecursiveObjectReader.isSimpleValue(value))
                        result[newPath] = value;
                    // Recursively go to elements
                    else
                        RecursiveObjectReader.performGetProperties(value, newPath, result, cycleDetect);
                }
            }
            finally {
                let index = cycleDetect.indexOf(obj);
                if (index >= 0)
                    cycleDetect.splice(index, 1);
            }
        }
        else {
            if (path != null)
                result[path] = obj;
        }
    }
    static getProperties(obj) {
        let properties = {};
        if (obj != null) {
            let cycleDetect = [];
            RecursiveObjectReader.performGetProperties(obj, null, properties, cycleDetect);
        }
        return properties;
    }
}
exports.RecursiveObjectReader = RecursiveObjectReader;
//# sourceMappingURL=RecursiveObjectReader.js.map