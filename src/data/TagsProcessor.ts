/** @module data */
/** @hidden */ 
let _ = require('lodash');

/**
 * Class that provides methods for extracting and processing search tags from objects.
 */
export class TagsProcessor {
    private static NORMALIZE_REGEX = /(_|#)+/g;
    private static COMPRESS_REGEX = /( |_|#)+/g;
    private static SPLIT_REGEX = /(,|;)+/;
    private static HASHTAG_REGEX = /#\w+/g;

    /**
     * Normalize a tag by replacing _ and # with spaces
     *
     * @param tag   the tag to normalize.
     * @return      a normalized tag.
     */
    public static normalizeTag(tag: string): string {
        return tag 
            ? _.trim(tag.replace(this.NORMALIZE_REGEX, ' ')) 
            : null;
    }

    /**
     * Compress a tag by removing spaces, _ and # and converting to lower case
     *
     * @param tag   the tag to compress.
     * @return      a compressed tag.
     */
    public static compressTag(tag: string): string {
        return tag
            ? tag.replace(this.COMPRESS_REGEX, '').toLocaleLowerCase()
            : null;
    }

    /**
     * Determines if two tags are equal, based on their length and the characters contained.
     *
     * @param tag1  the first tag.
     * @param tag2  the second tag.
     * @return      true if the tags are equal and false otherwise.
     */
    public static equalTags(tag1: string, tag2: string): boolean {
        if (tag1 == null && tag2 == null)
            return true;
        if (tag1 == null || tag2 == null)
            return false;
        return TagsProcessor.compressTag(tag1) == TagsProcessor.compressTag(tag2);
    }

    /**
     * Normalizes the tags contained in the passed String array using [[normalizeTag]].
     *
     * @param tags  the tags to normalize.
     * @return      a String array of normalized tags.
     */
    public static normalizeTags(tags: string[]): string[] {
        return _.map(tags, (tag) => TagsProcessor.normalizeTag(tag));
    }

    /**
     * Normalizes the tags contained in the passed String using [[normalizeTag]].
     *
     * @param tagList  the list of tags to normalize.
     * @return      a String array of normalized tags.
     */
    public static normalizeTagList(tagList: string): string[] {
        let tags = tagList.split(this.SPLIT_REGEX);
        // Remove separators (JS only)
        for (let index = 0; index < tags.length - 1; index++)
           tags.splice(index + 1, 1);
        return this.normalizeTags(tags);
    }

    /**
     * Compresses the tags contained in the passed String using [[compressTag]].
     *
     * @param tags  the tags to compress.
     * @return      a String array of compressed tags.
     */
    public static compressTags(tags: string[]): string[] {
        return _.map(tags, (tag) => TagsProcessor.compressTag(tag));
    }

    /**
     * Compresses the tags contained in the passed String array using [[compressTag]].
     *
     * @param tagList  the tags to compress.
     * @return      a String array of compressed tags.
     */
    public static compressTagList(tagList: string): string[] {
        let tags = tagList.split(this.SPLIT_REGEX);
        // Remove separators (JS only)
        for (let index = 0; index < tags.length - 1; index++)
           tags.splice(index + 1, 1);
        return this.compressTags(tags);
    }

    /**
     * Extracts hash tags from text.
     *
     * @param text    text to parse
     * @return              a String array of compressed tags.
     */
    public static extractHashTags(text: string): string[] {
        let tags: string[];

        if (text != '') {
            let hashTags = text.match(TagsProcessor.HASHTAG_REGEX);
            tags = TagsProcessor.compressTags(hashTags);
        }

        return _.uniq(tags);
    }

    private static extractString(field: any): string {
        if (field == null) return '';
        if (_.isString(field)) return field;
        if (!_.isObject(field)) return '';
        
        let result = '';
        for (let prop in field) {
            result += ' ' + TagsProcessor.extractString(field[prop]);
        }
        return result;
    }

    /**
     * Extracts hash tags from a JSON object with the help of user-defined tag search fields.
     *
     * @param jsonObject    the JSON object to parse.
     * @param searchFields  the user-defined tag search fields.
     * @return              a String array of compressed tags, based on the user-defined 
     *                      tag search fields.
     */
    public static extractHashTagsFromValue(obj: any, ...searchFields: string[]): string[] {
        // Todo: Use recursive
        let tags = TagsProcessor.compressTags(obj.tags);

        _.each(searchFields, (field) => {
            let text = TagsProcessor.extractString(obj[field]);

            if (text != '') {
                let hashTags = text.match(TagsProcessor.HASHTAG_REGEX);
                tags = tags.concat(TagsProcessor.compressTags(hashTags));
            }
        });

        return _.uniq(tags);
    }
}
