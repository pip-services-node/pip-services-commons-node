/** @module commands */
import { IExecutable } from '../run/IExecutable';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';
/**
 * Interface for Commands, which are part of the Command design pattern.
 *
 * Commands provide an alternative way of calling methods. Instead of calling methods via their signatures,
 * any call of any method can be represented and executed using the universal Command pattern.
 *
 * Command design patterns also allow for command [[ICommandInterceptor interception]] and building execution
 * chains out of [[InterceptedCommand intercepted commands]].
 *
 * @see [[Command]]
 * @see [[ICommandInterceptor]]
 * @see [[InterceptedCommand]]
 *
 * ### Examples ###
 *
 * export class MyCommand implements ICommand {
 *      private name : string;
 *
 *      public getName(): string {
            return this._name;
        }

        public validate(): ValidationResult[] {
            ...
        }

        ...
 * }
 */
export interface ICommand extends IExecutable {
    /**
     * Abstract function that will contain the logic for resolving the name of the command.
     */
    getName(): string;
    /**
     * Abstract function that will contain the logic for validating the [[Parameters args]]
     * that are to be passed to the command.
     *
     * @param args  the parameters (arguments) to validate.
     * @returns     an array of ValidationResults.
     *
     * @see [[Parameters]]
     * @see [[ValidationResult]]
     */
    validate(args: Parameters): ValidationResult[];
}
