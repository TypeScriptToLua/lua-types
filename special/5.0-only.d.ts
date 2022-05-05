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
 * Returns all elements from the given list. This function is equivalent to
 *
 * `return list[1], list[2], ..., list[n]`
 *
 * except that the above code can be written only for a fixed n. The number n is
 * the size of the list, as defined for the table.getn function. 
 */
declare function unpack<T extends any[]>(list: T): LuaMultiReturn<T>;

declare namespace debug {
    /**
     * Returns the current hook settings of the thread, as three values: the
     * current hook function, the current hook mask, and the current hook count
     * (as set by the debug.sethook function).
     */
    function gethook(): LuaMultiReturn<[undefined, 0] | [Function, number, string?]>;

    /**
     * Returns a table with information about a function. You can give the
     * function directly or you can give a number as the value of f, which means
     * the function running at level f of the call stack of the given thread:
     * level 0 is the current function (getinfo itself); level 1 is the function
     * that called getinfo (except for tail calls, which do not count on the
     * stack); and so on. If f is a number larger than the number of active
     * functions, then getinfo returns nil.
     *
     * The returned table can contain all the fields returned by lua_getinfo, with
     * the string what describing which fields to fill in. The default for what is
     * to get all information available, except the table of valid lines. If
     * present, the option 'f' adds a field named func with the function itself.
     * If present, the option 'L' adds a field named activelines with the table of
     * valid lines.
     *
     * For instance, the expression debug.getinfo(1,"n").name returns a name for
     * the current function, if a reasonable name can be found, and the expression
     * debug.getinfo(print) returns a table with all available information about
     * the print function.
     */
    function getinfo<T extends Function>(f: T): FunctionInfo<T>;
    function getinfo<T extends Function>(f: T, what: string): Partial<FunctionInfo<T>>;
    function getinfo(f: number): FunctionInfo | undefined;
    function getinfo(f: number, what: string): Partial<FunctionInfo> | undefined;

    /**
     * This function returns the name and the value of the local variable with
     * index local of the function at level level of the stack. (The first
     * parameter or local variable has index 1, and so on, until the last active
     * local variable.) The function returns nil if there is no local variable
     * with the given index, and raises an error when called with a level out of
     * range. (You can call debug.getinfo to check whether the level is valid.)
     */
    function getlocal(level: number, local: number): LuaMultiReturn<[string, any]>;

    /**
     * Sets the given function as a hook. The string mask and the number count
     * describe when the hook will be called. The string mask may have any
     * combination of the following characters, with the given meaning:
     *
     * * 'c': the hook is called every time Lua calls a function;
     * * 'r': the hook is called every time Lua returns from a function;
     * * 'l': the hook is called every time Lua enters a new line of code.
     *
     * Moreover, with a count different from zero, the hook is called also after
     * every count instructions.
     *
     * When called without arguments, debug.sethook turns off the hook.
     *
     * When the hook is called, its first parameter is a string describing the
     * event that has triggered its call: "call" (or "tail call"), "return",
     * "line", and "count". For line events, the hook also gets the new line
     * number as its second parameter. Inside a hook, you can call getinfo with
     * level 2 to get more information about the running function (level 0 is the
     * getinfo function, and level 1 is the hook function).
     */
    function sethook(): void;
    function sethook(
        hook: (event: 'call' | 'return' | 'line' | 'count', line?: number) => any,
        mask: string,
        count?: number
    ): void;

    /**
     * This function assigns the value value to the local variable with index
     * local of the function at level level of the stack. The function returns nil
     * if there is no local variable with the given index, and raises an error
     * when called with a level out of range. (You can call getinfo to check
     * whether the level is valid.) Otherwise, it returns the name of the local
     * variable.
     *
     * See debug.getlocal for more information about variable indices and names.
     */
    function setlocal(level: number, local: number, value: any): string | undefined;

    /**
     * Returns a string with a traceback of the call stack. An optional message
     * string is appended at the beginning of the traceback. This function is
     * typically used with xpcall to produce better error messages. 
     */
    function traceback<T>(message: T): T;
}

/**
 * Sets the garbage-collection threshold to the given limit (in Kbytes) and
 * checks it against the byte counter. If the new threshold is smaller than the
 * byte counter, then Lua immediately runs the garbage collector (see 2.9). If
 * limit is absent, it defaults to zero (thus forcing a garbage-collection
 * cycle).
 */
declare function collectgarbage(limit: number): void;

/**
 * Returns two results: the number of Kbytes of dynamic memory that Lua is using
 * and the current garbage collector threshold (also in Kbytes).
 */
declare function gcinfo(): LuaMultiReturn<[number, number]>;

/**
 * Links the program with the dynamic C library libname. Inside this library,
 * looks for a function funcname and returns this function as a C function.
 * 
 * libname must be the complete file name of the C library, including any
 * eventual path and extension.
 * 
 * This function is not supported by ANSI C. As such, it is only available on
 * some platforms (Windows, Linux, Solaris, BSD, plus other Unix systems that
 * support the dlfcn standard).
 */
 declare function loadlib(libname: string, funcname: string): undefined | Function;

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
}

declare namespace table {
    /**
     * Executes the given f over all elements of table. For each element, f is
     * called with the index and respective value as arguments. If f returns a
     * non-nil value, then the loop is broken, and this value is returned as the
     * final value of foreach.
     * 
     * See the next function for extra information about table traversals. 
     */
    function foreach(table: object, f: (index: any, value: any) => any): any;

    /**
     * Executes the given f over the numerical indices of table. For each index,
     * f is called with the index and respective value as arguments. Indices are
     * visited in sequential order, from 1 to n, where n is the size of the
     * table (see 5.4). If f returns a non-nil value, then the loop is broken
     * and this value is returned as the result of foreachi.
     */
    function foreachi(table: object, f: (index: number, value: any) => any): any;

    /**
     * Returns the size of a table, when seen as a list. If the table has an n
     * field with a numeric value, this value is the size of the table.
     * Otherwise, if there was a previous call to table.setn over this table,
     * the respective value is returned. Otherwise, the size is one less the
     * first integer index with a nil value.
     */
    function getn(table: object): number;

    /**
     * Updates the size of a table. If the table has a field "n" with a
     * numerical value, that value is changed to the given n. Otherwise, it
     * updates an internal state so that subsequent calls to table.getn(table)
     * return n.
     */
    function setn(table: object, n: number): void;
}
