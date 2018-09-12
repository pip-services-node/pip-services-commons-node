/** @module commands */
import { ICommand } from './ICommand';
import { ICommandInterceptor } from './ICommandInterceptor';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';

/**
 * Class for [[ICommand commands]] that are intercepted by [[ICommandInterceptor command interceptors]] 
 * in an execution chain(*). Intercepted commands are used as pattern decorators in the command design pattern. 
 * They are represented as regular commands but run their own logic before calling the actual command.
 * 
 * (*)An execution chain consists of [[ICommandInterceptor command interceptors]], through which a given 
 * [[ICommand command]] is passed. Each command interceptor runs perpendicular logic (aspects, such as 
 * logging, caching, blocking) before (or instead of) actually calling the command.
 * 
 * @see [[ICommand]]
 * @see [[ICommandInterceptor]]
 * 
 * ### Examples ###
 * 
 * Example InterceptedCommand class implementation and usage:
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
 *             _interceptedCommand.execute(correlationId, args, callbak);
 *         }
 *     }
 */
export class InterceptedCommand implements ICommand {
    private readonly _interceptor: ICommandInterceptor;
    private readonly _next: ICommand;

    /**
     * Creates a new InterceptedCommand, which serves as a link in an execution chain. Contains information 
     * about the interceptor that is being used and the next command in the chain.
     * 
     * @param interceptor   the interceptor that is intercepting the command.
     * @param next          (link to) the next command in the command's execution chain.
     */
    public constructor(interceptor: ICommandInterceptor, next: ICommand) {
        this._interceptor = interceptor;
        this._next = next;
    }

    /**
     * @returns the name of the command that is being intercepted.
     */
    public getName(): string {
        return this._interceptor.getName(this._next);
    }


    /**
     * Executes the next command in the execution chain using the given [[Parameters parameters]] (arguments).
     * 
     * @param correlationId unique transaction id to trace calls across components.
     * @param args          the parameters (arguments) to pass to the command for execution.
     * @param callback      the function that is to be called once execution is complete. If an exception is raised, then
     *                      it will be called with the error.
     * 
     * @see [[Parameters]]
     */
    public execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void {
        this._interceptor.execute(correlationId, this._next, args, callback);
    }

    /**
     * Validates the [[Parameters parameters]] (arguments) that are to be passed to the command that is next 
     * in the execution chain.
     * 
     * @param args      the parameters (arguments) to validate for the next command.
     * @returns         an array of ValidationResults.
     * 
     * @see [[Parameters]]
     * @see [[ValidationResult]]
     */
    public validate(args: Parameters): ValidationResult[] {
        return this._interceptor.validate(this._next, args);
    }

}
