/** @module commands */
import { ICommand } from './ICommand';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';
/**
 * An interface for stackable command intercepters, which can extend and modify the command execution pipeline.
 *
 * This mechanism can be used for authentication, logging, and other functions.
 *
 * @see [[ICommand]]
 * @see [[InterceptedCommand]]
 */
export interface ICommandInterceptor {
    /**
     * Abstract method that will contain the logic for resolving the name of
     * a [[ICommand command]].
     *
     * @param command   the command to get the name of.
     * @returns the name of the command passed as a parameter.
     */
    getName(command: ICommand): string;
    /**
     * Abstract method that will contain the logic for executing the [[ICommand command]] passed as a parameter,
     * using the given [[Parameters parameters]] (arguments).
     *
     * @param correlationId unique transaction id to trace calls across components.
     * @param command       the command that is to be executed.
     * @param args          the parameters (arguments) to pass to the command for execution.
     * @param callback      the function that is to be called once execution is complete. If an exception is raised, then
     *                      it will be called with the error.
     *
     * @see [[Parameters]]
     */
    execute(correlationId: string, command: ICommand, args: Parameters, callback: (err: any, result: any) => void): void;
    /**
     * Abstract method that will contain the logic for validating the [[Parameters parameters]] (arguments)
     * that are to be passed to the [[ICommand command]].
     *
     * @param command   the command to validate the args for.
     * @param args      the parameters (arguments) to validate.
     * @returns         an array of ValidationResults.
     *
     * @see [[Parameters]]
     * @see [[ValidationResult]]
     */
    validate(command: ICommand, args: Parameters): ValidationResult[];
}
