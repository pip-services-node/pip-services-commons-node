"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module refer */
const Reference_1 = require("./Reference");
const ReferenceException_1 = require("./ReferenceException");
/**
 * Basic implementation of IReferences that stores component as a flat list
 */
class References {
    constructor(tuples = null) {
        this._references = [];
        if (tuples != null) {
            for (let index = 0; index < tuples.length; index += 2) {
                if (index + 1 >= tuples.length)
                    break;
                this.put(tuples[index], tuples[index + 1]);
            }
        }
    }
    put(locator, component) {
        if (component == null)
            throw new Error("Component cannot be null");
        this._references.push(new Reference_1.Reference(locator, component));
    }
    remove(locator) {
        if (locator == null)
            return null;
        for (let index = this._references.length - 1; index >= 0; index--) {
            let reference = this._references[index];
            if (reference.match(locator)) {
                this._references.splice(index, 1);
                return reference.getComponent();
            }
        }
        return null;
    }
    removeAll(locator) {
        let components = [];
        if (locator == null)
            return components;
        for (let index = this._references.length - 1; index >= 0; index--) {
            let reference = this._references[index];
            if (reference.match(locator)) {
                this._references.splice(index, 1);
                components.push(reference.getComponent());
            }
        }
        return components;
    }
    getAllLocators() {
        let locators = [];
        for (let index = 0; index < this._references.length; index++) {
            let reference = this._references[index];
            locators.push(reference.getLocator());
        }
        return locators;
    }
    getAll() {
        let components = [];
        for (let index = 0; index < this._references.length; index++) {
            let reference = this._references[index];
            components.push(reference.getComponent());
        }
        return components;
    }
    getOneOptional(locator) {
        try {
            let components = this.find(locator, false);
            return components.length > 0 ? components[0] : null;
        }
        catch (ex) {
            return null;
        }
    }
    getOneRequired(locator) {
        let components = this.find(locator, true);
        return components.length > 0 ? components[0] : null;
    }
    getOptional(locator) {
        try {
            return this.find(locator, false);
        }
        catch (ex) {
            return [];
        }
    }
    getRequired(locator) {
        return this.find(locator, true);
    }
    find(locator, required) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        let components = [];
        // Search all references
        for (let index = this._references.length - 1; index >= 0; index--) {
            let reference = this._references[index];
            if (reference.match(locator)) {
                let component = reference.getComponent();
                components.push(component);
            }
        }
        if (components.length == 0 && required)
            throw new ReferenceException_1.ReferenceException(null, locator);
        return components;
    }
    static fromTuples(...tuples) {
        return new References(tuples);
    }
}
exports.References = References;
//# sourceMappingURL=References.js.map