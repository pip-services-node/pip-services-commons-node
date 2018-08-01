/**
 * @module config
 * @preferred
 *
 * Contains the implementation of the config design pattern. Configurable interface contains one and only method "configure",
 * which takes ConfigParams as a parameter (extends StringValueMap class). If any object needs to be configurable, we implement
 * this interface and parse the ConfigParams that the method received.
 *
 * ConfigReader's Parameterize method – allows us to take a standard configuration, and using a set of current parameters we can
 * parameterize it (in particular, used to parameterize using environment variables. When we create the configuration of a container,
 * we can use environment variables to tailor it to the system, dynamically add addresses, ports, etc)
 */
export { ConfigParams } from './ConfigParams';
export { IConfigurable } from './IConfigurable';
export { IReconfigurable } from './IReconfigurable';
export { NameResolver } from './NameResolver';
export { OptionResolver } from './OptionResolver';
