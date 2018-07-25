"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AndRule {
    constructor(...rules) {
        this._rules = rules;
    }
    validate(path, schema, value, results) {
        if (!this._rules)
            return;
        for (var i = 0; i < this._rules.length; i++) {
            let rule = this._rules[i];
            rule.validate(path, schema, value, results);
        }
    }
}
exports.AndRule = AndRule;
//# sourceMappingURL=AndRule.js.map