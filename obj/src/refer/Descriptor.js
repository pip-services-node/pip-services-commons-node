"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module refer */
var ConfigException_1 = require("../errors/ConfigException");
/**
 * Component descriptor that is used to find a component by its descriptive elements. Contains 5 sections:
 *
 * - **logical group:** the package or other logical group of a component, for example: 'pip-services-storage-blocks'
 * - **component type:** identifies a component's interface, for example: 'persistence', 'controller', 'services', or 'cache'
 * - **component kind:** identifies a component's implementation, for example: 'memory', 'file', or 'mongodb'
 * - **component name:** identifies a component's internal content
 * - **implementation version:** for example: '1.0', '1.5', or '10.4'
 *
 * <code>*</code> can be used for any of the above sections to indicate 'any'.
 */
var Descriptor = /** @class */ (function () {
    /**
     * Creates a component descriptor object.
     *
     * @param group 	the logical group (examples: 'pip-services-runtime', 'pip-services-logging', '*').
     * @param type 		the logical type (examples: 'persistence', 'controller', 'cache', '*').
     * @param kind 		the implementation (examples: 'memory', 'mongodb', '*').
     * @param name		the internal content
     * @param version 	implementation version (examples: '1.0', '1.5', '10.4', '*').
     */
    function Descriptor(group, type, kind, name, version) {
        if ("*" == group)
            group = null;
        if ("*" == type)
            type = null;
        if ("*" == kind)
            kind = null;
        if ("*" == name)
            name = null;
        if ("*" == version)
            version = null;
        this._group = group;
        this._type = type;
        this._kind = kind;
        this._name = name;
        this._version = version;
    }
    /**
     * Gets this component descriptor's logical group section.
     *
     * @returns the component's logical group.
     */
    Descriptor.prototype.getGroup = function () {
        return this._group;
    };
    /**
     * Gets this component descriptor's logical type section.
     *
     * @returns the component's logical type.
     */
    Descriptor.prototype.getType = function () {
        return this._type;
    };
    /**
     * Gets this component descriptor's implementation section.
     *
     * @returns the component's implementation.
     */
    Descriptor.prototype.getKind = function () {
        return this._kind;
    };
    /**
     * Gets this component descriptor's name section.
     *
     * @returns the component's name.
     */
    Descriptor.prototype.getName = function () {
        return this._name;
    };
    /**
     * Gets this component descriptor's implementation version section.
     *
     * @returns the component's implementation version.
     */
    Descriptor.prototype.getVersion = function () {
        return this._version;
    };
    Descriptor.prototype.matchField = function (field1, field2) {
        return field1 == null
            || field2 == null
            || field1 == field2;
    };
    /**
     * Matches this descriptor to another descriptor.
     * All <code>*</code> or <code>null</code> descriptor elements match to any other value.
     * Specific values must match exactly.
     *
     * @param descriptor 	the descriptor to match this one against.
     * @returns <code>true</code>, if the descriptors match, and <code>false</code> - otherwise.
     *
     * @see [[exactMatch]]
     */
    Descriptor.prototype.match = function (descriptor) {
        return this.matchField(this._group, descriptor.getGroup())
            && this.matchField(this._type, descriptor.getType())
            && this.matchField(this._kind, descriptor.getKind())
            && this.matchField(this._name, descriptor.getName())
            && this.matchField(this._version, descriptor.getVersion());
    };
    Descriptor.prototype.exactMatchField = function (field1, field2) {
        if (field1 == null && field2 == null)
            return true;
        if (field1 == null || field2 == null)
            return false;
        return field1 == field2;
    };
    /**
     * Matches this descriptor to another descriptor.
     * All <code>*</code> or <code>null</code> descriptor elements match ONLY to <code>*</code>
     * or <code>null</code> values (as oppossed to [[match]]).
     *
     * Specific values must match exactly.
     *
     * @param descriptor 	the descriptor to match this one against.
     * @returns <code>true</code>, if the descriptors match, and <code>false</code> - otherwise.
     *
     * @see [[match]]
     */
    Descriptor.prototype.exactMatch = function (descriptor) {
        return this.exactMatchField(this._group, descriptor.getGroup())
            && this.exactMatchField(this._type, descriptor.getType())
            && this.exactMatchField(this._kind, descriptor.getKind())
            && this.exactMatchField(this._name, descriptor.getName())
            && this.exactMatchField(this._version, descriptor.getVersion());
    };
    /**
     * Checks whether or not a descriptor contains <code>*</code> or <code>null</code>
     * elements in any of its sections.
     *
     * @returns <code>true</code>, if no <code>*</code>s or <code>null</code>s are found. Otherwise,
     * 			<code>false</code> is returned.
     */
    Descriptor.prototype.isComplete = function () {
        return this._group != null && this._type != null && this._kind != null
            && this._name != null && this._version != null;
    };
    /**
     * Matches this descriptor to the value that was passed.
     *
     * @param value 	the value to match against this descriptor.
     * @returns <code>true</code> if value is an instance of Descriptor and matches this descriptor.
     * 			Otherwise, <code>false</code> is returned.
     *
     * @see [[match]]
     */
    Descriptor.prototype.equals = function (value) {
        if (value instanceof Descriptor)
            return this.match(value);
        return false;
    };
    /**
     * Converts this descriptor to a string by substituting any <code>null</code>s with <code>*</code>s,
     * and by separating its 5 sections with colons.
     *
     * @returns this descriptor as a string. Example result: "pip-services-logging:persistence:memory:*:1.0".
     */
    Descriptor.prototype.toString = function () {
        return (this._group || "*")
            + ":" + (this._type || "*")
            + ":" + (this._kind || "*")
            + ":" + (this._name || "*")
            + ":" + (this._version || "*");
    };
    /**
     * Static method that can convert a colon-separated descriptor string into a Descriptor object.
     *
     * @param value 	a colon-separated descriptor string. Example string:
     * 					"pip-services-logging:persistence:memory:*:1.0".
     * @returns the Descriptor that was parsed from the string.
     * @throws a [[ConfigException]] if the descriptor string is of a wrong format.
     */
    Descriptor.fromString = function (value) {
        if (value == null || value.length == 0)
            return null;
        var tokens = value.split(":");
        if (tokens.length != 5) {
            throw new ConfigException_1.ConfigException(null, "BAD_DESCRIPTOR", "Descriptor " + value + " is in wrong format").withDetails("descriptor", value);
        }
        return new Descriptor(tokens[0].trim(), tokens[1].trim(), tokens[2].trim(), tokens[3].trim(), tokens[4].trim());
    };
    return Descriptor;
}());
exports.Descriptor = Descriptor;
//# sourceMappingURL=Descriptor.js.map