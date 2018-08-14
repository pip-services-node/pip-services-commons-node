/** @module validate */
import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { Schema } from './Schema';
import { PropertySchema } from './PropertySchema';
import { ObjectComparator } from './ObjectComparator';
import { ObjectReader } from '../reflect/ObjectReader';

/**
 * Used to validate objects, as well as their properties.
 */
export class ObjectSchema extends Schema {
    private _properties: PropertySchema[];
    private _allowUndefined: boolean;
    private _allowExtra: boolean = false;

    /**
     * Creates a new ObjectSchema, which can be used to validate objects using the given rules. 
     * Object properties can be validated as well if [[PropertySchema PropertySchemas]] are added to 
     * this ObjectSchema. 
     * 
     * @param allowExtraProperies      defines whether or not validation results should contain 
     *                                  a [[ValidationResultType.Warning Warning]], when extra 
     *                                  properties are detected.
     * @param required                  defines whether or not <code>null</code> object 
     *                                  properties should cause validation to fail (as   
     *                                  a [[ValidationResultType.Error validation error]]). 
     * @param rules                     the [[IValidationRule rules]] to set for this Schema.
     * 
     * @see [[IValidationRule]]
     */
    public constructor(allowExtraProperies?: boolean, required?: boolean, rules?: IValidationRule[]) {
        super(required, rules);
        this._allowExtra = allowExtraProperies;
    }

    /**
     * @returns the array of PropertySchemas, which are to be used for object validation.
     * 
     * @see [[PropertySchema]]
     */
    public get properties(): PropertySchema[] {
        return this._properties;
    }

    /**
     * @param value     the array of PropertySchemas to use for object validation.
     * 
     * @see [[PropertySchema]]
     */
    public set properties(value: PropertySchema[]) {
        this._properties = value;
    }

    /**
     * @returns whether or not undefined properties are allowed to pass validation.
     */
    public get isUndefinedAllowed(): boolean {
        return this._allowUndefined;
    }

    /**
     * @param value     whether or not undefined properties should be allowed to pass validation.
     */
    public set isUndefinedAllowed(value: boolean) {
        this._allowUndefined = value;
    }

    /**
     * Sets 'isUndefinedAllowed' to the given 'value' and returns the modified ObjectSchema.
     * 
     * @param value     whether or not undefined properties should be allowed to pass validation.
     * @returns this ObjectSchema with 'isUndefinedAllowed' set to the value that was passed.
     */
    public allowUndefined(value: boolean): ObjectSchema {
        this.isUndefinedAllowed = value;
        return this;
    }

    /**
     * Adds a [[PropertySchema]] to this ObjectSchema object, which will be used for validating  
     * objects' properties.
     * 
     * @param schema    the PropertySchema to add to this ObjectSchema.
     * @returns this ObjectSchema with the new PropertySchema added to its list of properties.
     * 
     * @see [[PropertySchema]]
     */
    public withProperty(schema: PropertySchema): ObjectSchema {
        this.properties = this.properties || [];
        this.properties.push(schema);
        return this;
    }

    /**
     * Adds a new [[PropertySchema]] to this ObjectSchema using the given parameters and makes it 
     * required. When a Schema is required, <code>null</code> values cause validation to fail (as 
     * a [[ValidationResultType.Error validation error]]).
     * 
     * @param name      the name of the property that is to be validated.
     * @param type      the [[TypeCode data type]] to check for when validating an object's property.
     * @param rules     the [[IValidationRule rules]] to set for the property's schema.
     * 
     * @see [[PropertySchema]]
     * @see [[TypeCode]]
     * @see [[IValidationRule]]
     */
    public withRequiredProperty(name: string, type?: any, ...rules: IValidationRule[]): ObjectSchema {
        this.properties = this.properties || [];

        var schema = new PropertySchema(null, null, name, type);
        schema.setRules(rules.slice());
        schema.makeRequired();

        return this.withProperty(schema);
    }

    /**
     * Adds a new [[PropertySchema]] to this ObjectSchema using the given parameters and makes it 
     * optional. When a Schema is optional, <code>null</code> values pass validation.
     * 
     * @param name      the name of the property that is to be validated.
     * @param type      the [[TypeCode data type]] to check for when validating an object's property.
     * @param rules     the [[IValidationRule rules]] to set for the property's schema.
     * 
     * @see [[PropertySchema]]
     * @see [[TypeCode]]
     * @see [[IValidationRule]]
     */
    public withOptionalProperty(name: string, type?: any, ...rules: IValidationRule[]): ObjectSchema {
        this.properties = this.properties || [];

        var schema = new PropertySchema(null, null, name, type);
        schema.setRules(rules.slice());
        schema.makeOptional();

        return this.withProperty(schema);
    }

    /**
     * Validates the given 'value' using [[Schema.performValidation]] and, if 
     * [[PropertySchema PropertySchemas]] were set, additionally validates value's properties. 
     * If extra properties are not allowed and are detected - the validation results will 
     * contain a [[ValidationResultType.Warning Warning]].
     * 
     * @param path      the dot notation path to the value that is to be validated.
     * @param value     the value that is to be validated.
     * @param results   the results of the validation. If extra properties are not allowed and
     *                  are detected, then the results will contain a [[ValidationResultType.Warning Warning]].  
     * 
     * @see [[PropertySchema]]
     */
    protected performValidation(path: string, value: any, results: ValidationResult[]): void {
        super.performValidation(path, value, results);

        if (!value) return;

        let name = path || "value";
        let properties = ObjectReader.getProperties(value);

        if (this.properties) {
            for (var i = 0; i < this.properties.length; i++) {
                var propertySchema: PropertySchema = this.properties[i];
                var processedName = null;

                for (var key in properties) {
                    var propertyName = key;
                    var propertyValue = properties[key];

                    if (ObjectComparator.areEqual(propertySchema.getName(), propertyName)) {
                        propertySchema.performValidation(path, propertyValue, results);
                        processedName = propertyName;
                        break;
                    }
                }

                if (processedName)
                    delete properties[processedName];
                else
                    propertySchema.performValidation(path, null, results);
            }
        }

        if (!this._allowExtra)
            for (var key in properties) {
                let propertyPath: string = key && path != "" ? path + "." + key : key;

                results.push(new ValidationResult(
                    propertyPath,
                    ValidationResultType.Warning,
                    "UNEXPECTED_PROPERTY",
                    name + " contains unexpected property " + key,
                    null,
                    key
                ));
            }
    }

}
