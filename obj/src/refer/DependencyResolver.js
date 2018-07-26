"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module refer */
const StringConverter_1 = require("../convert/StringConverter");
const ReferenceException_1 = require("./ReferenceException");
const Descriptor_1 = require("./Descriptor");
class DependencyResolver {
    constructor(config, references) {
        this._dependencies = {};
        if (config != null)
            this.configure(config);
        if (references != null)
            this.setReferences(references);
    }
    configure(config) {
        let dependencies = config.getSection("dependencies");
        let names = dependencies.getKeys();
        for (let index = 0; index < names.length; index++) {
            let name = names[index];
            let locator = dependencies.get(name);
            if (locator == null)
                continue;
            try {
                let descriptor = Descriptor_1.Descriptor.fromString(locator);
                if (descriptor != null)
                    this._dependencies[name] = descriptor;
                else
                    this._dependencies[name] = locator;
            }
            catch (ex) {
                this._dependencies[name] = locator;
            }
        }
    }
    setReferences(references) {
        this._references = references;
    }
    put(name, locator) {
        this._dependencies[name] = locator;
    }
    locate(name) {
        if (name == null)
            throw new Error("Dependency name cannot be null");
        if (this._references == null)
            throw new Error("References shall be set");
        return this._dependencies[name];
    }
    /**
     * Gets a list of component references that match provided locator
     * @param name a dependency name
     * @return a list with found component references
     */
    getOptional(name) {
        let locator = this.locate(name);
        return locator != null ? this._references.getOptional(locator) : null;
    }
    /**
     * Gets a list of component references that match provided locator.
     * If no references found an exception is thrown
     * @param name a dependency name
     * @return a list with found component references
     * @throws a [[ReferenceException]] when no single component reference is found
     */
    getRequired(name) {
        let locator = this.locate(name);
        if (locator == null)
            throw new ReferenceException_1.ReferenceException(null, name);
        return this._references.getRequired(locator);
    }
    /**
     * Gets a component references that matches provided locator.
     * The search is performed from latest added references.
     * @param name a dependency name
     * @return a found component reference or <code>null</code> if nothing was found
     */
    getOneOptional(name) {
        let locator = this.locate(name);
        return locator != null ? this._references.getOneOptional(locator) : null;
    }
    /**
     * Gets a component references that matches provided locator.
     * The search is performed from latest added references.
     * @param name a dependency name
     * @return a found component reference
     * @throws a [[ReferenceException]] when requested component wasn't found
     */
    getOneRequired(name) {
        let locator = this.locate(name);
        if (locator == null)
            throw new ReferenceException_1.ReferenceException(null, name);
        return this._references.getOneRequired(locator);
    }
    /**
     * Find all references by specified query criteria
     * @param name a dependency name
     * @param required force to raise exception is no reference is found
     * @return list of found references
     * @throws a [[ReferenceException]] when requested component wasn't found
     */
    find(name, required) {
        if (name == null)
            throw new Error("Name cannot be null");
        let locator = this.locate(name);
        if (locator == null) {
            if (required)
                throw new ReferenceException_1.ReferenceException(null, name);
            return null;
        }
        return this._references.find(locator, required);
    }
    static fromTuples(...tuples) {
        let result = new DependencyResolver();
        if (tuples == null || tuples.length == 0)
            return result;
        for (let index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length)
                break;
            let name = StringConverter_1.StringConverter.toString(tuples[index]);
            let locator = tuples[index + 1];
            result.put(name, locator);
        }
        return result;
    }
}
exports.DependencyResolver = DependencyResolver;
//# sourceMappingURL=DependencyResolver.js.map