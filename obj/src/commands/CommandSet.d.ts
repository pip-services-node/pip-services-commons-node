/** @module commands */
import { ICommand } from './ICommand';
import { IEvent } from './IEvent';
import { IEventListener } from './IEventListener';
import { ICommandInterceptor } from './ICommandInterceptor';
import { ValidationResult } from '../validate/ValidationResult';
import { Parameters } from '../run/Parameters';
/**
 * Defines a set of commands and events, which a given [[ICommandable commandable interface]]
 * is capable of processing.
 *
 * @see [[Command]]
 * @see [[ICommandable]]
 */
export declare class CommandSet {
    private readonly _commands;
    private readonly _events;
    private readonly _interceptors;
    private _commandsByName;
    private _eventsByName;
    /**
     * Creates a new CommandSet object.
     */
    constructor();
    /**
     * @returns the commands included in this CommandSet.
     *
     * @see [[ICommand]]
     */
    getCommands(): ICommand[];
    /**
     * @returns the events included in this CommandSet.
     *
     * @see [[IEvent]]
     */
    getEvents(): IEvent[];
    /**
     * Searches for a command by its name in this CommandSet.
     *
     * @param commandName   the name of the command to search for.
     *
     * @see [[ICommand]]
     */
    findCommand(commandName: string): ICommand;
    /**
     * Searches for an event by its name in this CommandSet.
     *
     * @param eventName     the name of the event to search for.
     *
     * @see [[IEvent]]
     */
    findEvent(eventName: string): IEvent;
    /**
     * Adds the command passed to the private command chain '_commandsByName', after
     * linking it with all of the command interceptors of this CommandSet.
     *
     * @param command
     */
    private buildCommandChain;
    /**
     * Rebuilds the private command chain '_commandsByName' using
     * the commands stored in this CommandSet.
     *
     * @see [[buildCommandChain]]
     */
    private rebuildAllCommandChains;
    /**
     * Adds a [[ICommand command]] to this CommandSet.
     *
     * @param command   the command to add.
     *
     * @see [[ICommand]]
     */
    addCommand(command: ICommand): void;
    /**
     * Adds multiple [[ICommand commands]] to this CommandSet.
     *
     * @param commands  the array of commands to add.
     *
     * @see [[ICommand]]
     */
    addCommands(commands: ICommand[]): void;
    /**
     * Adds an [[IEvent event]] to this CommandSet.
     *
     * @param event     the event to add.
     *
     * @see [[IEvent]]
     */
    addEvent(event: IEvent): void;
    /**
     * Adds multiple [[IEvent events]] to this CommandSet.
     *
     * @param events    the array of events to add.
     *
     * @see [[IEvent]]
     */
    addEvents(events: IEvent[]): void;
    /**
     * Adds all of the commands and events included in the passed CommandSet
     * to this CommandSet.
     *
     * @param commandSet    the CommandSet to add.
     */
    addCommandSet(commandSet: CommandSet): void;
    /**
     * Adds a [[IEventListener listener]] to all of the events in this CommandSet.
     *
     * @param listener  the listener to add.
     *
     * @see [[IEventListener]]
     */
    addListener(listener: IEventListener): void;
    /**
     * Removes a [[IEventListener listener]] from all of the events in this CommandSet.
     *
     * @param listener  the listener to remove.
     *
     * @see [[IEventListener]]
     */
    removeListener(listener: IEventListener): void;
    /**
     * Adds a [[ICommandInterceptor command interceptor]] to this CommandSet.
     *
     * @param interceptor     the interceptor to add.
     *
     * @see [[ICommandInterceptor]]
     */
    addInterceptor(interceptor: ICommandInterceptor): void;
    /**
     * Executes the [[ICommand command]] with the given name, using the given [[Parameters parameters]] (arguments).
     *
     * @param correlationId unique business transaction id to trace calls across components.
     * @param commandName   the name of that command that is to be executed.
     * @param args          the parameters (arguments) to pass to the command for execution.
     * @param callback      the function that is to be called once execution is complete. If an exception is raised, then
     *                      it will be called with the error (for example: a ValidationException can be thrown).
     * @throws a [[BadRequestException]], if no command exists with the given name.
     *
     * @see [[ICommand]]
     * @see [[Parameters]]
     */
    execute(correlationId: string, commandName: string, args: Parameters, callback: (err: any, result: any) => void): void;
    /**
     * Validates the [[Parameters parameters]] (arguments) that are to be passed to the
     * [[ICommand command]] with the given name.
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
     * Raises the event with the given name and notifies the event's listeners using the
     * correlationId and [[Parameters parameters]] (arguments) given.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param eventName         the name of the event that is to be raised.
     * @param args              the parameters to raise this event with.
     */
    notify(correlationId: string, eventName: string, args: Parameters): void;
}
