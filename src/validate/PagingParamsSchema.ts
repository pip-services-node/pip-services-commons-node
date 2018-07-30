/** @module validate */
import { TypeCode } from '../convert/TypeCode';
import { ObjectSchema } from './ObjectSchema';

/**
 * Schema for validating PagingParams objects.
 */
export class PagingParamsSchema extends ObjectSchema {

    /**
     * Calls [[ObjectSchema.constructor ObjectSchema's constructor]] and 
     * adds the following (optional) properties:
     * - "skip" as TypeCode.Long;
     * - "take" as TypeCode.Long;
     * - "total" as TypeCode.Long;
     * 
     * @see [[ObjectSchema]]
     * @see [[PagingParams]]
     * @see [[TypeCode]]
     */
    public constructor() {
        super();
        this.withOptionalProperty("skip", TypeCode.Long);
        this.withOptionalProperty("take", TypeCode.Long);
        this.withOptionalProperty("total", TypeCode.Boolean);
    }

}
