/** @module commands */
import { ICommand } from './ICommand';
import { IEvent } from './IEvent';
import { IEventListener } from './IEventListener';
import { ICommandInterceptor } from './ICommandInterceptor';
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
 * Handles command registration and execution.
 * Enables intercepters to control or modify command behavior 
 * 
 * If command interceptors are added before the commands themselves, 
 * then execution chains will be built for each command that is added. 
 * Otherwise - no execution chains will be generated.
 * 
 * @see [[Command]]
 * @see [[ICommandable]]
 * 
 * ### Examples ###
 * 
 * export class MyDataCommandSet extends CommandSet @see [[CommandSet]] {
 * private _controller: IMyDataController;

    constructor(controller: IMyDataController) { // TO DO description of the controller interface
        super();

        this._controller = controller;

        this.addCommand(this.makeCreateMyDataCommand());
    }

    private makeCreateMyDataCommand(): ICommand {
        return new Command( @see [[Command]]
            'create_mydata',
            new ObjectSchema(true),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                ...
            }
        );
    }
}
 * 
 */
export class CommandSet {
    private readonly _commands: ICommand[] = [];
    private readonly _events: IEvent[] = [];
    private readonly _interceptors: ICommandInterceptor[] = [];

    private _commandsByName: { [name: string]: ICommand } = {};
    private _eventsByName: { [name: string]: IEvent } = {};

    /**
     * Creates a new CommandSet object.
     */
    public constructor() { }

    /**
     * @returns the commands included in this command set.
     * 
     * @see [[ICommand]]
     */
    public getCommands(): ICommand[] {
        return this._commands;
    }

    /**
     * @returns the events included in this command set.
     * 
     * @see [[IEvent]]
     */
    public getEvents(): IEvent[] {
        return this._events;
    }

    /**
     * Searches for a command by its name in this command set.
     * 
     * @param commandName the name of the command to search for.
     * 
     * @returns a command whose name is the same as the method parameter
     * 
     * @see [[ICommand]]
     */
    public findCommand(commandName: string): ICommand {
        return this._commandsByName[commandName];
    }

    /**
     * Searches for an event by its name in this command set.
     * 
     * @param eventName the name of the event to search for.
     * 
     * @returns a event whose name is the same as the method parameter
     * 
     * @see [[IEvent]]
     */
    public findEvent(eventName: string): IEvent {
        return this._eventsByName[eventName];
    }

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
    private buildCommandChain(command: ICommand): void {
        let next: ICommand = command;

        for (var i = this._interceptors.length - 1; i >= 0; i--)
            next = new InterceptedCommand(this._interceptors[i], next);

        this._commandsByName[next.getName()] = next;
    }

    /**
     * Rebuilds the private '_commandsByName' list using the commands stored in this command set. 
     * If interceptors are present in this command set, then a command (execution) chain will be 
     * built for each command.
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
     * Adds a [[ICommand command]] to this command set.
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
     * Adds multiple [[ICommand commands]] to this command set.
     * 
     * @param commands the array of commands to add.
     * 
     * @see [[ICommand]]
     */
    public addCommands(commands: ICommand[]): void {
        for (var i = 0; i < commands.length; i++) 
            this.addCommand(commands[i]);
    }

    /**
     * Adds an [[IEvent event]] to this command set.
     * 
     * @param event the event to add.
     * 
     * @see [[IEvent]]
     */
    public addEvent(event: IEvent): void {
        this._events.push(event);
        this._eventsByName[event.getName()] = event;
    }

    /**
     * Adds multiple [[IEvent events]] to this command set.
     * 
     * @param events the array of events to add.
     * 
     * @see [[IEvent]]
     */
    public addEvents(events: IEvent[]): void {
        for (var i = 0; i < events.length; i++)
            this.addEvent(events[i]);
    }

    /**
     * Adds all of the commands and events included in the passed CommandSet object
     * to this command set.
     * 
     * @param commandSet the CommandSet to add.
     */
    public addCommandSet(commandSet: CommandSet): void {
        this.addCommands(commandSet.getCommands());
        this.addEvents(commandSet.getEvents());
    }

    /**
     * Adds a [[IEventListener listener]] to all of the events in this command set.
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
     * Removes a [[IEventListener listener]] from all of the events in this command set.
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
     * Adds a [[ICommandInterceptor command interceptor]] to this command set.
     * 
     * @param interceptor     the interceptor to add.
     * 
     * @see [[ICommandInterceptor]]
     */
    public addInterceptor(interceptor: ICommandInterceptor): void {
        this._interceptors.push(interceptor);
        this.rebuildAllCommandChains();
    }

    /**
     * Validates the [[Parameters args]] by the schema of [[ICommand command]] with the given name 
     * and executes this [[ICommand command]], using the given [[Parameters args]].
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
     * Validates the [[Parameters args]] that are to be passed to the 
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
     * correlation id and [[Parameters args]] given.
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
