"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module refer */
var StringConverter_1 = require("../convert/StringConverter");
var ReferenceException_1 = require("./ReferenceException");
var Descriptor_1 = require("./Descriptor");
/**
 * Helper class for resolving component dependencies.
 */
var DependencyResolver = /** @class */ (function () {
    /**
     * Creates a new DependencyResolver object.
     *
     * @param config		(optional) the configuration parameters (dependencies) to configure this
     * 						object with. If omitted, then they can be set later on using [[configure]].
     * @param references 	(optional) the component references to set for this object.
     * 						If omitted, then they can be set later on using [[setReferences]].
     *
     * @see [[ConfigParams]]
     * @see [[configure]]
     * @see [[IReferences]]
     * @see [[setReferences]]
     */
    function DependencyResolver(config, references) {
        this._dependencies = {};
        if (config != null)
            this.configure(config);
        if (references != null)
            this.setReferences(references);
    }
    /**
     * Configures this object using the given [[ConfigParams]]. This method looks for a section
     * named "dependencies", which should contain locators (or [[Descriptor Descriptors]]) to
     * dependencies.
     *
     * @param config 	the dependencies to configure this object with.
     *
     * @see [[ConfigParams]]
     */
    DependencyResolver.prototype.configure = function (config) {
        var dependencies = config.getSection("dependencies");
        var names = dependencies.getKeys();
        for (var index = 0; index < names.length; index++) {
            var name_1 = names[index];
            var locator = dependencies.get(name_1);
            if (locator == null)
                continue;
            try {
                var descriptor = Descriptor_1.Descriptor.fromString(locator);
                if (descriptor != null)
                    this._dependencies[name_1] = descriptor;
                else
                    this._dependencies[name_1] = locator;
            }
            catch (ex) {
                this._dependencies[name_1] = locator;
            }
        }
    };
    /**
     * Sets this object's component references.
     *
     * @param references 	the component references to set.
     */
    DependencyResolver.prototype.setReferences = function (references) {
        this._references = references;
    };
    /**
     * Places a new dependency into this DependencyResolver object.
     *
     * @param name 		the dependency's name.
     * @param locator 	the locator to find the dependency by.
     */
    DependencyResolver.prototype.put = function (name, locator) {
        this._dependencies[name] = locator;
    };
    /**
     * Locates the dependency with the given name.
     *
     * @param name 	the name of the dependency to locate.
     * @returns the locator of the dependency that was located.
     *
     * @throws an Error if 'name' is null or no references are set.
     */
    DependencyResolver.prototype.locate = function (name) {
        if (name == null)
            throw new Error("Dependency name cannot be null");
        if (this._references == null)
            throw new Error("References shall be set");
        return this._dependencies[name];
    };
    /**
     * Gets a list of component references that match the locator stored by the given name
     * in the dependencies that are set.
     *
     * @param name 		the name of the dependency that stores the component's locator.
     * @returns a list, containing all component references found.
     */
    DependencyResolver.prototype.getOptional = function (name) {
        var locator = this.locate(name);
        return locator != null ? this._references.getOptional(locator) : null;
    };
    /**
     * Gets a list of component references that match the locator stored by the given name
     * in the dependencies that are set. If no references are found, an exception will be thrown.
     *
     * @param name 		the name of the dependency that stores the component's locator.
     * @returns a list, containing all component references found.
     *
     * @throws a [[ReferenceException]] if no dependencies (locators) are found by the given name.
     */
    DependencyResolver.prototype.getRequired = function (name) {
        var locator = this.locate(name);
        if (locator == null)
            throw new ReferenceException_1.ReferenceException(null, name);
        return this._references.getRequired(locator);
    };
    /**
     * Gets a component reference that matches the locator stored by the given name
     * in the dependencies that are set. The search is performed, starting from the
     * last-added references.
     *
     * @param name 		the name of the dependency that stores the component's locator.
     * @returns the component references found or <code>null</code> (if none were found).
     */
    DependencyResolver.prototype.getOneOptional = function (name) {
        var locator = this.locate(name);
        return locator != null ? this._references.getOneOptional(locator) : null;
    };
    /**
     * Gets a component reference that matches the locator stored by the given name
     * in the dependencies that are set. The search is performed, starting from the
     * last-added references.
     *
     * If no dependencies are found by the given name, an exception will be thrown.
     *
     * @param name 		the name of the dependency that stores the component's locator.
     * @returns the component reference found.
     *
     * @throws a [[ReferenceException]] if no dependencies (locators) are found by the given name.
     */
    DependencyResolver.prototype.getOneRequired = function (name) {
        var locator = this.locate(name);
        if (locator == null)
            throw new ReferenceException_1.ReferenceException(null, name);
        return this._references.getOneRequired(locator);
    };
    /**
     * Finds all references that match the specified query criteria and the specified type.
     *
     * @param name 		the name of the dependency that stores the component's locator.
     * @param required 	forces to raise an exception if no reference is found.
     * @returns a list of found references.
     *
     * @throws an Error if the name is <code>null</code>.
     * @throws a [[ReferenceException]] if required was set to <code>true</code>
     *          and nothing was found.
     */
    DependencyResolver.prototype.find = function (name, required) {
        if (name == null)
            throw new Error("Name cannot be null");
        var locator = this.locate(name);
        if (locator == null) {
            if (required)
                throw new ReferenceException_1.ReferenceException(null, name);
            return null;
        }
        return this._references.find(locator, required);
    };
    /**
     * Static method that creates a new DependencyResolver object using the tuples arrays that are passed as parameters.
     *
     * @param tuples    the tuples arrays to initialize the new References object with.
     *                  A tuples array contains index-based pairs, such as [key1,value1,key2,value2].
     * @returns the DependencyResolver object that was generated using the given tuples arrays,
     */
    DependencyResolver.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        var result = new DependencyResolver();
        if (tuples == null || tuples.length == 0)
            return result;
        for (var index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length)
                break;
            var name_2 = StringConverter_1.StringConverter.toString(tuples[index]);
            var locator = tuples[index + 1];
            result.put(name_2, locator);
        }
        return result;
    };
    return DependencyResolver;
}());
exports.DependencyResolver = DependencyResolver;
//# sourceMappingURL=DependencyResolver.js.map