/**
 * Allows for picking items at random from an array of type T.
 */
export declare class RandomItemPicker {
    /**
     * Picks an item at random from the array 'values'.
     *
     * @param values    array of items to pick from.
     * @returns         picked item.
     */
    static pick<T>(values: T[]): T;
}
