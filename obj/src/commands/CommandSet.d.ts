/** @module commands */
import { ICommand } from './ICommand';
import { IEvent } from './IEvent';
import { IEventListener } from './IEventListener';
import { ICommandIntercepter } from './ICommandIntercepter';
import { ValidationResult } from '../validate/ValidationResult';
import { Parameters } from '../run/Parameters';
export declare class CommandSet {
    private readonly _commands;
    private readonly _events;
    private readonly _intercepters;
    private _commandsByName;
    private _eventsByName;
    constructor();
    getCommands(): ICommand[];
    getEvents(): IEvent[];
    findCommand(commandName: string): ICommand;
    findEvent(eventName: string): IEvent;
    private buildCommandChain;
    private rebuildAllCommandChains;
    addCommand(command: ICommand): void;
    addCommands(commands: ICommand[]): void;
    addEvent(event: IEvent): void;
    addEvents(events: IEvent[]): void;
    addCommandSet(commandSet: CommandSet): void;
    addListener(listener: IEventListener): void;
    removeListener(listener: IEventListener): void;
    addInterceptor(intercepter: ICommandIntercepter): void;
    execute(correlationId: string, commandName: string, args: Parameters, callback: (err: any, result: any) => void): void;
    validate(commandName: string, args: Parameters): ValidationResult[];
    notify(correlationId: string, eventName: string, args: Parameters): void;
}
