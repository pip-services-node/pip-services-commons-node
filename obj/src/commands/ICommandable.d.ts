/** @module commands */
import { CommandSet } from './CommandSet';
/**
 * Interface for commandable interfaces, which are part of the command design pattern and are used to make
 * classes with certain logic, making them capable of receiving and processing commands in this universal form.
 *
 * Command design patterns allow for creation of "commandable interfaces", which are completely universal.
 * If an object extends ICommandable and returns a [[CommandSet]], then, with minimal code, a commandable
 * client can be implemented for this object, using various technologies.
 *
 * @see [[CommandSet]]
 */
export interface ICommandable {
    getCommandSet(): CommandSet;
}
