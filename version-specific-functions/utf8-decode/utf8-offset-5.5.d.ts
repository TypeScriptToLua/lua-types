// https://www.lua.org/manual/5.5/manual.html#6.6

/**
 * This library provides basic support for UTF-8 encoding. It provides all its
 * functions inside the table utf8. This library does not provide any support
 * for Unicode other than the handling of the encoding. Any operation that needs
 * the meaning of a character, such as character classification, is outside its
 * scope.
 *
 * Unless stated otherwise, all functions that expect a byte position as a
 * parameter assume that the given position is either the start of a byte
 * sequence or one plus the length of the subject string. As in the string
 * library, negative indices count from the end of the string.
 */
declare namespace utf8 {
    /**
     * Returns the position of the n-th character of s (counting from byte
     * position i) as two integers: The index (in bytes) where its encoding
     * starts and the index (in bytes) where it ends.
     *
     * If the specified character is right after the end of s, the function
     * behaves as if there was a '\0' there. If the specified character is
     * neither in the subject nor right after its end, the function returns fail.
     *
     * A negative n gets characters before position i. The default for i is 1
     * when n is non-negative and #s + 1 otherwise, so that utf8.offset(s,-n)
     * gets the offset of the n-th character from the end of the string.
     *
     * As a special case, when n is 0 the function returns the start of the
     * encoding of the character that contains the i-th byte of s.
     *
     * This function assumes that s is a valid UTF-8 string.
     */
    function offset(s: string, n?: number, i?: number): LuaMultiReturn<[number, number]>;
}
