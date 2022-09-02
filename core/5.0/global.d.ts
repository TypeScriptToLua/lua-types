// Based on https://www.lua.org/manual/5.0/manual.html#5.1

/** @noSelfInFile */

type LuaThread = { readonly __internal__: unique symbol };
type LuaUserdata = { readonly __internal__: unique symbol };

/**
 * A global variable (not a function) that holds a string containing the running
 * Lua version.
 */
declare const _VERSION: 'Lua 5.0' | 'Lua 5.0.1' | 'Lua 5.0.2' | 'Lua 5.0.3';

/**
 * A global variable (not a function) that holds the global environment (see
 * §2.2). Lua itself does not use this variable; changing its value does not
 * affect any environment, nor vice versa.
 */
declare const _G: typeof globalThis;

/**
 * Calls error if the value of its argument `v` is false (i.e., nil or false);
 * otherwise, returns all its arguments. In case of error, `message` is the
 * error object; when absent, it defaults to "assertion failed!"
 */
declare function assert<V>(v: V): Exclude<V, undefined | null | false>;
declare function assert<V, A extends any[]>(
    v: V,
    ...args: A
): LuaMultiReturn<[Exclude<V, undefined | null | false>, ...A]>;

/**
 * Opens the named file and executes its contents as a Lua chunk. When called
 * without arguments, dofile executes the contents of the standard input
 * (stdin). Returns all values returned by the chunk. In case of errors, dofile
 * propagates the error to its caller (that is, dofile does not run in protected
 * mode).
 */
declare function dofile(filename?: string): any;

/**
 * Terminates the last protected function called and returns message as the
 * error object. Function error never returns.
 *
 * Usually, error adds some information about the error position at the
 * beginning of the message, if the message is a string. The level argument
 * specifies how to get the error position. With level 1 (the default), the
 * error position is where the error function was called. Level 2 points the
 * error to where the function that called error was called; and so on. Passing
 * a level 0 avoids the addition of error position information to the message.
 */
declare function error(message: string, level?: number): never;

/**
 * If object does not have a metatable, returns nil. Otherwise, if the object's
 * metatable has a __metatable field, returns the associated value. Otherwise,
 * returns the metatable of the given object.
 */
declare function getmetatable<T>(object: T): LuaMetatable<T> | undefined;

/**
 * Returns three values (an iterator function, the table t, and 0) so that the
 * construction
 *
 * `for i,v in ipairs(t) do body end`
 *
 * will iterate over the key–value pairs (1,t[1]), (2,t[2]), ..., up to the
 * first nil value.
 */
declare function ipairs<T>(
    t: Record<number, T>
): LuaIterable<LuaMultiReturn<[number, NonNullable<T>]>>;

/**
 * Allows a program to traverse all fields of a table. Its first argument is a
 * table and its second argument is an index in this table. next returns the
 * next index of the table and its associated value. When called with nil as its
 * second argument, next returns an initial index and its associated value. When
 * called with the last index, or with nil in an empty table, next returns nil.
 * If the second argument is absent, then it is interpreted as nil. In
 * particular, you can use next(t) to check whether a table is empty.
 *
 * The order in which the indices are enumerated is not specified, even for
 * numeric indices. (To traverse a table in numerical order, use a numerical
 * for.)
 *
 * The behavior of next is undefined if, during the traversal, you assign any
 * value to a non-existent field in the table. You may however modify existing
 * fields. In particular, you may clear existing fields.
 */
declare function next(table: object, index?: any): LuaMultiReturn<[any, any] | []>;

/**
 * If t has a metamethod __pairs, calls it with t as argument and returns the
 * first three results from the call. Otherwise, returns three values: the next
 * function, the table t, and nil, so that the construction
 *
 * `for k,v in pairs(t) do body end`
 *
 * will iterate over all key–value pairs of table t.
 *
 * See function next for the caveats of modifying the table during its
 * traversal.
 */
