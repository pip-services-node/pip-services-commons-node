/** @module commands */
/** @hidden */
let _ = require('lodash');

import { ICommand } from './ICommand';
import { InvocationException } from '../errors/InvocationException';
import { Schema } from '../validate/Schema';
import { IExecutable } from '../run/IExecutable';
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
 * Example Command class implementation and usage:
 * 
 *     export class MyDataCommandSet extends CommandSet {
 *         private _controller: IMyDataController;
 *         constructor(controller: IMyDataController) { // Any data controller interface
 *             super();
 *             this._controller = controller;
 *             this.addCommand(this.makeGetMyDataCommand());
 *         }   
 *         private makeGetMyDataCommand(): ICommand {
 *             return new Command(
 *                 'get_mydata',
 *                 null,
 *                 (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
 *                     ...
 *                 }
 *             );
 *         }
 *     }
 * @see [[CommandSet]]
 */
export class Command implements ICommand {
    private readonly _schema: Schema;
    private readonly _function: (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => void;
    private _name: string;

    /**
     * @param name      the name of the command. It identifies the command
     * @param schema    the command's schema.
     * @param func      the function that is to be executed by this command.
     * @throws  an Error if 'name' or 'func' are null, or if 'func' does not have 
     *          a function type.
     */
    public constructor(name: string, schema: Schema, func: any) {
        if (!name)
            throw new Error("Name cannot be null");
        if (!func)
            throw new Error("Function cannot be null");

        this._name = name;
        this._schema = schema;

        if (!_.isFunction(func))
            this._function = func.execute;
        else
            this._function = func;

        if (!_.isFunction(this._function))
            throw new Error("Function doesn't have function type");
    }

    /** 
     * @returns the name of this command. 
     */
    public getName(): string {
        return this._name;
    }

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
    public execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void {
        if (this._schema) {
            try {
                this._schema.validateAndThrowException(correlationId, args);
            } catch (ex) {
                callback(ex, null);
                return;
            }
        }

        try {
            this._function(correlationId, args, callback);
        } catch (ex) {
            let err = new InvocationException(
                correlationId,
                "EXEC_FAILED",
                "Execution " + this.getName() + " failed: " + ex
            ).withDetails("command", this.getName()).wrap(ex);

            callback(err, null);
        }
    }

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
    public validate(args: Parameters): ValidationResult[] {
        if (this._schema)
            return this._schema.validate(args);

        return [];
    }
}
