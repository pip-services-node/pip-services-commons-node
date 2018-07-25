"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
const ConfigException_1 = require("../errors/ConfigException");
class TypeDescriptor {
    constructor(name, library) {
        this._name = name;
        this._library = library;
    }
    getName() {
        return this._name;
    }
    getLibrary() {
        return this._library;
    }
    equals(obj) {
        if (obj instanceof TypeDescriptor) {
            let otherType = obj;
            if (this.getName() == null || otherType.getName() == null)
                return false;
            if (this.getName() != otherType.getName())
                return false;
            if (this.getLibrary() == null || otherType.getLibrary() == null
                || this.getLibrary() == otherType.getLibrary())
                return true;
        }
        return false;
    }
    toString() {
        let builder = '' + this._name;
        if (this._library != null)
            builder += ',' + this._library;
        return builder.toString();
    }
    static fromString(value) {
        if (value == null || value.length == 0)
            return null;
        let tokens = value.split(",");
        if (tokens.length == 1) {
            return new TypeDescriptor(tokens[0].trim(), null);
        }
        else if (tokens.length == 2) {
            return new TypeDescriptor(tokens[0].trim(), tokens[1].trim());
        }
        else {
            throw new ConfigException_1.ConfigException(null, "BAD_DESCRIPTOR", "Type descriptor " + value + " is in wrong format").withDetails("descriptor", value);
        }
    }
}
exports.TypeDescriptor = TypeDescriptor;
//# sourceMappingURL=TypeDescriptor.js.map