/** @module validate */
import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { Schema } from './Schema';

/**
 * Used to validate object properties, as well as their type. Using in [[ObjectSchema ObjectSchemas]].
 * 
 * @see [[ObjectSchema]]
 */
export class PropertySchema extends Schema {
    private _name: string;
    private _type: any;
    
    /**
     * Creates a new PropertySchema object which can validate an object's property using the 
     * set rules. The data type of the property will also be validated if a [[TypeCode type]] is set.
     * 
     * @param required      defines whether or not <code>null</code> values 
     *                      should cause validation to fail (as  
     *                      a [[ValidationResultType.Error validation error]]). 
     * @param rules         the [[IValidationRule rules]] to set for this Schema.
     * @param name          the name of the property that is to be validated.
     *                      Can be set later on using [[setName]].
     * @param type          the [[TypeCode data type]] to check for when validating an object's property.
     *                      Can be set later on using [[setType]].
     * 
     * @see [[IValidationRule]]
     * @see [[TypeCode]]
     */
    public constructor(required?: boolean, rules?: IValidationRule[], name?: string, type?: any) {
        super(required, rules);

        this._name = name;
        this._type = type;
    }

    /**
     * @returns the name of the property that this PropertySchema validates.
     */
    public getName(): string {
        return this._name; 
    }

    /**
     * @param value     the name of the property that this PropertySchema should validate.
     */
    public setName(value: string) {
        this._name = value; 
    }

    /**
     * @returns the [[TypeCode data type]] that this PropertySchema checks for when validating a property.
     */
    public getType(): any {
        return this._type; 
    }

    /**
     * @param value     the [[TypeCode data type]] that this PropertySchema should check for when 
     * validating a property.
     */
    public setType(value: any) {
        this._type = value; 
    }

    /**
     * Validates the given 'value' using [[Schema.performValidation]] and, if a [[getType type]] is a set, 
     * additionally validates that the passed value (property) is of the correct data type.
     * 
     * @param path      the dot notation path to the value that is to be validated.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation.
     */
    public performValidation(path: string, value: any, results: ValidationResult[]): void {
        path = path != "" ? path + "." + this.getName() : this.getName();

        super.performValidation(path, value, results);

        super.performTypeValidation(path, this.getType(), value, results);
    }

}
