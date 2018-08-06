/** 
 * @module commands 
 * @preferred
 * Contains implementation of Command design patterns, which can be used to implement various remote procedure calls (RPCs).
 * RPCs replace unique calls with universal "message transfer" calls, in which the message itself contains the called method's 
 * signature, as well as the parameters to pass for execution. 
 * 
 * When designing calls of methods/commands using the Command design pattern, uniform interfaces can be used, which, in turn, 
 * allow any amount of concrete methods to be called.
 * 
 * Command design patterns can be used for intercepting messages and for various logging implementations. 
 * 
 * These design patterns allow us to create [[ICommandable Commandable Interfaces]], which are completely universal. If an object  
 * extends [[ICommandable]] and returns a [[CommandSet]], then we can implement, with minimal code, a commandable client for this 
 * object, using various technologies.
 * 
 * - [[ICommandable Commandable Interfaces]] – part of the command design pattern, used to make classes with certain logic, which 
 * are capable of receiving and processing commands in this universal form.   
 * 
 * - [[ICommandInterceptor Command interceptors]] – modify the message execution pipeline. They intercept calls and is often used 
 * for aspect-oriented programming. Aspect-oriented programming contains perpendicular logic (aspects, for example: logging, 
 * caching, blocking), which can be removed from the business logic and added to these perpendicular calls. A command goes 
 * through a chain of interceptors, which can simply make some note of the command, notify, log, get metrics, or they can 
 * intercept it completely and return some record from the cache. A command’s return value can also be intercepted in a 
 * similar manner (the result can be written to cache, so that the next call doesn’t have to be made). 
 * 
 * (Interceptors can be added to a command set before/after the commands are added, which allows for building/skipping execution chains.)
 * 
 * - [[InterceptedCommand Intercepted commands]] are used as pattern decorators in the command design pattern. They are represented as regular \
 * commands, but run their own logic before calling the actual command. 
 */
export { ICommand } from './ICommand';
export { ICommandInterceptor } from './ICommandInterceptor';
export { IEvent } from './IEvent';
export { IEventListener } from './IEventListener';
export { Command } from './Command';
export { CommandSet } from './CommandSet';
export { Event } from './Event';
export { InterceptedCommand } from './InterceptedCommand';
export { ICommandable } from './ICommandable';