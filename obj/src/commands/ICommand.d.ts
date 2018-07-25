/** @module commands */
import { IExecutable } from '../run/IExecutable';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';
/**
 * Interface for commands, which are used in command design patterns.
 *
 * Command design patterns can come to be of use when implementing various remote procedure calls,
 * as they replace unique calls with universal "message transfer" calls. The message itself contains
 * the called method's signature, as well as the set of parameters.
 *
 * By transforming the call of a method/command into a command design pattern, the opportunity
 * of using uniform interfaces becomes available, which allows for calling any amount of concrete methods.
 *
 * Command design patterns can be used for [[ICommandIntercepter intercepting]] messages and various logging
 * implementations.
 */
export interface ICommand extends IExecutable {
    getName(): string;
    validate(args: Parameters): ValidationResult[];
}
