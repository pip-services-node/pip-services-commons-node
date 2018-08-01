import { ObjectSchema } from './ObjectSchema';
/**
 * Schema for validating PagingParams objects.
 */
export declare class PagingParamsSchema extends ObjectSchema {
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
    constructor();
}
