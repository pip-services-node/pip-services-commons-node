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
 * Event listeners and command interceptors can also be added to a command set. If command interceptors are
 * added before the commands themselves, then execution chains will be built for each command that is added.
 * Otherwise - no execution chains will be generated.
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
     * @returns the commands included in this command set.
     *
     * @see [[ICommand]]
     */
    getCommands(): ICommand[];
    /**
     * @returns the events included in this command set.
     *
     * @see [[IEvent]]
     */
    getEvents(): IEvent[];
    /**
     * Searches for a command by its name in this command set.
     *
     * @param commandName   the name of the command to search for.
     *
     * @see [[ICommand]]
     */
    findCommand(commandName: string): ICommand;
    /**
     * Searches for an event by its name in this command set.
     *
     * @param eventName     the name of the event to search for.
     *
     * @see [[IEvent]]
     */
    findEvent(eventName: string): IEvent;
    /**
     * Builds a command chain(*) for the given command using the command interceptors
     * present in this command set. Once the chain is built, it is added to this object's private
     * '_commandsByName' list.
     *
     * (*)A command chain (execution chain) consists of command interceptors, through which a given
     * command is passed. Each command interceptor runs perpendicular logic (aspects, such as
     * logging, caching, blocking) before (or instead of) actually calling the command.
     *
     * @param command
     */
    private buildCommandChain;
    /**
     * Rebuilds the private '_commandsByName' list using the commands stored in this command set.
     * If interceptors are present in this command set, then a command (execution) chain will be
     * built for each command.
     *
     * @see [[buildCommandChain]]
     */
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
     * @param commands  the array of commands to add.
     *
     * @see [[ICommand]]
     */
    addCommands(commands: ICommand[]): void;
    /**
     * Adds an [[IEvent event]] to this command set.
     *
     * @param event     the event to add.
     *
     * @see [[IEvent]]
     */
    addEvent(event: IEvent): void;
    /**
     * Adds multiple [[IEvent events]] to this command set.
     *
     * @param events    the array of events to add.
     *
     * @see [[IEvent]]
     */
    addEvents(events: IEvent[]): void;
    /**
     * Adds all of the commands and events included in the passed CommandSet object
     * to this command set.
     *
     * @param commandSet    the CommandSet to add.
     */
    addCommandSet(commandSet: CommandSet): void;
    /**
     * Adds a [[IEventListener listener]] to all of the events in this command set.
     *
     * @param listener  the listener to add.
     *
     * @see [[IEventListener]]
     */
    addListener(listener: IEventListener): void;
    /**
     * Removes a [[IEventListener listener]] from all of the events in this command set.
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
     * Executes the [[ICommand command]] with the given name, using the given [[Parameters parameters]] (arguments).
     *
     * @param correlationId unique business transaction id to trace calls across components.
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
     * correlation id and [[Parameters parameters]] (arguments) given.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param eventName         the name of the event that is to be raised.
     * @param args              the parameters to raise this event with.
     */
    notify(correlationId: string, eventName: string, args: Parameters): void;
}
