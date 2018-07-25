"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
let _ = require('lodash');
let path = require("path");
const NotFoundException_1 = require("../errors/NotFoundException");
const TypeCode_1 = require("../convert/TypeCode");
const TypeConverter_1 = require("../convert/TypeConverter");
class TypeReflector {
    static getType(name, library) {
        try {
            if (!library)
                library = name;
            let absPath = library;
            if (_.startsWith(absPath, '.'))
                absPath = path.resolve(absPath);
            // Load module
            let type = require(absPath);
            if (type == null)
                return null;
            // Get exported type by name
            if (name != null && name.length > 0)
                type = type[name];
            return type;
        }
        catch (ex) {
            return null;
        }
    }
    static getTypeByDescriptor(type) {
        if (type == null)
            throw new Error("Type descriptor cannot be null");
        return TypeReflector.getType(type.getName(), type.getLibrary());
    }
    static createInstanceByType(type, ...args) {
        if (type == null)
            throw new Error("Type constructor cannot be null");
        if (!_.isFunction(type))
            throw new Error("Type contructor has to be a function");
        return new type(...args);
    }
    static createInstance(name, library, ...args) {
        let type = TypeReflector.getType(name, library);
        if (type == null)
            throw new NotFoundException_1.NotFoundException(null, "TYPE_NOT_FOUND", "Type " + name + "," + library + " was not found")
                .withDetails("type", name).withDetails("library", library);
        return TypeReflector.createInstanceByType(type, ...args);
    }
    static createInstanceByDescriptor(type, ...args) {
        if (type == null)
            throw new Error("Type descriptor cannot be null");
        return TypeReflector.createInstance(type.getName(), type.getLibrary(), ...args);
    }
    static isPrimitive(value) {
        let typeCode = TypeConverter_1.TypeConverter.toTypeCode(value);
        return typeCode == TypeCode_1.TypeCode.String || typeCode == TypeCode_1.TypeCode.Enum
            || typeCode == TypeCode_1.TypeCode.Boolean || typeCode == TypeCode_1.TypeCode.Integer
            || typeCode == TypeCode_1.TypeCode.Long || typeCode == TypeCode_1.TypeCode.Float
            || typeCode == TypeCode_1.TypeCode.Double || typeCode == TypeCode_1.TypeCode.DateTime
            || typeCode == TypeCode_1.TypeCode.Duration;
    }
}
exports.TypeReflector = TypeReflector;
//# sourceMappingURL=TypeReflector.js.map