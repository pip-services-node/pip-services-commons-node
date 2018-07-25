import { IEventListener } from './IEventListener';
import { INotifiable } from '../run/INotifiable';
/**
 * Interface for command events.
 */
export interface IEvent extends INotifiable {
    /**
     * @returns the name of the event.
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
     * Removes a listener, so that it no longer receive notifications for this event.
     *
     * @param listener      the listener reference to remove.
     */
    removeListener(listener: IEventListener): void;
}
