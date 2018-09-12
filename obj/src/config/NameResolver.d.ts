/** @module config */
import { ConfigParams } from './ConfigParams';
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
export declare class NameResolver {
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
    static resolve(config: ConfigParams, defaultName?: string): string;
}
