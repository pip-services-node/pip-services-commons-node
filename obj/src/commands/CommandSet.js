"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InterceptedCommand_1 = require("./InterceptedCommand");
const BadRequestException_1 = require("../errors/BadRequestException");
const ValidationException_1 = require("../validate/ValidationException");
const ValidationResult_1 = require("../validate/ValidationResult");
const ValidationResultType_1 = require("../validate/ValidationResultType");
const IdGenerator_1 = require("../data/IdGenerator");
class CommandSet {
    constructor() {
        this._commands = [];
        this._events = [];
        this._intercepters = [];
        this._commandsByName = {};
        this._eventsByName = {};
    }
    getCommands() {
        return this._commands;
    }
    getEvents() {
        return this._events;
    }
    findCommand(commandName) {
        return this._commandsByName[commandName];
    }
    findEvent(eventName) {
        return this._eventsByName[eventName];
    }
    buildCommandChain(command) {
        let next = command;
        for (var i = this._intercepters.length - 1; i >= 0; i--)
            next = new InterceptedCommand_1.InterceptedCommand(this._intercepters[i], next);
        this._commandsByName[next.getName()] = next;
    }
    rebuildAllCommandChains() {
        this._commandsByName = {};
        for (var i = 0; i < this._commands.length; i++) {
            let command = this._commands[i];
            this.buildCommandChain(command);
        }
    }
    addCommand(command) {
        this._commands.push(command);
        this.buildCommandChain(command);
    }
    addCommands(commands) {
        for (var i = 0; i < commands.length; i++)
            this.addCommand(commands[i]);
    }
    addEvent(event) {
        this._events.push(event);
        this._eventsByName[event.getName()] = event;
    }
    addEvents(events) {
        for (var i = 0; i < events.length; i++)
            this.addEvent(events[i]);
    }
    addCommandSet(commandSet) {
        this.addCommands(commandSet.getCommands());
        this.addEvents(commandSet.getEvents());
    }
    addListener(listener) {
        for (var i = 0; i < this._events.length; i++)
            this._events[i].addListener(listener);
    }
    removeListener(listener) {
        for (var i = 0; i < this._events.length; i++)
            this._events[i].removeListener(listener);
    }
    addInterceptor(intercepter) {
        this._intercepters.push(intercepter);
        this.rebuildAllCommandChains();
    }
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
    validate(commandName, args) {
        let cref = this.findCommand(commandName);
        if (!cref) {
            let result = [];
            result.push(new ValidationResult_1.ValidationResult(null, ValidationResultType_1.ValidationResultType.Error, "CMD_NOT_FOUND", "Requested command does not exist", null, null));
            return result;
        }
        return cref.validate(args);
    }
    notify(correlationId, eventName, args) {
        let event = this.findEvent(eventName);
        if (event)
            event.notify(correlationId, args);
    }
}
exports.CommandSet = CommandSet;
//# sourceMappingURL=CommandSet.js.map