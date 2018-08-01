"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var ConfigParams_1 = require("./ConfigParams");
exports.ConfigParams = ConfigParams_1.ConfigParams;
var NameResolver_1 = require("./NameResolver");
exports.NameResolver = NameResolver_1.NameResolver;
var OptionResolver_1 = require("./OptionResolver");
exports.OptionResolver = OptionResolver_1.OptionResolver;
//# sourceMappingURL=index.js.map