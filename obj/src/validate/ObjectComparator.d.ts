/**
 * Helper class for comparing various objects.
 */
export declare class ObjectComparator {
    /**
     * Static method that compares a set of values using the given operation.
     *
     * @param value1        the first value in the pair.
     * @param operation     the operation to apply to the pair of values. Supported operations:
     *                      "==" ("=", "EQ"), "!= " ("<>", "NE"); "<"/">" ("LT"/"GT"), "<="/">="
     *                      ("LE"/"GE"); "LIKE".
     * @param value2        the second value in the pair.
     *
     * @see [[areEqual]]/[[areNotEqual]] (operation - "=="/"!=")
     * @see [[isLess]]/[[isGreater]] (operation - "<"/">")
     * @see [[match]] (operation - "LIKE")
     */
    static compare(value1: any, operation: string, value2: any): boolean;
    /**
     * Static method that checks whether or not a pair of values are equal. If both values are
     * null - they are considered to be equal.
     */
    static areEqual(value1: any, value2: any): boolean;
    /**
     * Static method that checks whether or not a pair of values are not equal by inverting the
     * result of [[areEqual]].
     *
     * @see [[areEqual]]
     */
    static areNotEqual(value1: any, value2: any): boolean;
    /**
     * Static method that checks whether or not the first parameter is less than the second one
     * (value1 < value2). If either value is null - <code>false</code> will be returned.
     */
    static less(value1: any, value2: any): boolean;
    /**
     * Static method that checks whether or not the first parameter is greater than the second one
     * (value1 > value2). If either value is null - <code>false</code> will be returned.
     */
    static greater(value1: any, value2: any): boolean;
    /**
     * Static method that checks whether or not a pair of values match. The values are converted to
     * strings using [[StringConverter.toString StringConverter's toString]] method to see if they
     * match. If both values are null - they are considered to match.
     */
    static match(value1: any, value2: any): boolean;
}
