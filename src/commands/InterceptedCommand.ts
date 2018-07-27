/** @module commands */
import { ICommand } from './ICommand';
import { ICommandInterceptor } from './ICommandInterceptor';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';

/**
 * Class for [[ICommand commands]] that were intercepted by a [[ICommandInterceptor command interceptor]] 
 * and are to be executed next.
 * 
 * @see [[ICommand]]
 * @see [[ICommandInterceptor]]
 */
export class InterceptedCommand implements ICommand {
    private readonly _interceptor: ICommandInterceptor;
    private readonly _next: ICommand;

    /**
     * @param interceptor   the interceptor that intercepted the next command.
     * @param next          the command that is to be executed next.
     */
    public constructor(interceptor: ICommandInterceptor, next: ICommand) {
        this._interceptor = interceptor;
        this._next = next;
    }

    /**
     * @returns the name of the next command.
     */
    public getName(): string {
        return this._interceptor.getName(this._next);
    }


    /**
     * Executes the next [[ICommand command]] using the given [[Parameters parameters]] (arguments).
     * 
     * @param correlationId unique business transaction id to trace calls across components.
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
     * Validates the [[Parameters parameters]] (arguments) that are to be passed to the next 
     * [[ICommand command]].
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
