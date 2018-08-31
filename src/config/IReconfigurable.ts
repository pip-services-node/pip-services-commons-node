/** @module config */
import { IConfigurable } from './IConfigurable';

/**
 * Interface for components that can be reconfigured when configuration changes
 * 
 * @see [[IConfigurable]]
 * 
 * ### Examples ###
 * 
 * Example implementation of the IReconfigurable interface:
 * 
 *     export class MyClass implements IReconfigurable {
 *         let myParam : string = "default value";
 *         
 *         public configure(config: ConfigParams) : void  {
 *             myParam = config.getAsStringWithDefault("options.param", myParam);
 *             ...
 *         }
 *     }
 */
export interface IReconfigurable extends IConfigurable {
}