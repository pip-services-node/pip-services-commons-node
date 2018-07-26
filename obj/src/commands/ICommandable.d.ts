/** @module commands */
import { CommandSet } from './CommandSet';
/**
 * Interface for commandable interfaces, which are part of the command design pattern. Commandable interfaces are
 * used to make classes that contain certain logic, making them capable of receiving and processing commands of a
 * certain universal form. This, in turn, makes the commandable interfaces completely universal and easy to use.
 *
 * If an object extends ICommandable and returns a [[CommandSet]], then, with minimal code, a commandable
 * client can be implemented for this object, using various technologies.
 *
 * @see [[CommandSet]]
 */
export interface ICommandable {
    /**
     * Abstract method that will contain the logic for returning the [[CommandSet set of commands and events]] that
     * are supported by a commandable interface.
     *
     * @see [[CommandSet]]
     */
    getCommandSet(): CommandSet;
}
