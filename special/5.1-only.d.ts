/** @noSelfInFile */

/**
 * Loads a chunk using function func to get its pieces. Each call to func must
 * return a string that concatenates with previous results. A return of an empty
 * string, nil, or no value signals the end of the chunk.
 *
 * If there are no errors, returns the compiled chunk as a function; otherwise,
 * returns nil plus the error message. The environment of the returned function
 * is the global environment.
 *
 * chunkname is used as the chunk name for error messages and debug information.
 * When absent, it defaults to "=(load)".
 */
declare function load(
    func: () => string | null | undefined,
    chunkname?: string
): LuaMultiReturn<[() => any] | [undefined, string]>;

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

declare namespace math {
    /**
     * Returns the logarithm of x.
     */
    function log(x: number): number;
}

declare namespace string {
    /**
     * Returns a string that is the concatenation of n copies of the string s.
     */
    function rep(s: string, n: number): string;
}

declare namespace os {
    /**
     * Calls the C function exit, with an optional code, to terminate the host
     * program. The default value for code is the success code.
     */
    function exit(code?: number): never;
}

declare namespace debug {
    /**
     * This function returns the name and the value of the local variable with
     * index local of the function at level level of the stack. (The first
     * parameter or local variable has index 1, and so on, until the last active
     * local variable.) The function returns nil if there is no local variable
     * with the given index, and raises an error when called with a level out of
     * range. (You can call debug.getinfo to check whether the level is valid.)
     *
     * Variable names starting with '(' (open parentheses) represent internal
     * variables (loop control variables, temporaries, and C function locals).
     */
    function getlocal(level: number, local: number): LuaMultiReturn<[string, any]>;
    function getlocal(
        thread: LuaThread,
        level: number,
        local: number
    ): LuaMultiReturn<[string, any]>;
}

declare namespace io {
    type FileReadNumberFormat = '*n';
    type FileReadLineFormat = '*l';
    type FileReadFormat = FileReadNumberFormat | FileReadLineFormat | '*a' | number;
}
