/** @noSelfInFile */

/**
 * Returns the current environment in use by the function. f can be a Lua
 * function or a number that specifies the function at that stack level: Level 1
 * is the function calling getfenv. If the given function is not a Lua function,
 * or if f is 0, getfenv returns the global environment. The default for f is 1.
 */
declare function getfenv(f?: Function | number): any;

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

declare namespace os {
    /**
     * This function is equivalent to the C function system. It passes command to
     * be executed by an operating system shell. It returns a status code, which
     * is system-dependent. If command is absent, then it returns nonzero if a
     * shell is available and zero otherwise.
     */
    function execute(command?: string): number;
}

declare namespace math {
    /**
     * Returns the base-10 logarithm of x.
     */
    function log10(x: number): number;
}
