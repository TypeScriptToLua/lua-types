/** @noSelfInFile */

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Returns the total memory in use by Lua in Kbytes. The value has a fractional
 * part, so that it multiplied by 1024 gives the exact number of bytes in use by
 * Lua (except for overflows).
 */
declare function collectgarbage(opt: 'count'): number;

declare namespace math {
    /**
     * Returns the arc tangent of y/x (in radians), but uses the signs of both
     * parameters to find the quadrant of the result. (It also handles correctly
     * the case of x being zero.)
     *
     * The default value for x is 1, so that the call math.atan(y) returns the arc
     * tangent of y.
     */
    function atan(y: number, x?: number): number;

    /**
     * An integer with the minimum value for an integer.
     */
    const mininteger: number;

    /**
     * An integer with the maximum value for an integer.
     */
    const maxinteger: number;

    /**
     * If the value x is convertible to an integer, returns that integer.
     * Otherwise, returns nil.
     */
    function tointeger(x: number): number;

    /**
     * Returns "integer" if x is an integer, "float" if it is a float, or nil if x
     * is not a number.
     */
    function type(x: number): 'integer' | 'float' | undefined;

    /**
     * Returns a boolean, true if and only if integer m is below integer n when
     * they are compared as unsigned integers.
     */
    function ult(m: number, n: number): boolean;
}

declare namespace table {
    /**
     * Moves elements from table a1 to table a2, performing the equivalent to the
     * following multiple assignment: a2[t],··· = a1[f],···,a1[e]. The default for
     * a2 is a1. The destination range can overlap with the source range. The
     * number of elements to be moved must fit in a Lua integer.
     *
     * Returns the destination table a2.
     */
    function move<T1, T2 = T1>(a1: T1[], f: number, e: number, t: number, a2?: T2[]): (T2 | T1)[];
}

declare namespace string {
    /**
     * Returns a string containing a binary representation (a binary chunk) of the
     * given function, so that a later load on this string returns a copy of the
     * function (but with new upvalues). If strip is a true value, the binary
     * representation may not include all debug information about the function, to
     * save space.
     *
     * Functions with upvalues have only their number of upvalues saved. When
     * (re)loaded, those upvalues receive fresh instances containing nil. (You can
     * use the debug library to serialize and reload the upvalues of a function in
     * a way adequate to your needs.)
     */
    function dump(func: Function, strip?: boolean): string;

    /**
     * Returns a binary string containing the values v1, v2, etc. packed (that is,
     * serialized in binary form) according to the format string fmt (see §6.4.2).
     */
    function pack(fmt: string, ...values: any[]): string;

    /**
     * Returns the values packed in string s (see string.pack) according to the
     * format string fmt (see §6.4.2). An optional pos marks where to start
     * reading in s (default is 1). After the read values, this function also
     * returns the index of the first unread byte in s.
     */
    function unpack(fmt: string, s: string, pos?: number): LuaMultiReturn<any[]>;

    /**
     * Returns the size of a string resulting from string.pack with the given
     * format. The format string cannot have the variable-length options 's' or
     * 'z' (see §6.4.2).
     */
    function packsize(fmt: string): number;
}

declare namespace coroutine {
    /**
     * Returns true when the running coroutine can yield.
     *
     * A running coroutine is yieldable if it is not the main thread and it is not
     * inside a non-yieldable C function.
     */
    function isyieldable(): boolean;
}

// https://www.lua.org/manual/5.3/manual.html#6.5

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
     * Receives zero or more integers, converts each one to its corresponding
     * UTF-8 byte sequence and returns a string with the concatenation of all
     * these sequences
     */
    function char(...args: number[]): string;

    /**
     * The pattern (a string, not a function) "[\0-\x7F\xC2-\xF4][\x80-\xBF]*"
     * (see §6.4.1), which matches exactly one UTF-8 byte sequence, assuming that
     * the subject is a valid UTF-8 string.
     */
    var charpattern: string;

    /**
     * Returns values so that the construction
     *
     * `for p, c in utf8.codes(s) do body end`
     *
     * will iterate over all characters in string s, with p being the position (in
     * bytes) and c the code point of each character. It raises an error if it
     * meets any invalid byte sequence.
     */
    function codes<S extends string>(
        s: S
    ): [(s: S, index?: number) => LuaMultiReturn<[number, number]>, S, 0];

    /**
     * Returns the codepoints (as integers) from all characters in s that start
     * between byte position i and j (both included). The default for i is 1 and
     * for j is i. It raises an error if it meets any invalid byte sequence.
     */
    function codepoint(s: string, i?: number, j?: number): LuaMultiReturn<number[]>;

    /**
     * Returns the number of UTF-8 characters in string s that start between
     * positions i and j (both inclusive). The default for i is 1 and for j is -1.
     * If it finds any invalid byte sequence, returns a false value plus the
     * position of the first invalid byte.
     */
    function len(s: string, i?: number, j?: number): number;

    /**
     * Returns the position (in bytes) where the encoding of the n-th character of
     * s (counting from position i) starts. A negative n gets characters before
     * position i. The default for i is 1 when n is non-negative and #s + 1
     * otherwise, so that utf8.offset(s, -n) gets the offset of the n-th character
     * from the end of the string. If the specified character is neither in the
     * subject nor right after its end, the function returns nil.
     *
     * As a special case, when n is 0 the function returns the start of the
     * encoding of the character that contains the i-th byte of s.
     *
     * This function assumes that s is a valid UTF-8 string.
     */
    function offset(s: string, n?: number, i?: number): number;
}

interface LuaMetatable<T> {
    /**
     * the floor division (//) operation. Behavior similar to the addition
     * operation.
     */
    __idiv?(this: T, operand: any): any;

    /**
     * the bitwise AND (&) operation. Behavior similar to the addition operation,
     * except that Lua will try a metamethod if any operand is neither an integer
     * nor a value coercible to an integer (see §3.4.3).
     */
    __band?(this: T, operand: any): any;

    /**
     * the bitwise OR (|) operation. Behavior similar to the bitwise AND
     * operation.
     */
    __bor?(this: T, operand: any): any;

    /**
     * the bitwise exclusive OR (binary ~) operation. Behavior similar to the
     * bitwise AND operation.
     */
    __bxor?(this: T, operand: any): any;

    /**
     * the bitwise NOT (unary ~) operation. Behavior similar to the bitwise AND
     * operation.
     */
    __bnot?(this: T, operand: any): any;

    /**
     * the bitwise left shift (<<) operation. Behavior similar to the bitwise AND
     * operation.
     */
    __shl?(this: T, operand: any): any;

    /**
     * the bitwise right shift (>>) operation. Behavior similar to the bitwise AND
     * operation.
     */
    __shr?(this: T, operand: any): any;
}

declare namespace io {
    type FileReadNumberFormat = 'n';
    type FileReadLineFormat = 'l';
    type FileReadFormat = FileReadNumberFormat | FileReadLineFormat | 'a' | 'L' | number;
}
