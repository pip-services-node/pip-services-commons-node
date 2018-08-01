"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
var ConfigException_1 = require("../errors/ConfigException");
/**
 * Class that stores information about an object's type, specifically - the type's name
 * and the library it can be found in.
 */
var TypeDescriptor = /** @class */ (function () {
    /**
     * Creates a new TypeDescriptor object using the values provided.
     *
     * @param name 		the name of the data type.
     * @param library 	the library in which the data type can be found.
     */
    function TypeDescriptor(name, library) {
        this._name = name;
        this._library = library;
    }
    /**
     * @returns the name of the data type that is stored in this TypeDescriptor object.
     */
    TypeDescriptor.prototype.getName = function () {
        return this._name;
    };
    /**
     * @returns the library in which this TypeDescriptor's type can be found.
     */
    TypeDescriptor.prototype.getLibrary = function () {
        return this._library;
    };
    /**
     * Checks whether or not the object passed is an instance of TypeDescriptor and
     * equals this current TypeDescriptor object.
     *
     * @param obj	the TypeDescriptor to check.
     * @returns whether or not the passed TypeDescriptor and this TypeDescriptor object
     * 			are equal.
     */
    TypeDescriptor.prototype.equals = function (obj) {
        if (obj instanceof TypeDescriptor) {
            var otherType = obj;
            if (this.getName() == null || otherType.getName() == null)
                return false;
            if (this.getName() != otherType.getName())
                return false;
            if (this.getLibrary() == null || otherType.getLibrary() == null
                || this.getLibrary() == otherType.getLibrary())
                return true;
        }
        return false;
    };
    /**
     * Converts this TypeDescriptor object to a string.
     *
     * @returns this TypeDescriptor as a string. Example
     * 			result: "typesName,library".
     *
     * @see [[fromString]]
     */
    TypeDescriptor.prototype.toString = function () {
        var builder = '' + this._name;
        if (this._library != null)
            builder += ',' + this._library;
        return builder.toString();
    };
    /**
     * Static method that generates a TypeDescriptor object using the string provided.
     *
     * @param value 	the string to use to generate a TypeDescriptor object.
     * 					Example strings: "typesName,library", "typesNameOnly".
     * @returns the generated TypeDescriptor. If value is <code>null</code> or an
     * 			empty string - <code>null</code> will be returned.
     *
     * @throws a [[ConfigException]] if the type descriptor string is not formatted correctly.
     *
     * @see [[toString]]
     */
    TypeDescriptor.fromString = function (value) {
        if (value == null || value.length == 0)
            return null;
        var tokens = value.split(",");
        if (tokens.length == 1) {
            return new TypeDescriptor(tokens[0].trim(), null);
        }
        else if (tokens.length == 2) {
            return new TypeDescriptor(tokens[0].trim(), tokens[1].trim());
        }
        else {
            throw new ConfigException_1.ConfigException(null, "BAD_DESCRIPTOR", "Type descriptor " + value + " is in wrong format").withDetails("descriptor", value);
        }
    };
    return TypeDescriptor;
}());
exports.TypeDescriptor = TypeDescriptor;
//# sourceMappingURL=TypeDescriptor.js.map