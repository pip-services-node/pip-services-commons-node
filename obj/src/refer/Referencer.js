"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module refer */
let _ = require('lodash');
/**
 * Helper class that assigns references to components
 */
class Referencer {
    /**
     * Assigns references to component that implement IReferenceable interface
     * @param references references to be assigned
     * @param component a components to assign references
     * @param callback callback function with execution error
     */
    static setReferencesForOne(references, component) {
        if (_.isFunction(component.setReferences))
            component.setReferences(references);
    }
    /**
     * Assigns references to components that implement IReferenceable interface
     * @param references references to be assigned
     * @param components a list of components to assign references
     */
    static setReferences(references, components) {
        for (let index = 0; index < components.length; index++)
            Referencer.setReferencesForOne(references, components[index]);
    }
    /**
     * Clears references for component that implement IUnreferenceable interface
     * @param component a components to clear references
     */
    static unsetReferencesForOne(component) {
        if (_.isFunction(component.unsetReferences))
            component.unsetReferences();
    }
    /**
     * Clears references for components that implement IUnreferenceable interface
     * @param components a list of components to clear references
     */
    static unsetReferences(components) {
        for (let index = 0; index < components.length; index++)
            Referencer.unsetReferencesForOne(components[index]);
    }
}
exports.Referencer = Referencer;
//# sourceMappingURL=Referencer.js.map