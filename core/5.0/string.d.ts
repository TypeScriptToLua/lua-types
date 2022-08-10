// Based on https://www.lua.org/manual/5.0/manual.html#5.3

/** @noSelfInFile */

/**
 * This library provides generic functions for string manipulation, such as
 * finding and extracting substrings, and pattern matching. When indexing a
 * string in Lua, the first character is at position 1 (not at 0, as in C).
 * Indices are allowed to be negative and are interpreted as indexing backwards,
 * from the end of the string. Thus, the last character is at position -1, and
 * so on.
 *
 * The string library provides all its functions inside the table string. It
 * also sets a metatable for strings where the __index field points to the
 * string table. Therefore, you can use the string functions in object-oriented
 * style. For instance, string.byte(s,i) can be written as s:byte(i).
 *
 * The string library assumes one-byte character encodings.
 */
declare namespace string {
    /**
     * Returns the internal numerical code of the i-th character of s, or nil if
     * the index is out of range. If i is absent, then it is assumed to be 1. i
     * may be negative.
     *
     * Note that numerical codes are not necessarily portable across platforms.
     */
    function byte(s: string, i?: number): number;

    /**
     * Receives zero or more integers. Returns a string with length equal to the
     * number of arguments, in which each character has the internal numeric code
     * equal to its corresponding argument.
     *
     * Numeric codes are not necessarily portable across platforms.
     */
    function char(...args: number[]): string;

    /**
     * Returns a string containing a binary representation of the given function,
     * so that a later load on this string returns a copy of the function (but
     * with new upvalues).
     */
    function dump(func: Function): string;

    /**
     * Looks for the first match of pattern (see §6.4.1) in the string s. If it
     * finds a match, then find returns the indices of s where this occurrence
     * starts and ends; otherwise, it returns nil. A third, optional numeric
     * argument init specifies where to start the search; its default value is 1
     * and can be negative. A value of true as a fourth, optional argument plain
     * turns off the pattern matching facilities, so the function does a plain
     * "find substring" operation, with no characters in pattern being considered
     * magic. Note that if plain is given, then init must be given as well.
     *
     * If the pattern has captures, then in a successful match the captured values
     * are also returned, after the two indices.
     */
    function find(
        s: string,
        pattern: string,
        init?: number,
        plain?: boolean
    ): LuaMultiReturn<[number, number, ...string[]] | []>;

    /**
     * Returns a formatted version of its variable number of arguments following
     * the description given in its first argument (which must be a string). The
     * format string follows the same rules as the ISO C function sprintf. The
     * only differences are that the options/modifiers *, h, L, l, n, and p are
     * not supported and that there is an extra option, q.
     *
     * The q option formats a string between double quotes, using escape sequences
     * when necessary to ensure that it can safely be read back by the Lua
     * interpreter. For instance, the call
     *
     * `string.format('%q', 'a string with "quotes" and \n new line')`
     *
     * may produce the string:
     *
     * `"a string with \"quotes\" and \
     *  new line"` Options A, a, E, e, f, G, and g all expect a number as
     * argument. Options c, d, i, o, u, X, and x expect an integer. When Lua is
     * compiled with a C89 compiler, options A and a (hexadecimal floats) do not
     * support any modifier (flags, width, length).
     *
     * Option s expects a string; if its argument is not a string, it is converted
     * to one following the same rules of tostring. If the option has any modifier
     * (flags, width, length), the string argument should not contain embedded
     * zeros.
     */
    function format(formatstring: string, ...args: any[]): string;

    /**
     * Returns an iterator function that, each time it is called, returns the
     * next captures from pattern pat over string s.
     *
     * If pat specifies no captures, then the whole match is produced in each
     * call.
     *
     * As an example, the following loop
     *
     * ```
     * s = "hello world from Lua"
     * for w in string.gfind(s, "%a+") do
     *   print(w)
     * end
     * ```
     *
     * will iterate over all the words from string s, printing one per line. The
     * next example collects all pairs key=value from the given string into a
     * table:
     *
     * ```
     * t = {}
     * s = "from=world, to=Lua"
     * for k, v in string.gfind(s, "(%w+)=(%w+)") do
     *   t[k] = v
     * end
     * ```
     */
    function gfind(s: string, pattern: string): LuaIterable<LuaMultiReturn<string[]>>;

    /**
     * Returns a copy of s in which all (or the first n, if given) occurrences of
     * the pattern (see §6.4.1) have been replaced by a replacement string
     * specified by repl, which can be a string, a table, or a function. gsub also
     * returns, as its second value, the total number of matches that occurred.
     * The name gsub comes from Global SUBstitution.
     *
     * If repl is a string, then its value is used for replacement. The character
     * % works as an escape character: any sequence in repl of the form %d, with d
     * between 1 and 9, stands for the value of the d-th captured substring. The
     * sequence %0 stands for the whole match. The sequence %% stands for a single
     * %.
     *
     * If repl is a table, then the table is queried for every match, using the
     * first capture as the key.
     *
     * If repl is a function, then this function is called every time a match
     * occurs, with all captured substrings passed as arguments, in order.
     *
     * In any case, if the pattern specifies no captures, then it behaves as if
     * the whole pattern was inside a capture.
     *
     * If the value returned by the table query or by the function call is a
     * string or a number, then it is used as the replacement string; otherwise,
     * if it is false or nil, then there is no replacement (that is, the original
     * match is kept in the string).
     */
    function gsub(
        s: string,
        pattern: string,
        repl: string | Record<string, string> | ((...matches: string[]) => string),
        n?: number
    ): LuaMultiReturn<[string, number]>;

    /**
     * Receives a string and returns its length. The empty string "" has length 0.
     * Embedded zeros are counted, so "a\000bc\000" has length 5.
     */
    function len(s: string): number;

    /**
     * Receives a string and returns a copy of this string with all uppercase
     * letters changed to lowercase. All other characters are left unchanged. The
     * definition of what an uppercase letter is depends on the current locale.
     */
    function lower(s: string): string;

    /**
     * Returns a string that is the concatenation of `n` copies of the string `s`.
     */
    function rep(s: string, n: number): string;

    /**
     * Returns the substring of s that starts at i and continues until j; i and j
     * can be negative. If j is absent, then it is assumed to be equal to -1
     * (which is the same as the string length). In particular, the call
     * string.sub(s,1,j) returns a prefix of s with length j, and string.sub(s,
     * -i) (for a positive i) returns a suffix of s with length i.
     *
     * If, after the translation of negative indices, i is less than 1, it is
     * corrected to 1. If j is greater than the string length, it is corrected to
     * that length. If, after these corrections, i is greater than j, the function
     * returns the empty string.
     */
    function sub(s: string, i: number, j?: number): string;

    /**
     * Receives a string and returns a copy of this string with all lowercase
     * letters changed to uppercase. All other characters are left unchanged. The
     * definition of what a lowercase letter is depends on the current locale.
     */
    function upper(s: string): string;
}
