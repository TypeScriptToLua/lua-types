// Based on https://www.lua.org/manual/5.0/manual.html#5.8

/** @noSelfInFile */

/**
 * This library provides the functionality of the debug interface (§4.9) to Lua
 * programs. You should exert care when using this library. Several of its
 * functions violate basic assumptions about Lua code (e.g., that variables
 * local to a function cannot be accessed from outside; that userdata metatables
 * cannot be changed by Lua code; that Lua programs do not crash) and therefore
 * can compromise otherwise secure code. Moreover, some functions in this
 * library may be slow.
 *
 * All functions in this library are provided inside the debug table. All
 * functions that operate over a thread have an optional first argument which is
 * the thread to operate over. The default is always the current thread.
 */
declare namespace debug {
    /**
     * Enters an interactive mode with the user, running each string that the user
     * enters. Using simple commands and other debug facilities, the user can
     * inspect global and local variables, change their values, evaluate
     * expressions, and so on. A line containing only the word cont finishes this
     * function, so that the caller continues its execution.
     *
     * Note that commands for debug.debug are not lexically nested within any
     * function and so have no direct access to local variables.
     */
    function debug(): void;

    interface FunctionInfo<T extends Function = Function> {
        /**
         * The function itself.
         */
        func: T;

        /**
         * A reasonable name for the function.
         */
        name?: string;
        /**
         * What the `name` field means. The empty string means that Lua did not find
         * a name for the function.
         */
        namewhat: 'global' | 'local' | 'method' | 'field' | '';

        source: string;
        /**
         * A short version of source (up to 60 characters), useful for error
         * messages.
         */
        short_src: string;
        linedefined: number;
        lastlinedefined: number;
        /**
         * What this function is.
         */
        what: 'Lua' | 'C' | 'main';

        currentline: number;

        /**
         * Number of upvalues of that function.
         */
        nups: number;
    }

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
     * This function returns the name and the value of the upvalue with index up
     * of the function f. The function returns nil if there is no upvalue with the
     * given index.
     *
     * Variable names starting with '(' (open parenthesis) represent variables
     * with no known names (variables from chunks saved without debug
     * information).
     */
    function getupvalue(f: Function, up: number): LuaMultiReturn<[string, any] | []>;

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
     * This function assigns the value value to the upvalue with index up of the
     * function f. The function returns nil if there is no upvalue with the given
     * index. Otherwise, it returns the name of the upvalue.
     */
    function setupvalue(f: Function, up: number, value: any): string | undefined;

    /**
     * Sets the given value as the Lua value associated to the given udata. udata
     * must be a full userdata.
     *
     * Returns udata.
     */
    function setuservalue(udata: LuaUserdata, value: any): LuaUserdata;

    /**
     * Returns a string with a traceback of the call stack. An optional message
     * string is appended at the beginning of the traceback. This function is
     * typically used with xpcall to produce better error messages.
     */
    function traceback(message?: string | null): string;
}
