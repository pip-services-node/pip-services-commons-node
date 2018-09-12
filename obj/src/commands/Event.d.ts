/** @module commands */
import { IEvent } from './IEvent';
import { IEventListener } from './IEventListener';
import { Parameters } from '../run/Parameters';
/**
 * Used to receive notifications about command execution results and failures.
 * Events consist of a name and a set of listeners. Listeners are notified whenever
 * the event is raised and can be added or removed as needed. Events can be used for
 * asynchronous method calling.
 *
 * @see [[IEvent]]
 * @see [[IEventListener]]
 *
 * ### Examples ###
 *
 * let event = new Event("my_event");
 *
 * event.addListener(myListener);
 *
 * event.notify("123", Parameters.fromTuples(
 *   "param1", "ABC",
 *   "param2", 123
 * ));
 *
 */
export declare class Event implements IEvent {
    private _name;
    private _listeners;
    /**
     * Initializes a new event object using the given event name.
     *
     * @param name  the name of the event that is to be created.
     * @throws an Error if the name is null.
     */
    constructor(name: string);
    /**
     * @returns the name of this event.
     */
    getName(): string;
    /**
     * @returns the listeners that are to receive notifications for this event.
     */
    getListeners(): IEventListener[];
    /**
     * Adds a listener to receive notifications for this event.
     *
     * @param listener the listener reference to add.
     */
    addListener(listener: IEventListener): void;
    /**
     * Removes a listener, so that it no longer receives notifications for this event.
     *
     * @param listener      the listener reference to remove.
     */
    removeListener(listener: IEventListener): void;
    /**
     * Raises this event and notifies the listeners referenced using the correlationId
     * and [[Parameters parameters]] (arguments) given.
     *
     * @param correlationId     optional transaction id to trace calls across components.
     * @param args              the parameters to raise this event with.
     * @throws an [[InvocationException]] if the event fails to be raised.
     */
    notify(correlationId: string, args: Parameters): void;
}
