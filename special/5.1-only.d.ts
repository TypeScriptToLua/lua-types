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
