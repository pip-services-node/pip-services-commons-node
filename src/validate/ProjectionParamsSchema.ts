/** @module validate */
import { TypeCode } from '../convert/TypeCode';
import { ArraySchema } from './ArraySchema';

/**
 * Schema for validating ProjectionParams objects.
 */
export class ProjectionParamsSchema extends ArraySchema {

    /**
     * Calls [[ArraySchema.constructor ArraySchema's constructor]] with 
     * 'valueType' set to 'TypeCode.String'.
     * 
     * @see [[ArraySchema]]
     * @see [[ProjectionParams]]
     * @see [[TypeCode]]
     */
    public constructor() {
        super(TypeCode.String);
    }

}
