/** @module commands */
import { CommandSet } from './CommandSet';

export interface ICommandable {
    getCommandSet(): CommandSet;
}