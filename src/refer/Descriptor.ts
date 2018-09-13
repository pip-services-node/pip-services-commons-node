/** @module refer */
import { ConfigException } from '../errors/ConfigException';

/**
 * Component descriptor that is used to find a component by its descriptive elements. Contains 5 sections:
 * 
 * - **logical group:** the package or other logical group of a component, for example: 'pip-services-storage-blocks'
 * - **component type:** identifies a component's interface, for example: 'persistence', 'controller', 'services', or 'cache'
 * - **component kind:** identifies a component's implementation, for example: 'memory', 'file', or 'mongodb'
 * - **component name:** identifies a component's internal content
 * - **implementation version:** for example: '1.0', '1.5', or '10.4'
 * 
 * <code>*</code> can be used for any of the above sections to indicate 'any'.
 * 
 * ### Example ###
 * 
 * A Descriptor object can be created and used in the following way:
 * 
 *     public MyMethod(){
 *         let descriptor = new Descriptor("Group name", "Type of process", "Kind of process", "Name of process", "Version");
 *         ...
 *         
 *         registerAsType(descriptor, MyDataProcessClass); // pip-services-components-node.Build.Factory
 *     }
 */
export class Descriptor {
	private _group: string;
	private _type: string;
	private _kind: string;
	private _name: string;
	private _version: string;
	
	/**
	 * Creates a component descriptor object.
	 * 
	 * @param group 	the logical group (examples: 'pip-services-runtime', 'pip-services-logging', '*').
	 * @param type 		the logical type (examples: 'persistence', 'controller', 'cache', '*').
	 * @param kind 		the implementation (examples: 'memory', 'mongodb', '*').
	 * @param name		the internal content
	 * @param version 	implementation version (examples: '1.0', '1.5', '10.4', '*').
	 */
	public constructor(group: string, type: string, kind: string, name: string, version: string) {
		if ("*" == group) group = null;
		if ("*" == type) type = null;
		if ("*" == kind) kind = null;
		if ("*" == name) name = null;
		if ("*" == version) version = null;
		
		this._group = group;
		this._type = type;
		this._kind = kind;
		this._name = name;
		this._version = version;
	}

	/**
	 * Gets this component descriptor's logical group section.
	 * 
	 * @returns the component's logical group.
	 */
	public getGroup(): string { 
		return this._group; 
	}
	
	/**
	 * Gets this component descriptor's logical type section.
	 * 
	 * @returns the component's logical type.
	 */
	public getType(): string { 
		return this._type; 
	}
	
	/**
	 * Gets this component descriptor's implementation section.
	 * 
	 * @returns the component's implementation.
	 */
	public getKind(): string { 
		return this._kind; 
	}

	/**
	 * Gets this component descriptor's name section.
	 * 
	 * @returns the component's name.
	 */
	public getName(): string { 
		return this._name; 
	}
	
	/**
	 * Gets this component descriptor's implementation version section.
	 * 
	 * @returns the component's implementation version.
	 */
	public getVersion(): string { 
		return this._version; 
	}

	private matchField(field1: string, field2: string): boolean {
		return field1 == null 
			|| field2 == null
			|| field1 == field2;
	}

	/**
	 * Matches this descriptor to another descriptor.
	 * All <code>*</code> or <code>null</code> descriptor elements match to any other value.
	 * Specific values must match exactly.
	 * 
	 * @param descriptor 	the descriptor to match this one against.
	 * @returns <code>true</code>, if the descriptors match, and <code>false</code> - otherwise. 
	 * 
	 * @see [[exactMatch]]
	 */
	public match(descriptor: Descriptor): boolean {
		return this.matchField(this._group, descriptor.getGroup())
			&& this.matchField(this._type, descriptor.getType())
			&& this.matchField(this._kind, descriptor.getKind())
			&& this.matchField(this._name, descriptor.getName())
			&& this.matchField(this._version, descriptor.getVersion());
	}
	
	private exactMatchField(field1: string, field2: string): boolean {
		if (field1 == null && field2 == null)
			return true;
		if (field1 == null || field2 == null)
			return false;
		return field1 == field2;
	}
	
	/**
	 * Matches this descriptor to another descriptor.
	 * All <code>*</code> or <code>null</code> descriptor elements match ONLY to <code>*</code> 
	 * or <code>null</code> values (as oppossed to [[match]]).
	 * 
	 * Specific values must match exactly.
	 * 
	 * @param descriptor 	the descriptor to match this one against.
	 * @returns <code>true</code>, if the descriptors match, and <code>false</code> - otherwise. 
	 * 
	 * @see [[match]]
	 */
	public exactMatch(descriptor: Descriptor): boolean {
		return this.exactMatchField(this._group, descriptor.getGroup())
			&& this.exactMatchField(this._type, descriptor.getType())
			&& this.exactMatchField(this._kind, descriptor.getKind())
			&& this.exactMatchField(this._name, descriptor.getName())
			&& this.exactMatchField(this._version, descriptor.getVersion());
	}
	
	/**
	 * Checks whether or not a descriptor contains <code>*</code> or <code>null</code>
	 * elements in any of its sections.
	 * 
	 * @returns <code>true</code>, if no <code>*</code>s or <code>null</code>s are found. Otherwise, 
	 * 			<code>false</code> is returned.
	 */
	public isComplete(): boolean {
		return this._group != null && this._type != null && this._kind != null
			&& this._name != null && this._version != null;
	}
	
	/**
	 * Matches this descriptor to the value that was passed.
	 * 
	 * @param value 	the value to match against this descriptor.
	 * @returns <code>true</code> if value is an instance of Descriptor and matches this descriptor.
	 * 			Otherwise, <code>false</code> is returned.
	 * 
	 * @see [[match]]
	 */
	public equals(value: any): boolean {
		if (value instanceof Descriptor)
			return this.match(<Descriptor>value);
		return false;
	}
	
	/**
	 * Converts this descriptor to a string by substituting any <code>null</code>s with <code>*</code>s, 
	 * and by separating its 5 sections with colons.
	 * 
	 * @returns this descriptor as a string. Example result: "pip-services-logging:persistence:memory:*:1.0".
	 */
	public toString(): string {
		return (this._group || "*")
			+ ":" + (this._type || "*")
			+ ":" + (this._kind || "*")
			+ ":" + (this._name || "*")
			+ ":" + (this._version || "*");
	}
	
	/**
	 * Static method that can convert a colon-separated descriptor string into a Descriptor object.
	 * 
	 * @param value 	a colon-separated descriptor string. Example string: 
	 * 					"pip-services-logging:persistence:memory:*:1.0".
	 * @returns the Descriptor that was parsed from the string.
	 * @throws a [[ConfigException]] if the descriptor string is of a wrong format.
	 */
	public static fromString(value: String): Descriptor {
		if (value == null || value.length == 0) 
			return null;
				
		let tokens = value.split(":");
		if (tokens.length != 5) {
			throw new ConfigException(
				null, "BAD_DESCRIPTOR", "Descriptor " + value + " is in wrong format"
			).withDetails("descriptor", value);
		}
			
		return new Descriptor(tokens[0].trim(), tokens[1].trim(), tokens[2].trim(), tokens[3].trim(), tokens[4].trim());		
	}
}
