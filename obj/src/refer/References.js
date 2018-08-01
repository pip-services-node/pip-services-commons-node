"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module refer */
var Reference_1 = require("./Reference");
var ReferenceException_1 = require("./ReferenceException");
/**
 * Basic implementation of [[IReferences]], which stores components as a flat list.
 *
 * @see [[IReferences]]
 */
var References = /** @class */ (function () {
    /**
     * Creates a new References objects.
     *
     * @param tuples    (optional) the tuples array to initialize this References object with.
     *                  A tuples array contains index-based pairs, such as [key1,value1,key2,value2].
     */
    function References(tuples) {
        if (tuples === void 0) { tuples = null; }
        this._references = [];
        if (tuples != null) {
            for (var index = 0; index < tuples.length; index += 2) {
                if (index + 1 >= tuples.length)
                    break;
                this.put(tuples[index], tuples[index + 1]);
            }
        }
    }
    /**
     * Puts a new component reference into the set using an explicit locator.
     *
     * @param locator 	the locator to find the reference by.
     * @param component the component reference that is to be added.
     */
    References.prototype.put = function (locator, component) {
        if (component == null)
            throw new Error("Component cannot be null");
        this._references.push(new Reference_1.Reference(locator, component));
    };
    /**
     * Removes a component reference from the set. Removes only the last reference.
     *
     * @param locator 	the locator of the reference that is to be removed.
     * @returns the removed reference.
     *
     * @see [[removeAll]]
     */
    References.prototype.remove = function (locator) {
        if (locator == null)
            return null;
        for (var index = this._references.length - 1; index >= 0; index--) {
            var reference = this._references[index];
            if (reference.match(locator)) {
                this._references.splice(index, 1);
                return reference.getComponent();
            }
        }
        return null;
    };
    /**
     * Removes all component references with the given locator from the set.
     *
     * @param locator 	the locator to remove references by.
     * @returns a list, containing all removed references.
     */
    References.prototype.removeAll = function (locator) {
        var components = [];
        if (locator == null)
            return components;
        for (var index = this._references.length - 1; index >= 0; index--) {
            var reference = this._references[index];
            if (reference.match(locator)) {
                this._references.splice(index, 1);
                components.push(reference.getComponent());
            }
        }
        return components;
    };
    /**
     * Gets all stored component locators.
     *
     * @returns a list, containing the locators for all of the components stored in the set.
     */
    References.prototype.getAllLocators = function () {
        var locators = [];
        for (var index = 0; index < this._references.length; index++) {
            var reference = this._references[index];
            locators.push(reference.getLocator());
        }
        return locators;
    };
    /**
     * Gets all stored component references.
     *
     * @returns a list, containing all component references stored in the set.
     */
    References.prototype.getAll = function () {
        var components = [];
        for (var index = 0; index < this._references.length; index++) {
            var reference = this._references[index];
            components.push(reference.getComponent());
        }
        return components;
    };
    /**
     * Gets a component references that matches the provided locator and the specified type. The search
     * is performed, starting from the last-added references.
     *
     * @param locator 	the locator to find a reference by.
     * @returns the first found component reference or <code>null</code> (if none were found).
     */
    References.prototype.getOneOptional = function (locator) {
        try {
            var components = this.find(locator, false);
            return components.length > 0 ? components[0] : null;
        }
        catch (ex) {
            return null;
        }
    };
    /**
     * Gets a component reference that matches the provided locator and the specified type.
     * The search is performed, starting from the last-added references.
     *
     * If no references are found, an exception will be thrown by [[References.find]].
     *
     * @param locator 	the locator to find a reference by.
     * @returns the first found component reference.
     */
    References.prototype.getOneRequired = function (locator) {
        var components = this.find(locator, true);
        return components.length > 0 ? components[0] : null;
    };
    /**
     * Gets a list of component references that match the provided locator and the specified type.
     *
     * @param locator 	the locator to find references by.
     * @returns a list, containing all component references found.
     */
    References.prototype.getOptional = function (locator) {
        try {
            return this.find(locator, false);
        }
        catch (ex) {
            return [];
        }
    };
    /**
     * Gets a list of component references that match the provided locator and the specified type.
     * If no references are found, an exception will be thrown.
     *
     * @param locator 	the locator to find references by.
     * @returns a list, containing all component references found.
     */
    References.prototype.getRequired = function (locator) {
        return this.find(locator, true);
    };
    /**
     * Finds all references that match the specified query criteria and the specified type.
     *
     * @param locator 	the locator to find a reference by.
     * @param required 	forces to raise an exception if no reference is found.
     * @returns a list of found references.
     *
     * @throws an Error if the locator is <code>null</code>.
     * @throws a [[ReferenceException]] if 'required' was set to <code>true</code>
     *          and nothing was found.
     */
    References.prototype.find = function (locator, required) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        var components = [];
        // Search all references
        for (var index = this._references.length - 1; index >= 0; index--) {
            var reference = this._references[index];
            if (reference.match(locator)) {
                var component = reference.getComponent();
                components.push(component);
            }
        }
        if (components.length == 0 && required)
            throw new ReferenceException_1.ReferenceException(null, locator);
        return components;
    };
    /**
     * Static method that creates a new References object using the tuples arrays that are passed as parameters.
     *
     * @param tuples    the tuples arrays to initialize the new References object with.
     *                  A tuples array contains index-based pairs, such as [key1,value1,key2,value2].
     * @returns the References object that was generated using the given tuples arrays,
     */
    References.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        return new References(tuples);
    };
    return References;
}());
exports.References = References;
//# sourceMappingURL=References.js.map