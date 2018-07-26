/** @module commands */
import { ICommand } from './ICommand';
import { IEvent } from './IEvent';
import { IEventListener } from './IEventListener';
import { ICommandIntercepter } from './ICommandIntercepter';
import { InterceptedCommand } from './InterceptedCommand';
import { BadRequestException } from '../errors/BadRequestException';
import { ValidationException } from '../validate/ValidationException';
import { ValidationResult } from '../validate/ValidationResult';
import { ValidationResultType } from '../validate/ValidationResultType';
import { Parameters } from '../run/Parameters';
import { IdGenerator } from '../data/IdGenerator';

/**
 * Defines a set of commands and events, which a given [[ICommandable commandable interface]] 
 * is capable of processing.
 * 
 * @see [[Command]]
 * @see [[ICommandable]]
 */
export class CommandSet {
    private readonly _commands: ICommand[] = [];
    private readonly _events: IEvent[] = [];
    private readonly _intercepters: ICommandIntercepter[] = [];

    private _commandsByName: { [name: string]: ICommand } = {};
    private _eventsByName: { [name: string]: IEvent } = {};

    /**
     * Creates a new CommandSet object.
     */
    public constructor() { }

    /**
     * @returns the commands included in this CommandSet.
     * 
     * @see [[ICommand]]
     */
    public getCommands(): ICommand[] {
        return this._commands;
    }

    /**
     * @returns the events included in this CommandSet.
     * 
     * @see [[IEvent]]
     */
    public getEvents(): IEvent[] {
        return this._events;
    }

    /**
     * Searches for a command by its name in this CommandSet.
     * 
     * @param commandName   the name of the command to search for.
     * 
     * @see [[ICommand]]
     */
    public findCommand(commandName: string): ICommand {
        return this._commandsByName[commandName];
    }

    /**
     * Searches for an event by its name in this CommandSet.
     * 
     * @param eventName     the name of the event to search for.
     * 
     * @see [[IEvent]]
     */
    public findEvent(eventName: string): IEvent {
        return this._eventsByName[eventName];
    }

    /**
     * Adds the command passed to the private command chain '_commandsByName', after 
     * linking it with all of the command interceptors of this CommandSet.
     * 
     * @param command 
     */
    private buildCommandChain(command: ICommand): void {
        let next: ICommand = command;

        for (var i = this._intercepters.length - 1; i >= 0; i--)
            next = new InterceptedCommand(this._intercepters[i], next);

        this._commandsByName[next.getName()] = next;
    }

    /**
     * Rebuilds the private command chain '_commandsByName' using
     * the commands stored in this CommandSet.
     * 
     * @see [[buildCommandChain]]
     */
    private rebuildAllCommandChains(): void {
        this._commandsByName = {};

        for (var i = 0; i < this._commands.length; i++) {
            let command: ICommand = this._commands[i];
            this.buildCommandChain(command);
        }
    }

    /**
     * Adds a [[ICommand command]] to this CommandSet.
     * 
     * @param command   the command to add.
     * 
     * @see [[ICommand]]
     */
    public addCommand(command: ICommand): void {
        this._commands.push(command);
        this.buildCommandChain(command);
    }

    /**
     * Adds multiple [[ICommand commands]] to this CommandSet.
     * 
     * @param commands  the array of commands to add.
     * 
     * @see [[ICommand]]
     */
    public addCommands(commands: ICommand[]): void {
        for (var i = 0; i < commands.length; i++) 
            this.addCommand(commands[i]);
    }

    /**
     * Adds an [[IEvent event]] to this CommandSet.
     * 
     * @param event     the event to add.
     * 
     * @see [[IEvent]]
     */
    public addEvent(event: IEvent): void {
        this._events.push(event);
        this._eventsByName[event.getName()] = event;
    }

    /**
     * Adds multiple [[IEvent events]] to this CommandSet.
     * 
     * @param events    the array of events to add.
     * 
     * @see [[IEvent]]
     */
    public addEvents(events: IEvent[]): void {
        for (var i = 0; i < events.length; i++)
            this.addEvent(events[i]);
    }

    /**
     * Adds all of the commands and events included in the passed CommandSet 
     * to this CommandSet.
     * 
     * @param commandSet    the CommandSet to add.
     */
    public addCommandSet(commandSet: CommandSet): void {
        this.addCommands(commandSet.getCommands());
        this.addEvents(commandSet.getEvents());
    }

    /**
     * Adds a [[IEventListener listener]] to all of the events in this CommandSet.
     * 
     * @param listener  the listener to add.
     * 
     * @see [[IEventListener]]
     */
    public addListener(listener: IEventListener): void {
        for (var i = 0; i < this._events.length; i++)
            this._events[i].addListener(listener);
    }

    /**
     * Removes a [[IEventListener listener]] from all of the events in this CommandSet.
     * 
     * @param listener  the listener to remove.
     * 
     * @see [[IEventListener]]
     */
    public removeListener(listener: IEventListener): void {
        for (var i = 0; i < this._events.length; i++)
            this._events[i].removeListener(listener);
    }

    /**
     * Adds a [[ICommandIntercepter command interceptor]] to this CommandSet.
     * 
     * @param intercepter     the interceptor to add.
     * 
     * @see [[ICommandIntercepter]]
     */
    public addInterceptor(intercepter: ICommandIntercepter): void {
        this._intercepters.push(intercepter);
        this.rebuildAllCommandChains();
    }

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
    public execute(correlationId: string, commandName: string, args: Parameters, callback: (err: any, result: any) => void): void {
        let cref = this.findCommand(commandName);

        if (!cref) {
            let err =  new BadRequestException(
                correlationId,
                "CMD_NOT_FOUND",
                "Request command does not exist"
            )
            .withDetails("command", commandName);

            callback(err, null);
        }

        if (!correlationId)
            correlationId = IdGenerator.nextShort();

        let results = cref.validate(args);
        try {
            ValidationException.throwExceptionIfNeeded(correlationId, results, false);
            cref.execute(correlationId, args, callback);
        } catch (ex) {
            callback(ex, null);
        }

    }

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
    public validate(commandName: string, args: Parameters): ValidationResult[] {
        let cref = this.findCommand(commandName);

        if (!cref) {
            let result: ValidationResult[] = [];
            result.push(new ValidationResult(
                null, 
                ValidationResultType.Error, 
                "CMD_NOT_FOUND", 
                "Requested command does not exist", 
                null, 
                null
            ));
            return result;
        }

        return cref.validate(args);
    }

    
    /**
     * Raises the event with the given name and notifies the event's listeners using the 
     * correlationId and [[Parameters parameters]] (arguments) given.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param eventName         the name of the event that is to be raised.
     * @param args              the parameters to raise this event with.
     */
    public notify(correlationId: string, eventName: string, args: Parameters): void {
        let event = this.findEvent(eventName);

        if (event) event.notify(correlationId, args);
    }
}
