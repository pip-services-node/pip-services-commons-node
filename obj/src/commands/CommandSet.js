"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InterceptedCommand_1 = require("./InterceptedCommand");
const BadRequestException_1 = require("../errors/BadRequestException");
const ValidationException_1 = require("../validate/ValidationException");
const ValidationResult_1 = require("../validate/ValidationResult");
const ValidationResultType_1 = require("../validate/ValidationResultType");
const IdGenerator_1 = require("../data/IdGenerator");
/**
 * Defines a set of commands and events, which a given [[ICommandable commandable interface]]
 * is capable of processing.
 *
 * @see [[Command]]
 * @see [[ICommandable]]
 */
class CommandSet {
    /**
     * Creates a new CommandSet object.
     */
    constructor() {
        this._commands = [];
        this._events = [];
        this._intercepters = [];
        this._commandsByName = {};
        this._eventsByName = {};
    }
    /**
     * @returns the commands included in this CommandSet.
     *
     * @see [[ICommand]]
     */
    getCommands() {
        return this._commands;
    }
    /**
     * @returns the events included in this CommandSet.
     *
     * @see [[IEvent]]
     */
    getEvents() {
        return this._events;
    }
    /**
     * Searches for a command by its name in this CommandSet.
     *
     * @param commandName   the name of the command to search for.
     *
     * @see [[ICommand]]
     */
    findCommand(commandName) {
        return this._commandsByName[commandName];
    }
    /**
     * Searches for an event by its name in this CommandSet.
     *
     * @param eventName     the name of the event to search for.
     *
     * @see [[IEvent]]
     */
    findEvent(eventName) {
        return this._eventsByName[eventName];
    }
    /**
     * Adds the command passed to the private command chain '_commandsByName', after
     * linking it with all of the command interceptors of this CommandSet.
     *
     * @param command
     */
    buildCommandChain(command) {
        let next = command;
        for (var i = this._intercepters.length - 1; i >= 0; i--)
            next = new InterceptedCommand_1.InterceptedCommand(this._intercepters[i], next);
        this._commandsByName[next.getName()] = next;
    }
    /**
     * Rebuilds the private command chain '_commandsByName' using
     * the commands stored in this CommandSet.
     *
     * @see [[buildCommandChain]]
     */
    rebuildAllCommandChains() {
        this._commandsByName = {};
        for (var i = 0; i < this._commands.length; i++) {
            let command = this._commands[i];
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
    addCommand(command) {
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
    addCommands(commands) {
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
    addEvent(event) {
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
    addEvents(events) {
        for (var i = 0; i < events.length; i++)
            this.addEvent(events[i]);
    }
    /**
     * Adds all of the commands and events included in the passed CommandSet
     * to this CommandSet.
     *
     * @param commandSet    the CommandSet to add.
     */
    addCommandSet(commandSet) {
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
    addListener(listener) {
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
    removeListener(listener) {
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
    addInterceptor(intercepter) {
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
    execute(correlationId, commandName, args, callback) {
        let cref = this.findCommand(commandName);
        if (!cref) {
            let err = new BadRequestException_1.BadRequestException(correlationId, "CMD_NOT_FOUND", "Request command does not exist")
                .withDetails("command", commandName);
            callback(err, null);
        }
        if (!correlationId)
            correlationId = IdGenerator_1.IdGenerator.nextShort();
        let results = cref.validate(args);
        try {
            ValidationException_1.ValidationException.throwExceptionIfNeeded(correlationId, results, false);
            cref.execute(correlationId, args, callback);
        }
        catch (ex) {
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
    validate(commandName, args) {
        let cref = this.findCommand(commandName);
        if (!cref) {
            let result = [];
            result.push(new ValidationResult_1.ValidationResult(null, ValidationResultType_1.ValidationResultType.Error, "CMD_NOT_FOUND", "Requested command does not exist", null, null));
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
    notify(correlationId, eventName, args) {
        let event = this.findEvent(eventName);
        if (event)
            event.notify(correlationId, args);
    }
}
exports.CommandSet = CommandSet;
//# sourceMappingURL=CommandSet.js.map