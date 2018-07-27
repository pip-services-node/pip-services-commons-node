"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module refer */
var Descriptor_1 = require("./Descriptor");
/**
 * A placeholder that stores component references.
 */
var Reference = /** @class */ (function () {
    /**
     * Create a new Reference object and initializes it using the locator and reference given.
     *
     * @param locator 		the component locator for the reference. It can be a standard Descriptor
     * 						or anything else.
     * @param reference 	the component reference.
     */
    function Reference(locator, component) {
        if (component == null)
            throw new Error("Component cannot be null");
        this._locator = locator;
        this._component = component;
    }
    /**
     * Checks if a locator matches this Reference object. A match is considered to be made if the locator
     * matches this Reference's component or its locator.
     *
     *
     * @param locator 	the locator to match against this Reference.
     * @return <code>true</code>, if this reference matches the locator, and <code>false</code> - otherwise.
     *
     * @see [[Descriptor]]
     */
    Reference.prototype.match = function (locator) {
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
    };
    /**
     * Gets the component stored in this Reference object.
     *
     * @return the component stored.
     */
    Reference.prototype.getComponent = function () {
        return this._component;
    };
    /**
     * Gets the locator of the component that is stored in this Reference object.
     *
     * @return the component's locator.
     */
    Reference.prototype.getLocator = function () {
        return this._locator;
    };
    return Reference;
}());
exports.Reference = Reference;
//# sourceMappingURL=Reference.js.map