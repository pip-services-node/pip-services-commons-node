/** @module commands */
import { IEvent } from './IEvent';
import { IEventListener } from './IEventListener';
import { InvocationException } from '../errors/InvocationException';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';

/**
 * Events consist of a name and a set of listeners. Listeners are notified whenever 
 * the event is raised and can be added or removed as needed.
 * 
 * @see [[IEvent]]
 */
export class Event implements IEvent {
    private _name: string;
    private _listeners: IEventListener[];

    /**
     * Initializes a new event object using the given event name.
     * 
     * @param name  the name of the event that is to be created.
     * @throws an Error if the name is null.
     */
    public constructor(name: string) {
        if (!name)
            throw new Error("Name cannot be null");

        this._name = name;
    }

    /**
     * @returns the name of this event.
     */
    public getName(): string {
        return this._name;
    }

    /**
     * @returns the listeners that are to receive notifications for this event.
     */
    public getListeners(): IEventListener[] {
        return this._listeners;
    }

    /**
     * Adds a listener to receive notifications for this event.
     * 
     * @param listener      the listener reference to add.
     */
    public addListener(listener: IEventListener): void {
        this._listeners.push(listener);
    }

    /**
     * Removes a listener, so that it no longer receives notifications for this event.
     * 
     * @param listener      the listener reference to remove.
     */
    public removeListener(listener: IEventListener): void {
        var index = this._listeners.indexOf(listener);

        if (index > -1)
            this._listeners.splice(index, 1);
    }

    /**
     * Raises this event and notifies the listeners referenced using the correlationId 
     * and [[Parameters parameters]] (arguments) given.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param args              the parameters to raise this event with.
     * @throws an [[InvocationException]], if the event fails to be raised.  
     */
    public notify(correlationId: string, args: Parameters): void {
        for (var i = 0; i < this._listeners.length; i++) {
            try {
                let listener: IEventListener = this._listeners[i];
                listener.onEvent(correlationId, this, args);
            } catch (ex) {
                throw new InvocationException(
                    correlationId,
                    "EXEC_FAILED",
                    "Raising event " + this.getName() + " failed: " + ex)
                    .withDetails("event", this.getName())
                    .wrap(ex);
            }
        }
    }
}