declare function pairs<TKey extends AnyNotNil, TValue>(
    t: LuaTable<TKey, TValue>
): LuaIterable<LuaMultiReturn<[TKey, NonNullable<TValue>]>>;
declare function pairs<T>(t: T): LuaIterable<LuaMultiReturn<[keyof T, NonNullable<T[keyof T]>]>>;

/**
 * Calls function f with the given arguments in protected mode. This means that
 * any error inside f is not propagated; instead, pcall catches the error and
 * returns a status code. Its first result is the status code (a boolean), which
 * is true if the call succeeds without errors. In such case, pcall also returns
 * all results from the call, after this first result. In case of any error,
 * pcall returns false plus the error message.
 */
declare function pcall<This, Args extends any[], R>(
    f: (this: This, ...args: Args) => R,
    context: This,
    ...args: Args
): LuaMultiReturn<[true, R] | [false, string]>;

declare function pcall<A extends any[], R>(
    f: (this: void, ...args: A) => R,
    ...args: A
): LuaMultiReturn<[true, R] | [false, string]>;

/**
 * Receives any number of arguments and prints their values to stdout, using the
 * tostring function to convert each argument to a string. print is not intended
 * for formatted output, but only as a quick way to show a value, for instance
 * for debugging. For complete control over the output, use string.format and
 * io.write.
 */
declare function print(...args: any[]): void;

/**
 * Checks whether v1 is equal to v2, without invoking the __eq metamethod.
 * Returns a boolean.
 */
declare function rawequal<T>(v1: T, v2: T): boolean;

/**
 * Gets the real value of table[index], without invoking the __index metamethod.
 * table must be a table; index may be any value.
 */
declare function rawget<T extends object, K extends keyof T>(table: T, index: K): T[K];

/**
 * Sets the real value of table[index] to value, without invoking the __newindex
 * metamethod. table must be a table, index any value different from nil and
 * NaN, and value any Lua value.
 *
 * This function returns table.
 */
declare function rawset<T extends object, K extends keyof T>(table: T, index: K, value: T[K]): T;

/**
 * Sets the metatable for the given table. (To change the metatable of other
 * types from Lua code, you must use the debug library (§6.10).) If metatable is
 * nil, removes the metatable of the given table. If the original metatable has
 * a __metatable field, raises an error.
 *
 * This function returns table.
 */
declare function setmetatable<
    T extends object,
    TIndex extends object | ((this: T, key: any) => any) | undefined = undefined
>(
    table: T,
    metatable?: LuaMetatable<T, TIndex> | null
): TIndex extends (this: T, key: infer TKey) => infer TValue
    ? T & { [K in TKey & string]: TValue }
    : TIndex extends object
    ? T & TIndex
    : T;

/**
 * When called with no base, tonumber tries to convert its argument to a number.
 * If the argument is already a number or a string convertible to a number, then
 * tonumber returns this number; otherwise, it returns nil.
 *
 * The conversion of strings can result in integers or floats, according to the
 * lexical conventions of Lua (see §3.1). (The string may have leading and
 * trailing spaces and a sign.)
 *
 * When called with base, then e must be a string to be interpreted as an
 * integer numeral in that base. The base may be any integer between 2 and 36,
 * inclusive. In bases above 10, the letter 'A' (in either upper or lower case)
 * represents 10, 'B' represents 11, and so forth, with 'Z' representing 35. If
 * the string e is not a valid numeral in the given base, the function returns
 * nil.
 */
declare function tonumber(e: any, base?: number): number | undefined;

/**
 * Receives a value of any type and converts it to a string in a human-readable
 * format. (For complete control of how numbers are converted, use
 * string.format.)
 *
 * If the metatable of v has a __tostring field, then tostring calls the
 * corresponding value with v as argument, and uses the result of the call as
 * its result.
 */
declare function tostring(v: any): string;

/**
 * Returns the type of its only argument, coded as a string.
 */
declare function type(
    v: any
): 'nil' | 'number' | 'string' | 'boolean' | 'table' | 'function' | 'thread' | 'userdata';
