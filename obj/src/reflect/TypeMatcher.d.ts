import { TypeCode } from '../convert/TypeCode';
/**
 * Helper class that contains methods for matching [[TypeCode data types]].
 *
 * @see [[TypeCode]]
 */
export declare class TypeMatcher {
    /**
     * Static method that checks whether or not the value passed as 'actualValue' is of
     * the same [[TypeCode data type]] as 'expectedType'. The data type of 'actualValue'
     * is determined using [[TypeConverter.toTypeCode]]. Type matching is done using this
     * class's [[matchType]] method.
     *
     * @param expectedType      the [[TypeCode data type]] that is expected. If set to
     *                          <code>null</code> - <code>true</code> will always be returned.
     * @param actualValue       the value, whose type is to be checked. Cannot be null.
     * @returns whether or not the actual value is of the expected type.
     *
     * @throws an Error if 'actualValue' is null.
     *
     * @see [[TypeCode]]
     * @see [[TypeConverter.toTypeCode]]
     * @see [[matchType]]
     * @see [[matchValuesTypeByName]] (for matching by types' string names)
     */
    static matchValuesType(expectedType: any, actualValue: any): boolean;
    /**
     * Static method that checks whether or not the two given [[TypeCode data types]] match.
     * If the expected type is in the format of a string - this class's [[matchTypeByName]]
     * method will be called and its result will be returned.
     *
     * @param expectedType  the data type that is expected. If set to
     *                      <code>null</code> - <code>true</code>
     *                      will always be returned.
     * @param actualType    the actual data type. Cannot be null.
     * @returns whether or not the actual and expected data types match.
     *
     * @throws an Error if 'actualType' is null.
     *
     * @see [[TypeCode]]
     * @see [[matchTypeByName]]
     * @see [[matchTypeByName]] (for matching by types' string names)
     */
    static matchType(expectedType: any, actualType: TypeCode): boolean;
    /**
     * Static method that checks whether or not the value passed as 'actualValue' is of
     * the data type, whose name is represented as a string in 'expectedType'. The data type of
     * 'actualValue' is determined using [[TypeConverter.toTypeCode]]. Type matching is done
     * using this class's [[matchTypeByName]] method.
     *
     * @param expectedType      the data type (as a string) that is expected. If set to
     *                          <code>null</code> - <code>true</code> will always be returned.
     * @param actualValue       the value, whose type is to be checked. Cannot be null.
     * @returns whether or not the actual value is of the expected type.
     *
     * @throws an Error if 'actualValue' is null.
     *
     * @see [[TypeConverter.toTypeCode]]
     * @see [[matchTypeByName]]
     * @see [[matchValuesType]] (for matching by [[TypeCode]])
     */
    static matchValuesTypeByName(expectedType: string, actualValue: any): boolean;
    /**
     * Static method that checks whether or not the two given data type names ([[TypeCode]] strings)
     * match.
     *
     * @param expectedType  the data type (as a string) that is expected. If set to
     *                      <code>null</code> or "object" - <code>true</code> will
     *                      always be returned.
     * @param actualType    the actual data type (as a string). Cannot be null.
     * @returns whether or not the actual and expected data types names match.
     *
     * @throws an Error if 'actualType' is null.
     *
     * @see [[TypeConverter.toString]] (for a list of TypeCode strings)
     * @see [[matchType]] (for matching by [[TypeCode]])
     */
    static matchTypeByName(expectedType: string, actualType: TypeCode): boolean;
}
