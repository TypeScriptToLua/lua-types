// Based on https://www.lua.org/manual/5.3/manual.html#6.10

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
}
