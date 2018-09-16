import { IClosable } from './IClosable';
import { INotifiable } from './INotifiable';
/**
 * Helper class that provides methods for starting tasks/callbacks with a timer,
 * delaying their starts, and stopping them as well.
 */
export declare class FixedRateTimer implements IClosable {
    private _task;
    private _callback;
    private _delay;
    private _interval;
    private _timer;
    private _timeout;
    /**
     * Creates an object that is capable of starting a timer to call a task or a callback after
     * the time set in 'interval' has passed. The timer can be delayed by setting a 'delay'.
     *
     * All parameters default to null and can be set later on using [[setTask]]/[[setCallback]],
     * [[setInterval]], and [[setDelay]].
     *
     * @param taskOrCallback    the task or callback to initialize this object with.
     * @param interval          the interval of time after which the task or callback must be called.
     * @param delay             the delay to introduce before starting the timer.
     *
     * @see [[setTask]]
     * @see [[setCallback]]
     * @see [[setInterval]]
     * @see [[setDelay]]
     */
    constructor(taskOrCallback?: any, interval?: number, delay?: number);
    /** @returns the task that is to be called once the set interval times out. */
    getTask(): INotifiable;
    /** @param value the task to call once the set interval times out. */
    setTask(value: INotifiable): void;
    /** @returns the callback function that is to be called once the set interval times out. */
    getCallback(): () => void;
    /** @param value the callback function to call once the set interval times out. */
    setCallback(value: () => void): void;
    /** @returns the delay that will be introduced before starting this object's timer. */
    getDelay(): number;
    /**
     * @param value the delay to introduce before starting this object's timer.
     *
     * Note: the delay to use is calculated as "delay - interval".
     */
    setDelay(value: number): void;
    /** @returns the amount of time that must pass before the set task or callback function is called. */
    getInterval(): number;
    /** @param value the amount of time that must pass before the set task or callback function is called. */
    setInterval(value: number): void;
    /**
     * Checks whether or not this object's timer has started counting down from the
     * interval that was set. When using a delay, the timer is considered to have started
     * only after the delay has passed. If the set delay has not yet passed, false
     * will be returned.
     */
    isStarted(): boolean;
    /**
     * Starts a timer to call this object's 'callback' function as soon as the time set in
     * 'interval' has passed.
     *
     * If a 'delay' is set, then a delay of "delay - interval" will be introduced. Otherwise,
     * the timer will start without a delay.
     *
     * Both the delay and the timeout can be stopped using this class's [[stop]] method.
     *
     * If a timer is already set by this object it will be [[stop stopped]].
     * The method will exit if 'interval' is not defined.
     *
     * @see [[stop]]
     */
    start(): void;
    /**
     * Stops this objects timer by clearing any timeouts (delays)
     * or timers (intervals) that were set using [[start]].
     *
     * @see [[start]]
     */
    stop(): void;
    /**
     * Stops this objects timer using [[stop]] and closes it.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param callback          the function to call once the closing process is complete.
     *
     * @see [[stop]]
     */
    close(correlationId: string, callback?: (err: any) => void): void;
}
