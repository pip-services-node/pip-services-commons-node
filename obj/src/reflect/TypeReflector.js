"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
/** @hidden */
var _ = require('lodash');
/** @hidden */
var path = require("path");
var NotFoundException_1 = require("../errors/NotFoundException");
var TypeCode_1 = require("../convert/TypeCode");
var TypeConverter_1 = require("../convert/TypeConverter");
/**
 * Helper class that contains methods for working with [[TypeDescriptor TypeDescriptors]].
 *
 * @see [[TypeDescriptor]]
 */
var TypeReflector = /** @class */ (function () {
    function TypeReflector() {
    }
    /**
     * Static method that loads modules to resolve exported types using the provided
     * 'name' and 'library' parameters. Once a type has been found, its constructor is
     * returned as 'type'.
     *
     * @param name 		the type's name.
     * @param library 	the library that contains the type.
     * @returns the constructor for the type that was found or <code>null</code>
     * 			(if none were found).
     */
    TypeReflector.getType = function (name, library) {
        try {
            if (!library)
                library = name;
            var absPath = library;
            if (_.startsWith(absPath, '.'))
                absPath = path.resolve(absPath);
            // Load module
            var type = require(absPath);
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
    };
    /**
     * Static method that retrieves the constructor for the type that correspondes to the provided
     * [[TypeDescriptor]].
     *
     * @param type 	the TypeDescriptor to find the type by. Cannot be <code>null</code>.
     * @returns the constructor for the type that was found or <code>null</code>
     * 			(if none were found).
     *
     * @throws an Error if 'type' is <code>null</code>.
     *
     * @see [[getType]]
     * @see [[TypeDescriptor]]
     */
    TypeReflector.getTypeByDescriptor = function (type) {
        if (type == null)
            throw new Error("Type descriptor cannot be null");
        return TypeReflector.getType(type.getName(), type.getLibrary());
    };
    /**
     * Static method that creates an instance (object) of the given type.
     *
     * @param type 		the type's constructor to create an instance with.
     * @param args		the arguments to pass to the constructor.
     * @returns the created instance (object).
     *
     * @throws an Error if 'type' is <code>null</code>.
     * @throws an Error if 'type' is not a constructor.
     */
    TypeReflector.createInstanceByType = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (type == null)
            throw new Error("Type constructor cannot be null");
        if (!_.isFunction(type))
            throw new Error("Type contructor has to be a function");
        return new (type.bind.apply(type, [void 0].concat(args)))();
    };
    /**
     * Static method that resolves the type that corresponds to the provided 'name' and 'library'
     * parameters and creates an instance (object) of the type that was found.
     *
     * @param name 		the type's name.
     * @param library 	the library that contains the type.
     * @param args		the arguments to pass to the constructor.
     * @returns the created instance (object).
     *
     * @throws a [[NotFoundException]] if no type is found by the given name/library.
     *
     * @see [[getType]]
     * @see [[createInstanceByType]]
     */
    TypeReflector.createInstance = function (name, library) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var type = TypeReflector.getType(name, library);
        if (type == null)
            throw new NotFoundException_1.NotFoundException(null, "TYPE_NOT_FOUND", "Type " + name + "," + library + " was not found")
                .withDetails("type", name).withDetails("library", library);
        return TypeReflector.createInstanceByType.apply(TypeReflector, [type].concat(args));
    };
    /**
     * Static method that resolves the type that corresponds to the provided
     * [[TypeDescriptor]] and creates an instance (object) of the type that was found.
     *
     * @param type 	the TypeDescriptor to find the type by. Cannot be <code>null</code>.
     * @param args	the arguments to pass to the constructor.
     * @returns the created instance (object).
     *
     * @throws an Error if 'type' is <code>null</code>.
     *
     * @see [[createInstance]]
     * @see [[TypeDescriptor]]
     */
    TypeReflector.createInstanceByDescriptor = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (type == null)
            throw new Error("Type descriptor cannot be null");
        return TypeReflector.createInstance.apply(TypeReflector, [type.getName(), type.getLibrary()].concat(args));
    };
    /**
     * Static method that checks whether or not a value is of a primitive type.
     * Uses [[TypeConverter.toTypeCode]] to identify the given value's type.
     *
     * The following [[TypeCode types]] are considered to be primitive: String,
     * Enum, Boolean, Integer, Long, Float, Double, DateTime, Duration.
     *
     * @param value 	the value to check.
     * @returns whether or not the value is a primitive type.
     *
     * @see [[TypeConverter.toTypeCode]]
     * @see [[TypeCode]]
     */
    TypeReflector.isPrimitive = function (value) {
        var typeCode = TypeConverter_1.TypeConverter.toTypeCode(value);
        return typeCode == TypeCode_1.TypeCode.String || typeCode == TypeCode_1.TypeCode.Enum
            || typeCode == TypeCode_1.TypeCode.Boolean || typeCode == TypeCode_1.TypeCode.Integer
            || typeCode == TypeCode_1.TypeCode.Long || typeCode == TypeCode_1.TypeCode.Float
            || typeCode == TypeCode_1.TypeCode.Double || typeCode == TypeCode_1.TypeCode.DateTime
            || typeCode == TypeCode_1.TypeCode.Duration;
    };
    return TypeReflector;
}());
exports.TypeReflector = TypeReflector;
//# sourceMappingURL=TypeReflector.js.map