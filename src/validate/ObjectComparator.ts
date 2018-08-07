/** @module validate */
/** @hidden */ 
let _ = require('lodash');

import { DoubleConverter } from '../convert/DoubleConverter';
import { StringConverter } from '../convert/StringConverter';

/**
 * Helper class for comparing various objects.
 */
export class ObjectComparator {
    
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
    public static compare(value1: any, operation: string, value2: any): boolean {
        operation = operation.toUpperCase();

        if (operation == "=" || operation == "==" || operation == "EQ")
            return ObjectComparator.areEqual(value1, value2);
        if (operation == "!=" || operation == "<>" || operation == "NE")
            return ObjectComparator.areNotEqual(value1, value2);
        if (operation == "<" || operation == "LT")
            return ObjectComparator.isLess(value1, value2);
        if (operation == "<=" || operation == "LE")
            return ObjectComparator.areEqual(value1, value2) || ObjectComparator.isLess(value1, value2);
        if (operation == ">" || operation == "GT")
            return ObjectComparator.isGreater(value1, value2);
        if (operation == ">=" || operation == "GE")
            return ObjectComparator.areEqual(value1, value2) || ObjectComparator.isGreater(value1, value2);
        if (operation == "LIKE")
            return ObjectComparator.match(value1, value2);

        return true;
    }

    /**
     * Static method that checks whether or not a pair of values are equal. If both values are 
     * null - they are considered to be equal.
     */
    public static areEqual(value1: any, value2: any): boolean {
        if (value1 == null && value2 == null)
            return true;
        if (value1 == null || value2 == null)
            return false;
        return _.isEqual(value1, value2);
    }

    /**
     * Static method that checks whether or not a pair of values are not equal by inverting the 
     * result of [[areEqual]].
     * 
     * @see [[areEqual]]
     */
    public static areNotEqual(value1: any, value2: any): boolean {
        return !ObjectComparator.areEqual(value1, value2);
    }

    /**
     * Static method that checks whether or not the first parameter is less than the second one 
     * (value1 < value2). If either value is null - <code>false</code> will be returned.
     */
    public static isLess(value1: any, value2: any): boolean {
        var number1 = DoubleConverter.toNullableDouble(value1);
        var number2 = DoubleConverter.toNullableDouble(value2);

        if (number1 == null || number2 == null)
            return false;

        return number1 < number2;
    }

    /**
     * Static method that checks whether or not the first parameter is greater than the second one 
     * (value1 > value2). If either value is null - <code>false</code> will be returned.
     */
    public static isGreater(value1: any, value2: any): boolean {
        var number1 = DoubleConverter.toNullableDouble(value1);
        var number2 = DoubleConverter.toNullableDouble(value2);

        if (number1 == null || number2 == null)
            return false;

        return number1 > number2;
    }

    /**
     * Static method that checks whether or not a pair of values match. The values are converted to 
     * strings using [[StringConverter.toString StringConverter's toString]] method to see if they 
     * match. If both values are null - they are considered to match. 
     */
    public static match(value1: any, value2: any): boolean {
        if (value1 == null && value2 == null)
            return true;
        if (value1 == null || value2 == null)
            return false;

        let str1: string = StringConverter.toString(value1);
        let str2: string = StringConverter.toString(value2);
        
        return !!str1.match(str2);
    }

}