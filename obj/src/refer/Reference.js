"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module refer */
const Descriptor_1 = require("./Descriptor");
/**
 * Placeholder to store component references.
 */
class Reference {
    /**
     * Create a new reference for an object
     * @param locator a component locator for the reference
     * @param reference a component reference
     */
    constructor(locator, component) {
        if (component == null)
            throw new Error("Component cannot be null");
        this._locator = locator;
        this._component = component;
    }
    /**
     * Checks if locator matches the current component
     * @param locator a location object. It can be standard Descriptor or something else
     * @return <code>true</code> if component matches the locator or <code>false</code> otherwise.
     */
    match(locator) {
        // Locate by direct reference matching
        if (this._component == locator)
            return true;
        // Locate by direct locator matching
        else if (this._locator instanceof Descriptor_1.Descriptor)
            return this._locator.equals(locator);
        // Locate by direct locator matching
        else if (this._locator != null)
            return this._locator == locator;
        else
            return false;
    }
    /**
     * Gets component reference
     * @return a component itself
     */
    getComponent() {
        return this._component;
    }
    /**
     * Gets component locator
     * @return a component locator
     */
    getLocator() {
        return this._locator;
    }
}
exports.Reference = Reference;
//# sourceMappingURL=Reference.js.map