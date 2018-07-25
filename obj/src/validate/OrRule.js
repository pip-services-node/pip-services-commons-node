"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrRule {
    constructor(...rules) {
        this._rules = rules;
    }
    validate(path, schema, value, results) {
        if (!this._rules || this._rules.length == 0)
            return;
        let localResults = [];
        for (var i = 0; i < this._rules.length; i++) {
            var resultCount = localResults.length;
            this._rules[i].validate(path, schema, value, localResults);
            if (resultCount == localResults.length)
                return;
        }
        results.push.apply(results, localResults);
    }
}
exports.OrRule = OrRule;
//# sourceMappingURL=OrRule.js.map