/** @module validate */
import { TypeCode } from '../convert/TypeCode';
import { MapSchema } from './MapSchema';

/**
 * Schema for validating FilterParams objects.
 */
export class FilterParamsSchema extends MapSchema {

    /**
     * Calls [[MapSchema.constructor MapSchema's constructor]] with 'keyType' set to 
     * 'TypeCode.String'.
     * 
     * @see [[MapSchema]]
     * @see [[FilterParams]]
     * @see [[TypeCode]]
     */
    public constructor() {
        super(null, null, TypeCode.String, null);
    }

}
