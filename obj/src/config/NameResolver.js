"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Descriptor_1 = require("../refer/Descriptor");
/**
 * Contains the static method [[resolve]], which can be used for resolving the name
 * of a ConfigParams configuration.
 */
class NameResolver {
    /**
     * Static method for resolving the name of a ConfigParams object. The configuration's name is
     * searched for using the keys: "name", "id", or "descriptor". In the case of
     * "descriptor", the name of the [[Descriptor]] object will be returned. If no name is found,
     * 'defaultName' will be returned.
     *
     * @param config        ConfigParams, whose name is to be resolved.
     * @param defaultName   (optional) value to be returned if no name is resolved. Defaults to null if omitted.
     * @returns             resolved name or 'defaultName'.
     */
    static resolve(config, defaultName = null) {
        let name = config.getAsNullableString("name") || config.getAsNullableString("id");
        if (name == null) {
            let descriptorStr = config.getAsNullableString("descriptor");
            let descriptor = Descriptor_1.Descriptor.fromString(descriptorStr);
            if (descriptor != null)
                name = descriptor.getName();
        }
        return name || defaultName;
    }
}
exports.NameResolver = NameResolver;
//# sourceMappingURL=NameResolver.js.map