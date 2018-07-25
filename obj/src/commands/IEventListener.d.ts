/** @module commands */
import { IEvent } from './IEvent';
import { Parameters } from '../run/Parameters';
/**
 * Listener for command events.
 *
 * @see [[IEvent]]
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
