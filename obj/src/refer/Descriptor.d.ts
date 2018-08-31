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
 * ### Examples ###
 *
 * public MyMethod(){
 * 		let descriptor = new Descriptor("Group name", "Type of process", "Kind of process", "Name of process", "Version");
 * 		...
 *
 * 		registerAsType(descriptor, MyDataProcessClass); // pip-services-components-node.Build.Factory
 * }
 */
export declare class Descriptor {
    private _group;
    private _type;
    private _kind;
    private _name;
    private _version;
    /**
     * Creates a component descriptor object.
     *
     * @param group 	the logical group (examples: 'pip-services-runtime', 'pip-services-logging', '*').
     * @param type 		the logical type (examples: 'persistence', 'controller', 'cache', '*').
     * @param kind 		the implementation (examples: 'memory', 'mongodb', '*').
     * @param name		the internal content
     * @param version 	implementation version (examples: '1.0', '1.5', '10.4', '*').
     */
    constructor(group: string, type: string, kind: string, name: string, version: string);
    /**
     * Gets this component descriptor's logical group section.
     *
     * @returns the component's logical group.
     */
    getGroup(): string;
    /**
     * Gets this component descriptor's logical type section.
     *
     * @returns the component's logical type.
     */
    getType(): string;
    /**
     * Gets this component descriptor's implementation section.
     *
     * @returns the component's implementation.
     */
    getKind(): string;
    /**
     * Gets this component descriptor's name section.
     *
     * @returns the component's name.
     */
    getName(): string;
    /**
     * Gets this component descriptor's implementation version section.
     *
     * @returns the component's implementation version.
     */
    getVersion(): string;
    private matchField;
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
    match(descriptor: Descriptor): boolean;
    private exactMatchField;
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
    exactMatch(descriptor: Descriptor): boolean;
    /**
     * Checks whether or not a descriptor contains <code>*</code> or <code>null</code>
     * elements in any of its sections.
     *
     * @returns <code>true</code>, if no <code>*</code>s or <code>null</code>s are found. Otherwise,
     * 			<code>false</code> is returned.
     */
    isComplete(): boolean;
    /**
     * Matches this descriptor to the value that was passed.
     *
     * @param value 	the value to match against this descriptor.
     * @returns <code>true</code> if value is an instance of Descriptor and matches this descriptor.
     * 			Otherwise, <code>false</code> is returned.
     *
     * @see [[match]]
     */
    equals(value: any): boolean;
    /**
     * Converts this descriptor to a string by substituting any <code>null</code>s with <code>*</code>s,
     * and by separating its 5 sections with colons.
     *
     * @returns this descriptor as a string. Example result: "pip-services-logging:persistence:memory:*:1.0".
     */
    toString(): string;
    /**
     * Static method that can convert a colon-separated descriptor string into a Descriptor object.
     *
     * @param value 	a colon-separated descriptor string. Example string:
     * 					"pip-services-logging:persistence:memory:*:1.0".
     * @returns the Descriptor that was parsed from the string.
     * @throws a [[ConfigException]] if the descriptor string is of a wrong format.
     */
    static fromString(value: String): Descriptor;
}
