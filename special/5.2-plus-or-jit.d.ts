/** @noSelfInFile */

/**
 * Loads a chunk.
 *
 * If chunk is a string, the chunk is this string. If chunk is a function, load
 * calls it repeatedly to get the chunk pieces. Each call to chunk must return a
 * string that concatenates with previous results. A return of an empty string,
 * nil, or no value signals the end of the chunk.
 *
 * If there are no syntactic errors, returns the compiled chunk as a function;
 * otherwise, returns nil plus the error message.
 *
 * If the resulting function has upvalues, the first upvalue is set to the value
 * of env, if that parameter is given, or to the value of the global
 * environment. Other upvalues are initialized with nil. (When you load a main
 * chunk, the resulting function will always have exactly one upvalue, the _ENV
 * variable (see §2.2). However, when you load a binary chunk created from a
 * function (see string.dump), the resulting function can have an arbitrary
 * number of upvalues.) All upvalues are fresh, that is, they are not shared
 * with any other function.
 *
 * chunkname is used as the name of the chunk for error messages and debug
 * information (see §4.9). When absent, it defaults to chunk, if chunk is a
 * string, or to "=(load)" otherwise.
 *
 * The string mode controls whether the chunk can be text or binary (that is, a
 * precompiled chunk). It may be the string "b" (only binary chunks), "t" (only
 * text chunks), or "bt" (both binary and text). The default is "bt".
 *
 * Lua does not check the consistency of binary chunks. Maliciously crafted
 * binary chunks can crash the interpreter.
 */
declare function load(
    chunk: string | (() => string | null | undefined),
    chunkname?: string,
    mode?: 'b' | 't' | 'bt',
    env?: object
): LuaMultiReturn<[() => any] | [undefined, string]>;

/**
 * Similar to load, but gets the chunk from file filename or from the standard
 * input, if no file name is given.
 */
declare function loadfile(
    filename?: string,
    mode?: 'b' | 't' | 'bt',
    env?: object
): LuaMultiReturn<[() => any] | [undefined, string]>;

/**
 * This function is similar to pcall, except that it sets a new message handler
 * msgh.
 */
declare function xpcall<This, Args extends any[], R, E>(
    f: (this: This, ...args: Args) => R,
    msgh: (this: void, err: any) => E,
    context: This,
    ...args: Args
): LuaMultiReturn<[true, R] | [false, E]>;

declare function xpcall<Args extends any[], R, E>(
    f: (this: void, ...args: Args) => R,
    msgh: (err: any) => E,
    ...args: Args
): LuaMultiReturn<[true, R] | [false, E]>;

declare namespace debug {
    interface FunctionInfo<T extends Function = Function> {
        nparams: number;
        isvararg: boolean;
    }

    /**
     * This function returns the name and the value of the local variable with
     * index local of the function at level f of the stack. This function accesses
     * not only explicit local variables, but also parameters, temporaries, etc.
     *
     * The first parameter or local variable has index 1, and so on, following the
     * order that they are declared in the code, counting only the variables that
     * are active in the current scope of the function. Negative indices refer to
     * vararg parameters; -1 is the first vararg parameter. The function returns
     * nil if there is no variable with the given index, and raises an error when
     * called with a level out of range. (You can call debug.getinfo to check
     * whether the level is valid.)
     *
     * Variable names starting with '(' (open parenthesis) represent variables
     * with no known names (internal variables such as loop control variables, and
     * variables from chunks saved without debug information).
     *
     * The parameter f may also be a function. In that case, getlocal returns only
     * the name of function parameters.
     */
    function getlocal(f: Function | number, local: number): LuaMultiReturn<[string, any]>;
    function getlocal(
        thread: LuaThread,
        f: Function | number,
        local: number
    ): LuaMultiReturn<[string, any]>;

    /**
     * Returns a unique identifier (as a light userdata) for the upvalue numbered
     * n from the given function.
     *
     * These unique identifiers allow a program to check whether different
     * closures share upvalues. Lua closures that share an upvalue (that is, that
     * access a same external local variable) will return identical ids for those
     * upvalue indices.
     */
    function upvalueid(f: Function, n: number): LuaUserdata;

    /**
     * Make the n1-th upvalue of the Lua closure f1 refer to the n2-th upvalue of
     * the Lua closure f2.
     */
    function upvaluejoin(f1: Function, n1: number, f2: Function, n2: number): void;
}

declare namespace math {
    /**
     * Returns the logarithm of x in the given base. The default for base is e (so
     * that the function returns the natural logarithm of x).
     */
    function log(x: number, base?: number): number;
}

declare namespace string {
    /**
     * Returns a string that is the concatenation of n copies of the string s
     * separated by the string sep. The default value for sep is the empty string
     * (that is, no separator). Returns the empty string if n is not positive.
     *
     * (Note that it is very easy to exhaust the memory of your machine with a
     * single call to this function.)
     */
    function rep(s: string, n: number, sep?: string): string;
}

declare namespace os {
    /**
     * Calls the ISO C function exit to terminate the host program. If code is
     * true, the returned status is EXIT_SUCCESS; if code is false, the returned
     * status is EXIT_FAILURE; if code is a number, the returned status is this
     * number. The default value for code is true.
     *
     * If the optional second argument close is true, closes the Lua state before
     * exiting.
     */
    function exit(code?: boolean | number, close?: boolean): never;
}
