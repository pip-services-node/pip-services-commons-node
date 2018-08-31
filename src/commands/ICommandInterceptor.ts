/** @module commands */
import { ICommand } from './ICommand';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';

/**
 * 
 * Interface for stackable command intercepters, which can modify the message execution pipeline. Command interceptors are used 
 * to intercept calls, perform a set of actions, and, optionally, cancel the command's actual execution by simply 
 * returning a result. 
 * 
 * A command’s return value can also be intercepted in a similar manner. For example: the result can be written to cache, 
 * so that the next call doesn’t have to be made. 
 * 
 * This mechanism can be used for authentication, logging, and other functions.
 * 
 * Command interceptors are also often used for intercepting a command's unique call and replace it with a universal 
 * "message transfer" call.
 * 
 * @see [[ICommand]]
 * @see [[InterceptedCommand]]
 * 
 * ### Examples ###
 * 
 * Example implementation and usage of the ICommandInterceptor interface:
 * 
 *     export class MyService implements IMyService, ICommandInterceptor
 *     {
 *         constructor() { }
 *         
 *         private getName(command: ICommand): string {
 *             return command.getName();
 *         }
 *         
 *         public execute(correlationId: string, command: ICommand, args: Parameters, callback: (err: any, result: any) => void): void {
 *             // Execute command here...
 *         }
 *         
 *         private validate(command: ICommand, args: Parameters): ValidationResult[] {
 *             // Validate arguments here...
 *         }
 *     }
 * 
 *     export class MyService2 implements IMyService2
 *     {
 *         private _interceptedCommand: InterceptedCommand;
 *         private _command: ICommand;
 *         private _myService: IMyService;
 *         
 *         constructor() {
 *             // Getting or creating _myService
 *             // Getting or creating _command
 *             _interceptedCommand = new InterceptedCommand(_myService, _command);
 *         }
 *         
 *         private myFunction(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void {
 *             _myService.execute(correlationId, args, callbak);
 *         }
 *     }
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
