/** @module commands */
import { ICommand } from './ICommand';
import { IEventListener } from './IEventListener';
import { INotifiable } from '../run/INotifiable';

/**
 * Interface for command events, which notify listeners once an event has occurred.
 * Events can be used for asynchronous method calling. 
 *  
 * @see [[IEventListener]]
 * 
 * ### Examples ###
 * 
 * Example Event class and interface using
 * 
 *     export class MyDataController implements IMyDataController, IEventListener
 *     {
 *         constructor() { ... }
 *         
 *         private onEvent(correlationId: string, event: IEvent, args: Parameters): void
 *         {
 *             // Process event here...
 *         }
 *     }
 *     ...
 *     export class MyService implements IMyService
 *     {
 *         private _controller: IMyDataController; 
 *         private IEvent successEvent = new Event("success_on_process");
 *         
 *         constructor() { 
 *             // Getting or creating of controller
 *             successEvent.addListener(_controller);
 *         }
 *         
 *         private onSuccess(correlationId: string, args: Parameters)
 *         {
 *             successEvent.notify(correlationId, args || null);
 *         }
 *     }
 * 
 */
export interface IEvent extends INotifiable {
	/**
	 * @returns the name of the event.
     * 
	 */
    getName(): string;

    /**
     * @returns the listeners that are to receive notifications for this event.
     */
    getListeners(): IEventListener[];

    /**
     * Adds a listener to receive notifications for this event.
     * 
     * @param listener      the listener reference to add.
     */
    addListener(listener: IEventListener): void;

    /**
     * Removes a listener, so that it no longer receives notifications for this event.
     * 
     * @param listener      the listener reference to remove.
     */
    removeListener(listener: IEventListener): void;
}
