/** @module data */
import { AnyValueArray } from "./AnyValueArray";

const _ = require('lodash');

/**
 * Class that includes standard design patterns for data projection. Projection parameters 
 * contain information about what data to retrieve from a data source. 
 */
export class ProjectionParams extends Array<string> {

    /**
     * @param values    the projection parameters to initialize this ProjectionParams object with.
     */
    public constructor(values: any[] = null) {
        super();

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = ProjectionParams.prototype;

        if (values != null) {
            for (let value of values)
                this.push("" + value);
        }
    }

    /**
     * @returns these ProjectionParams as a comma-separated values string.
     */
    public toString(): string {
        let builder = "";

        for (let index = 0; index < this.length; index++) {
            if (index > 0) {
                builder += ',';
            }

            builder += super[index];
        }

        return builder;
    }

    /**
     * Static method that creates a ProjectionParams object using the given value.
     * 
     * @param value     the value to initialize the new ProjectionParams with. If it is 
     *                  not an array, [[AnyValueArray.fromValue]] used for conversion.
     * @returns the ProjectionParams object that was generated using 'value'.
     * 
     * @see [[AnyValueArray.fromValue]]
     */
    public static fromValue(value: any): ProjectionParams {
        if (!_.isArray(value))
            value = AnyValueArray.fromValue(value);

        return new ProjectionParams(value);
    }

    /**
     * Static method for creating new ProjectionParams objects using the values
     * passed as projection parameters.
     * 
     * @param values    the projection parameters to initialize the new ProjectionParams object with.
     * @returns         the ProjectionParams created.
     */
    public static parse(...values: string[]) {
        let result = new ProjectionParams();

        for (let value of values) {
            this.parseValue("", result, value);
        }

        return result;    
    }

    private static parseValue(prefix: string, result: ProjectionParams, value: string): void {
        value = value.trim();

        let openBracket = 0;
        let openBracketIndex = -1;
        let closeBracketIndex = -1;
        let commaIndex = -1;

        let breakCycleRequired = false;
        for (let index = 0; index < value.length; index++) {
            switch (value[index]) {
                case '(':
                    if (openBracket == 0) {
                        openBracketIndex = index;
                    }

                    openBracket++;
                    break;
                case ')':
                    openBracket--;

                    if (openBracket == 0) {
                        closeBracketIndex = index;

                        if (openBracketIndex >= 0 && closeBracketIndex > 0) {
                            let previousPrefix = prefix;

                            if (prefix && prefix.length > 0) {
                                prefix = prefix + "." + value.substring(0, openBracketIndex);
                            } else {
                                prefix = value.substring(0, openBracketIndex);
                            }

                            let subValue = value.substring(openBracketIndex + 1, closeBracketIndex);
                            this.parseValue(prefix, result, subValue);

                            subValue = value.substring(closeBracketIndex + 1);
                            this.parseValue(previousPrefix, result, subValue);
                            breakCycleRequired = true;
                        }
                    }
                    break;
                case ',':
                    if (openBracket == 0) {
                        commaIndex = index;

                        let subValue = value.substring(0, commaIndex);

                        if (subValue && subValue.length > 0) {
                            if (prefix && prefix.length > 0) {
                                result.push(prefix + "." + subValue);
                            } else {
                                result.push(subValue);
                            }
                        }

                        subValue = value.substring(commaIndex + 1);

                        if (subValue && subValue.length > 0) {
                            this.parseValue(prefix, result, subValue);
                            breakCycleRequired = true;
                        }
                    }
                    break;
            }

            if (breakCycleRequired) {
                break;
            }
        }

        if (value && value.length > 0 && openBracketIndex == -1 && commaIndex == -1) {
            if (prefix && prefix.length > 0) {
                result.push(prefix + "." + value);
            } else {
                result.push(value);
            }
        }
    }

}