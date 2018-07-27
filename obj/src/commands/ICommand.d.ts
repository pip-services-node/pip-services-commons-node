/** @module commands */
import { IExecutable } from '../run/IExecutable';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';
/**
 * Interface for commands, which are used in command design patterns.
 *
 * Command design patterns come in handy when implementing remote procedure calls, as they replace unique
 * calls with universal "message transfer" calls. The message itself contains the called method's signature,
 * as well as the set of parameters.
 *
 * When designing calls of methods/commands using command design pattern, uniform interfaces can be used,
 * which, in turn, allow any amount of concrete methods to be called.
 *
 * Command design patterns can be used for [[ICommandInterceptor intercepting]] messages and various logging
 * implementations.
 */
export interface ICommand extends IExecutable {
    /**
     * Abstract function that will contain the logic for resolving the name of the command.
     */
    getName(): string;
    /**
     * Abstract function that will contain the logic for validating the [[Parameters parameters]]
     * (arguments) that are to be passed to the command.
     *
     * @param args  the parameters (arguments) to validate.
     * @returns     an array of ValidationResults.
     *
     * @see [[Parameters]]
     * @see [[ValidationResult]]
     */
    validate(args: Parameters): ValidationResult[];
}
