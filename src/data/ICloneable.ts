/** @module data */
/**
 * Interface for data objects that are cloneable.
 * 
 * ### Examples ###
 * Ways to use the ICloneable interface and methods:
 * 
 * 
	export class MyClass implements IMyClass, ICloneable {
		constructor() { };

		public clone(): any {
			var cloneObj = new (<any>this.constructor());
			
			// Copy every attribute from this to cloneObj here...
			
    		return cloneObj;
		}
	}
 */
export interface ICloneable {
	/** Abstract method that will contain logic for cloning objects of this type. */
	clone(): any;
}
