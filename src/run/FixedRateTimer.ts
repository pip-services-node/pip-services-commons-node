/** @module run */
/** @hidden */ 
let _ = require('lodash');

import { IClosable } from './IClosable';
import { INotifiable } from './INotifiable';
import { Parameters } from './Parameters';

/**
 * Helper class that provides methods for starting tasks/callbacks with a timer, 
 * delaying their starts, and stopping them as well.
 */
export class FixedRateTimer implements IClosable {
    private _task: INotifiable;
    private _callback: () => void;
	private _delay: number;
	private _interval: number;
	private _timer: any;
    private _timeout: any;
    
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
	public constructor(taskOrCallback: any = null, interval: number = null, delay: number = null) {
        if (_.isObject(taskOrCallback) && _.isFunction(taskOrCallback.notify))
            this.setTask(taskOrCallback);
        else 
		    this.setCallback(taskOrCallback);

        this.setInterval(interval);
		this.setDelay(delay);
	}

    /** @returns the task that is to be called once the set interval times out. */
    public getTask(): INotifiable {return this._task; }
    /** @param value the task to call once the set interval times out. */
	public setTask(value: INotifiable): void {
        this._task = value;
        this._callback = () => { 
            this._task.notify("pip-commons-timer", new Parameters()); 
        }
    }

    /** @returns the callback function that is to be called once the set interval times out. */
    public getCallback(): () => void { return this._callback; }
    /** @param value the callback function to call once the set interval times out. */
    public setCallback(value: () => void) {
        this._callback = value;
        this._task = null;
    }

    /** @returns the delay that will be introduced before starting this object's timer. */
    public getDelay(): number { return this._delay; }
    /** 
     * @param value the delay to introduce before starting this object's timer. 
     * 
     * Note: the delay to use is calculated as "delay - interval". 
     */
	public setDelay(value: number): void { this._delay = value; }
    
    /** @returns the amount of time that must pass before the set task or callback function is called. */
    public getInterval(): number { return this._interval; }
    /** @param value the amount of time that must pass before the set task or callback function is called. */
	public setInterval(value: number): void { this._interval = value; }
    
    /** 
     * Checks whether or not this object's timer has started counting down from the
     * interval that was set. When using a delay, the timer is considered to have started 
     * only after the delay has passed. If the set delay has not yet passed, false 
     * will be returned.
     */
	public isStarted(): boolean { return this._timer != null; }
    
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
	public start(): void {
        // Stop previously set timer
        this.stop();
        
        // Exit if interval is not defined
        if (this._interval == null || this._interval <= 0) return;

        // Introducing delay
        let delay = Math.max(0, this._delay - this._interval);

        this._timeout = setTimeout(() => {
            this._timeout = null;

            // Set a new timer
            this._timer = setInterval(() => {
                try {
                    if (this._callback) this._callback();
                } catch (ex) {
                    // Ignore or better log!
                }
            }, this._interval);
        }, delay);
	}
    
    /**
     * Stops this objects timer by clearing any timeouts (delays)
     * or timers (intervals) that were set using [[start]].
     * 
     * @see [[start]]
     */
	public stop(): void {
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }

        if (this._timer != null) {
            clearInterval(this._timer);
            this._timer = null;
        }
	}
    
    /**
     * Stops this objects timer using [[stop]] and closes it.
     * 
     * @param correlationId     optional transaction id to trace calls across components.
     * @param callback          the function to call once the closing process is complete.
     * 
     * @see [[stop]]
     */
	public close(correlationId: string, callback?: (err: any) => void): void {
		this.stop();

        if (callback != null)
            callback(null);
	}
}
