/** @module commands */
import { IEvent } from './IEvent';
import { Parameters } from '../run/Parameters';

/**
 * Listener for command events.
 * 
 * @see [[IEvent]]
 * @see [[Event]]
 * 
 *  * ### Examples ###
 * 
 * Example Event class and interface using
 * 
 * export class MyDataController implements IMyDataController, IEventListener
   {
       constructor() { ... }

       private onEvent(correlationId: string, event: IEvent, args: Parameters): void
       {
            // Process event here...
       }
   }
   ...
 * export class MyService implements IMyService
   {
       private _controller: IMyDataController; 
       private IEvent successEvent = new Event("success_on_process");

       constructor() { 
           // Getting or creating of controller
           successEvent.addListener(_controller);
       }

       private onSuccess(correlationId: string, args: Parameters)
       {
           successEvent.notify(correlationId, args || null);
       }
 * }
 */
export interface IEventListener {
	/**
	 * Abstract method that will contain the logic for notifing the occurence of an event.
	 * 
	 * @param event 			event reference.
	 * @param correlationId 	unique business transaction id to trace calls across components.
	 * @param value 			event arguments.
	 */
    onEvent(correlationId: string, event: IEvent, args: Parameters): void;
}
