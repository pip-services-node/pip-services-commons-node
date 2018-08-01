/** @module commands */
import { ICommand } from './ICommand';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';

/**
 * Interface for command interceptors, which can modify the message execution pipeline. Command interceptors are used 
 * as a part of aspect-oriented programming. 
 * 
 * Aspect-oriented programming contains perpendicular logic (aspects, for example: logging, caching, blocking), which 
 * can be removed from the business logic and added to these perpendicular calls. When using interceptors, a command can 
 * pass through an execution chain, consisting of interceptors, which can: 
 * - simply make some note of the command, notify, log, get metrics, or do some other passive task; or
 * - intercept the command completely and, for example, return a previous record of the call from the cache. 
 * 
 * A command’s return value can also be intercepted in a similar manner. For example: the result can be written to cache, 
 * so that the next call doesn’t have to be made. 
 * 
 * Command interceptors are also often used for intercepting a command's unique call and replace it with a universal 
 * "message transfer" call.
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
     * @param correlationId unique business transaction id to trace calls across components.
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
