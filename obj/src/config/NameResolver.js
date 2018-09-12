"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Descriptor_1 = require("../refer/Descriptor");
/**
 * Contains the static method [[resolve]], which can be used for resolving the name
 * of a ConfigParams configuration.
 *
 * ### Examples ###
 *
 * Example usage of the static <code>resolve</code> method:
 *
 *     public nameResolution : void {
 *         let config = ConfigParams.fromTuples("Id", "MyName");
 *         let name = NameResolver.resolve(config);
 *         ...
 *     }
 */
var NameResolver = /** @class */ (function () {
    function NameResolver() {
    }
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
    NameResolver.resolve = function (config, defaultName) {
        if (defaultName === void 0) { defaultName = null; }
        var name = config.getAsNullableString("name") || config.getAsNullableString("id");
        if (name == null) {
            var descriptorStr = config.getAsNullableString("descriptor");
            var descriptor = Descriptor_1.Descriptor.fromString(descriptorStr);
            if (descriptor != null)
                name = descriptor.getName();
        }
        return name || defaultName;
    };
    return NameResolver;
}());
exports.NameResolver = NameResolver;
//# sourceMappingURL=NameResolver.js.map