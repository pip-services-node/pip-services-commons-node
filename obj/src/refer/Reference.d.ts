/**
 * A placeholder that stores component references.
 */
export declare class Reference {
    private _locator;
    private _component;
    /**
     * Create a new Reference object and initializes it using the locator and reference given.
     *
     * @param locator 		the component locator for the reference. It can be a standard Descriptor
     * 						or anything else.
     * @param reference 	the component reference.
     */
    constructor(locator: any, component: any);
    /**
     * Checks if a locator matches this Reference object. A match is considered to be made if the locator
     * matches this Reference's component or its locator.
     *
     *
     * @param locator 	the locator to match against this Reference.
     * @return <code>true</code>, if this reference matches the locator, and <code>false</code> - otherwise.
     *
     * @see [[Descriptor]]
     */
    match(locator: any): boolean;
    /**
     * Gets the component stored in this Reference object.
     *
     * @return the component stored.
     */
    getComponent(): any;
    /**
     * Gets the locator of the component that is stored in this Reference object.
     *
     * @return the component's locator.
     */
    getLocator(): any;
}
