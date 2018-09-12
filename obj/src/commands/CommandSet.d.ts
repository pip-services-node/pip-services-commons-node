/** @module commands */
import { ICommand } from './ICommand';
import { IEvent } from './IEvent';
import { IEventListener } from './IEventListener';
import { ICommandInterceptor } from './ICommandInterceptor';
import { ValidationResult } from '../validate/ValidationResult';
import { Parameters } from '../run/Parameters';
/**
 * Defines a set of commands and events supported by a [[ICommandable]] object.
 * The [[CommandSet]] allows to use command interceptors to extend and alter
 * the command execution pipeline.
 *
 * @see [[Command]]
 * @see [[ICommandable]]
 *
 * ### Examples ###
 *
 * Example CommandSet class implementation and usage:
 *
 * export class MyDataCommandSet extends CommandSet {
 *    private _controller: IMyDataController;
 *
 *    constructor(controller: IMyDataController) { // Any data controller interface
 *      super();
 *      this._controller = controller;
 *      this.addCommand(this.makeGetMyDataCommand());
 *    }
 *
 *    private makeGetMyDataCommand(): ICommand {
 *      return new Command(
 *        'get_mydata',
 *        null,
 *        (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
 *          let param = args.getAsString('param');
 *          this._controller.getMyData(correlationId, param, callback);
 *        }
 *      );
 *    }
 * }
 *
 * @see [[CommandSet]]
 * @see [[Command]]
 */
export declare class CommandSet {
    private readonly _commands;
    private readonly _events;
    private readonly _interceptors;
    private _commandsByName;
    private _eventsByName;
    /**
     * Creates an empty CommandSet object.
     */
    constructor();
    /**
     * Gets all commands registered in this command set.
     * @returns a list of commands.
     *
     * @see [[ICommand]]
     */
    getCommands(): ICommand[];
    /**
     * Gets all events registred in this command set.
     * @returns a list of events.
     *
     * @see [[IEvent]]
     */
    getEvents(): IEvent[];
    /**
     * Searches for a command by its name.
     *
     * @param commandName the name of the command to search for.
     *
     * @returns the command, whose name matches the provided name.
     *
     * @see [[ICommand]]
     */
    findCommand(commandName: string): ICommand;
    /**
     * Searches for an event by its name in this command set.
     *
     * @param eventName the name of the event to search for.
     *
     * @returns the event, whose name matches the provided name.
     *
     * @see [[IEvent]]
     */
    findEvent(eventName: string): IEvent;
    private buildCommandChain;
    private rebuildAllCommandChains;
    /**
     * Adds a [[ICommand command]] to this command set.
     *
     * @param command   the command to add.
     *
     * @see [[ICommand]]
     */
    addCommand(command: ICommand): void;
    /**
     * Adds multiple [[ICommand commands]] to this command set.
     *
     * @param commands the array of commands to add.
     *
     * @see [[ICommand]]
     */
    addCommands(commands: ICommand[]): void;
    /**
     * Adds an [[IEvent event]] to this command set.
     *
     * @param event the event to add.
     *
     * @see [[IEvent]]
     */
    addEvent(event: IEvent): void;
    /**
     * Adds multiple [[IEvent events]] to this command set.
     *
     * @param events the array of events to add.
     *
     * @see [[IEvent]]
     */
    addEvents(events: IEvent[]): void;
    /**
     * Adds all of the commands and events registered in specified [[CommandSet command set]]
     * to this one.
     *
     * @param commandSet the CommandSet to add.
     */
    addCommandSet(commandSet: CommandSet): void;
    /**
     * Adds a [[IEventListener listener]] to receive notifications on fired events.
     *
     * @param listener  the listener to add.
     *
     * @see [[IEventListener]]
     */
    addListener(listener: IEventListener): void;
    /**
     * Removes previosly added [[IEventListener listener]].
     *
     * @param listener  the listener to remove.
     *
     * @see [[IEventListener]]
     */
    removeListener(listener: IEventListener): void;
    /**
     * Adds a [[ICommandInterceptor command interceptor]] to this command set.
     *
     * @param interceptor     the interceptor to add.
     *
     * @see [[ICommandInterceptor]]
     */
    addInterceptor(interceptor: ICommandInterceptor): void;
    /**
     * Executes a [[ICommand command]] specificed by its name.
     *
     * @param correlationId optional transaction id to trace calls across components.
     * @param commandName   the name of that command that is to be executed.
     * @param args          the parameters (arguments) to pass to the command for execution.
     * @param callback      the function that is to be called once execution is complete. If an exception is raised, then
     *                      it will be called with the error (for example: a ValidationException can be thrown).
     * @throws a [[BadRequestException]] if no command exists with the given name.
     *
     * @see [[ICommand]]
     * @see [[Parameters]]
     */
    execute(correlationId: string, commandName: string, args: Parameters, callback: (err: any, result: any) => void): void;
    /**
     * Validates [[Parameters args]] for command specified by its name using defined schema.
     * If validation schema is not defined than the methods returns no errors.
     * It returns validation error if the command is not found.
     *
     * @param commandName   the name of the command for which the 'args' must be validated.
     * @param args          the parameters (arguments) to validate.
     * @returns             an array of ValidationResults. If no command is found by the given
     *                      name, then the returned array of ValidationResults will contain a
     *                      single entry, whose type will be ValidationResultType.Error.
     *
     * @see [[Command]]
     * @see [[Parameters]]
     * @see [[ValidationResult]]
     */
    validate(commandName: string, args: Parameters): ValidationResult[];
    /**
     * Fires event specified by its name and notifies all registered
     * [[IEventListener listeners]]
     *
     * @param correlationId     optional transaction id to trace calls across components.
     * @param eventName         the name of the event that is to be fired.
     * @param args              the event arguments (parameters).
     */
    notify(correlationId: string, eventName: string, args: Parameters): void;
}
