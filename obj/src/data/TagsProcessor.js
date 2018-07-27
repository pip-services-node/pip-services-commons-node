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
     * Normalize a tag by replacing _ and # with spaces
     *
     * @param tag   the tag to normalize.
     * @return      a normalized tag.
     */
    TagsProcessor.normalizeTag = function (tag) {
        return tag
            ? _.trim(tag.replace(this.NORMALIZE_REGEX, ' '))
            : null;
    };
    /**
     * Compress a tag by removing spaces, _ and # and converting to lower case
     *
     * @param tag   the tag to compress.
     * @return      a compressed tag.
     */
    TagsProcessor.compressTag = function (tag) {
        return tag
            ? tag.replace(this.COMPRESS_REGEX, '').toLocaleLowerCase()
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
        return TagsProcessor.compressTag(tag1) == TagsProcessor.compressTag(tag2);
    };
    /**
     * Normalizes the tags contained in the passed String array using [[normalizeTag]].
     *
     * @param tags  the tags to normalize.
     * @return      a String array of normalized tags.
     */
    TagsProcessor.normalizeTags = function (tags) {
        return _.map(tags, function (tag) { return TagsProcessor.normalizeTag(tag); });
    };
    /**
     * Normalizes the tags contained in the passed String using [[normalizeTag]].
     *
     * @param tagList  the list of tags to normalize.
     * @return      a String array of normalized tags.
     */
    TagsProcessor.normalizeTagList = function (tagList) {
        var tags = tagList.split(this.SPLIT_REGEX);
        // Remove separators (JS only)
        for (var index = 0; index < tags.length - 1; index++)
            tags.splice(index + 1, 1);
        return this.normalizeTags(tags);
    };
    /**
     * Compresses the tags contained in the passed String using [[compressTag]].
     *
     * @param tags  the tags to compress.
     * @return      a String array of compressed tags.
     */
    TagsProcessor.compressTags = function (tags) {
        return _.map(tags, function (tag) { return TagsProcessor.compressTag(tag); });
    };
    /**
     * Compresses the tags contained in the passed String array using [[compressTag]].
     *
     * @param tagList  the tags to compress.
     * @return      a String array of compressed tags.
     */
    TagsProcessor.compressTagList = function (tagList) {
        var tags = tagList.split(this.SPLIT_REGEX);
        // Remove separators (JS only)
        for (var index = 0; index < tags.length - 1; index++)
            tags.splice(index + 1, 1);
        return this.compressTags(tags);
    };
    /**
     * Extracts hash tags from text.
     *
     * @param text    text to parse
     * @return              a String array of compressed tags.
     */
    TagsProcessor.extractHashTags = function (text) {
        var tags;
        if (text != '') {
            var hashTags = text.match(TagsProcessor.HASHTAG_REGEX);
            tags = TagsProcessor.compressTags(hashTags);
        }
        return _.uniq(tags);
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
    TagsProcessor.extractHashTagsFromValue = function (obj) {
        var searchFields = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            searchFields[_i - 1] = arguments[_i];
        }
        // Todo: Use recursive
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
    TagsProcessor.NORMALIZE_REGEX = /(_|#)+/g;
    TagsProcessor.COMPRESS_REGEX = /( |_|#)+/g;
    TagsProcessor.SPLIT_REGEX = /(,|;)+/;
    TagsProcessor.HASHTAG_REGEX = /#\w+/g;
    return TagsProcessor;
}());
exports.TagsProcessor = TagsProcessor;
//# sourceMappingURL=TagsProcessor.js.map