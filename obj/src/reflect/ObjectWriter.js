"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module reflect */
let _ = require('lodash');
const PropertyReflector_1 = require("./PropertyReflector");
const IntegerConverter_1 = require("../convert/IntegerConverter");
class ObjectWriter {
    static setProperty(obj, name, value) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Property name cannot be null");
        if (_.isObject(obj) && !_.isDate(obj)) {
            PropertyReflector_1.PropertyReflector.setProperty(obj, name, value);
        }
        else if (_.isArray(obj)) {
            let index = IntegerConverter_1.IntegerConverter.toNullableInteger(name);
            if (index >= 0) {
                while (index < obj.length - 1)
                    obj.push(null);
                obj[index] = value;
            }
        }
    }
    static setProperties(obj, values) {
        if (values == null)
            return;
        for (let key in values) {
            let value = values[key];
            ObjectWriter.setProperty(obj, key, value);
        }
    }
}
exports.ObjectWriter = ObjectWriter;
//# sourceMappingURL=ObjectWriter.js.map