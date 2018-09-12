/** @module config */
import { ConfigParams } from './ConfigParams';
/**
 * Configurable interface that contains the [[configure]] method. If an object
 * needs to be configurable, it can implement this interface and parse the
 * ConfigParams that 'configure' receives as a parameter.
 *
 * @see [[ConfigParams]]
 *
 * ### Examples ###
 *
 * Example implementation of the IConfigurable interface:
 *
 *     export class MyClass implements IConfigurable {
 *         let myParam : string = "default value";
 *         public configure(config: ConfigParams) : void  {
 *             myParam = config.getAsStringWithDefault("options.param", myParam);
 *             ...
 *         }
 *     }
 */
export interface IConfigurable {
    /**
     * Abstract method for configuring objects using ConfigParams.
     *
     * @param config    ConfigParams to use for object configuration.
     */
    configure(config: ConfigParams): void;
}
