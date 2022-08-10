/** @noSelfInFile */

/**
 * Sets the garbage-collection threshold to the given limit (in Kbytes) and
 * checks it against the byte counter. If the new threshold is smaller than the
 * byte counter, then Lua immediately runs the garbage collector (see 2.9). If
 * limit is absent, it defaults to zero (thus forcing a garbage-collection
 * cycle).
 */
declare function collectgarbage(limit: number): void;

/**
 * Similar to load, but gets the chunk from file filename or from the standard
 * input, if no file name is given.
 */
declare function loadfile(filename?: string): LuaMultiReturn<[() => any] | [undefined, string]>;

/**
 * Similar to load, but gets the chunk from the given string.
 *
 * To load and run a given string, use the idiom
 *
 * `assert(loadstring(s))()`
 *
 * When absent, chunkname defaults to the given string.
 */
declare function loadstring(
    string: string,
    chunkname?: string
): LuaMultiReturn<[() => any] | [undefined, string]>;

/**
 * Returns all elements from the given list. This function is equivalent to
 *
 * `return list[1], list[2], ..., list[n]`
 *
 * except that the above code can be written only for a fixed n. The number n is
 * the size of the list, as defined for the table.getn function.
 */
declare function unpack<T extends any[]>(list: T): LuaMultiReturn<T>;

/**
 * Returns two results: the number of Kbytes of dynamic memory that Lua is using
 * and the current garbage collector threshold (also in Kbytes).
 */
declare function gcinfo(): LuaMultiReturn<[number, number]>;

/**
 * Returns the current environment in use by the function. f can be a Lua
 * function or a number that specifies the function at that stack level: Level 1
 * is the function calling getfenv. If the given function is not a Lua function,
 * or if f is 0, getfenv returns the global environment. The default for f is 1.
 */
declare function getfenv(f?: Function | number): any;

declare namespace io {
    type FileReadNumberFormat = '*n';
    type FileReadLineFormat = '*l';
    type FileReadFormat = FileReadNumberFormat | FileReadLineFormat | '*a' | number;
}

/**
 * Sets the environment to be used by the given function. f can be a Lua
 * function or a number that specifies the function at that stack level: Level 1
 * is the function calling setfenv. setfenv returns the given function.
 *
 * As a special case, when f is 0 setfenv changes the environment of the running
 * thread. In this case, setfenv returns no values.
 */
declare function setfenv<T extends Function>(f: T, table: object): T;
declare function setfenv(f: 0, table: object): Function;
declare function setfenv(f: number, table: object): void;

/**
 * This function is similar to pcall, except that it sets a new message handler
 * msgh.
 *
 * xpcall calls function f in protected mode, using err as the error handler.
 * Any error inside f is not propagated; instead, xpcall catches the error,
 * calls the err function with the original error object, and returns a status
 * code. Its first result is the status code (a boolean), which is true if the
 * call succeeds without errors. In this case, xpcall also returns all results
 * from the call, after this first result. In case of any error, xpcall returns
 * false plus the result from err.
 */
declare function xpcall<R, E>(
    f: () => R,
    err: (err: any) => E
): LuaMultiReturn<[true, R] | [false, E]>;
