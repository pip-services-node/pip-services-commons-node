import { ICommand } from './ICommand';
import { Schema } from '../validate/Schema';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';
/**
 * Implementation of the Command pattern, which provides an alternative way of calling method.
 * Instead of calling methods via their signatures, any call of any method can be represented
 * and executed using this universal Command class.
 *
 * @see [[ICommand]]
 *
 * ### Examples ###
 *
 * Example Command class implementation and using
 *
 * export class MyDataCommandSet extends CommandSet @see [[CommandSet]] {
 * private _controller: IMyDataController;

    constructor(controller: IMyDataController) { // Any data controller interface
        super();

        this._controller = controller;

        this.addCommand(this.makeGetMyDataCommand());
    }
 *  private makeGetMyDataCommand(): ICommand {
        return new Command(
            'get_mydata',
            null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                ...
            }
        );
    }
 * }
 */
export declare class Command implements ICommand {
    private readonly _schema;
    private readonly _function;
    private _name;
    /**
     * @param name      the name of the command. It identifies the command
     * @param schema    the command's schema.
     * @param func      the function that is to be executed by this command.
     * @throws  an Error if 'name' or 'func' are null, or if 'func' does not have
     *          a function type.
     */
    constructor(name: string, schema: Schema, func: any);
    /**
     * @returns the name of this command.
     */
    getName(): string;
    /**
     * Validates the [[Parameters args]] by the set schema and calls the function, passing the [[Parameters args]] to it.
     *
     * @param correlationId unique business transaction id to trace calls across components.
     * @param args          the parameters (arguments) to pass to this command for execution.
     * @param callback      the function that is to be called once execution is complete. If an exception is raised,
     *                      then it will be called with the error.
     * @throws an [[InvocationException]] if the execution fails.
     *
     * @see [[Parameters]]
     * @see [[InvocationException]]
     */
    execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void;
    /**
     * Validates the [[Parameters args]] that are to be passed to the function
     * using the set schema.
     *
     * @param args  the parameters (arguments) to validate using this command's schema.
     * @returns     an array of ValidationResults or an empty array (if no schema is set).
     *
     * @see [[Parameters]]
     * @see [[ValidationResult]]
     */
    validate(args: Parameters): ValidationResult[];
}
