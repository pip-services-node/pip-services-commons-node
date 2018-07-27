/**
 * Class that provides methods for extracting and processing search tags from objects.
 */
export declare class TagsProcessor {
    private static NORMALIZE_REGEX;
    private static COMPRESS_REGEX;
    private static SPLIT_REGEX;
    private static HASHTAG_REGEX;
    /**
     * Normalize a tag by replacing _ and # with spaces
     *
     * @param tag   the tag to normalize.
     * @return      a normalized tag.
     */
    static normalizeTag(tag: string): string;
    /**
     * Compress a tag by removing spaces, _ and # and converting to lower case
     *
     * @param tag   the tag to compress.
     * @return      a compressed tag.
     */
    static compressTag(tag: string): string;
    /**
     * Determines if two tags are equal, based on their length and the characters contained.
     *
     * @param tag1  the first tag.
     * @param tag2  the second tag.
     * @return      true if the tags are equal and false otherwise.
     */
    static equalTags(tag1: string, tag2: string): boolean;
    /**
     * Normalizes the tags contained in the passed String array using [[normalizeTag]].
     *
     * @param tags  the tags to normalize.
     * @return      a String array of normalized tags.
     */
    static normalizeTags(tags: string[]): string[];
    /**
     * Normalizes the tags contained in the passed String using [[normalizeTag]].
     *
     * @param tagList  the list of tags to normalize.
     * @return      a String array of normalized tags.
     */
    static normalizeTagList(tagList: string): string[];
    /**
     * Compresses the tags contained in the passed String using [[compressTag]].
     *
     * @param tags  the tags to compress.
     * @return      a String array of compressed tags.
     */
    static compressTags(tags: string[]): string[];
    /**
     * Compresses the tags contained in the passed String array using [[compressTag]].
     *
     * @param tagList  the tags to compress.
     * @return      a String array of compressed tags.
     */
    static compressTagList(tagList: string): string[];
    /**
     * Extracts hash tags from text.
     *
     * @param text    text to parse
     * @return              a String array of compressed tags.
     */
    static extractHashTags(text: string): string[];
    private static extractString;
    /**
     * Extracts hash tags from a JSON object with the help of user-defined tag search fields.
     *
     * @param jsonObject    the JSON object to parse.
     * @param searchFields  the user-defined tag search fields.
     * @return              a String array of compressed tags, based on the user-defined
     *                      tag search fields.
     */
    static extractHashTagsFromValue(obj: any, ...searchFields: string[]): string[];
}
