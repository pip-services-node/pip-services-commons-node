"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module data */
var _ = require('lodash');
/**
 * Class that provides methods for extracting and processing search tags from objects.
 */
var TagsProcessor = /** @class */ (function () {
    function TagsProcessor() {
    }
    /**
     * Normalize a tag by replacing with the REGEX: (_|#)
     *
     * @param tag   the tag to normalize.
     * @return      a normalized tag.
     */
    TagsProcessor.normalizeTag = function (tag) {
        return tag
            ? _.trim(tag.replace(/(_|#)+/g, ' '))
            : null;
    };
    /**
     * Compress a tag by replacing with the REGEX: ( |_|#)
     *
     * @param tag   the tag to compress.
     * @return      a compressed tag.
     */
    TagsProcessor.compressTag = function (tag) {
        return tag
            ? tag.replace(/( |_|#)/g, '').toLocaleLowerCase()
            : null;
    };
    /**
     * Determines if two tags are equal, based on their length and the characters contained.
     *
     * @param tag1  the first tag.
     * @param tag2  the second tag.
     * @return      true if the tags are equal and false otherwise.
     */
    TagsProcessor.equalTags = function (tag1, tag2) {
        if (tag1 == null && tag2 == null)
            return true;
        if (tag1 == null || tag2 == null)
            return false;
        return TagsProcessor.compressTag(tag1)
            == TagsProcessor.compressTag(tag2);
    };
    /**
     * Normalizes the tags contained in the passed String using [[normalizeTag]].
     *
     * @param tags  the tags to normalize.
     * @return      a String array of normalized tags.
     */
    TagsProcessor.normalizeTags = function (tags) {
        if (_.isString(tags))
            tags = tags.split(/(,|;)+/);
        tags = _.map(tags, function (tag) { return TagsProcessor.normalizeTag(tag); });
        return tags;
    };
    /**
     * Compresses the tags contained in the passed String using [[compressTag]].
     *
     * @param tags  the tags to compress.
     * @return      a String array of compressed tags.
     */
    TagsProcessor.compressTags = function (tags) {
        if (_.isString(tags))
            tags = tags.split(/(,|;)+/);
        tags = _.map(tags, function (tag) { return TagsProcessor.compressTag(tag); });
        return tags;
    };
    TagsProcessor.extractString = function (field) {
        if (field == null)
            return '';
        if (_.isString(field))
            return field;
        if (!_.isObject(field))
            return '';
        var result = '';
        for (var prop in field) {
            result += ' ' + TagsProcessor.extractString(field[prop]);
        }
        return result;
    };
    /**
     * Extracts hash tags from a JSON object with the help of user-defined tag search fields.
     *
     * @param jsonObject    the JSON object to parse.
     * @param searchFields  the user-defined tag search fields.
     * @return              a String array of compressed tags, based on the user-defined
     *                      tag search fields.
     */
    TagsProcessor.extractHashTags = function (obj) {
        var searchFields = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            searchFields[_i - 1] = arguments[_i];
        }
        var tags = TagsProcessor.compressTags(obj.tags);
        _.each(searchFields, function (field) {
            var text = TagsProcessor.extractString(obj[field]);
            if (text != '') {
                var hashTags = text.match(TagsProcessor.HASHTAG_REGEX);
                tags = tags.concat(TagsProcessor.compressTags(hashTags));
            }
        });
        return _.uniq(tags);
    };
    TagsProcessor.HASHTAG_REGEX = /#\w+/g;
    return TagsProcessor;
}());
exports.TagsProcessor = TagsProcessor;
//# sourceMappingURL=TagsProcessor.js.map