/** @noSelfInFile */

declare let _ENV: Record<string, any>;

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Returns a boolean that tells whether the collector is running (i.e., not
 * stopped).
 */
declare function collectgarbage(opt: 'isrunning'): boolean;

/**
 * Creates a module. If there is a table in package.loaded[name], this table is
 * the module. Otherwise, if there is a global table t with the given name, this
 * table is the module. Otherwise creates a new table t and sets it as the value
 * of the global name and the value of package.loaded[name]. This function also
 * initializes t._NAME with the given name, t._M with the module (t itself), and
 * t._PACKAGE with the package name (the full module name minus last component;
 * see below). Finally, module sets t as the new environment of the current
 * function and the new value of package.loaded[name], so that require returns
 * t.
 *
 * If name is a compound name (that is, one with components separated by dots),
 * module creates (or reuses, if they already exist) tables for each component.
 * For instance, if name is a.b.c, then module stores the module table in field
 * c of field b of global a.
 *
 * This function can receive optional options after the module name, where each
 * option is a function to be applied over the module.
 */
declare function module(name: string, ...options: Function[]): void;

declare namespace package {
    /**
     * A table used by require to control how to load modules.
     *
     * Each entry in this table is a searcher function. When looking for a module,
     * require calls each of these searchers in ascending order, with the module
     * name (the argument given to require) as its sole parameter. The function
     * can return another function (the module loader) plus an extra value that
     * will be passed to that loader, or a string explaining why it did not find
     * that module (or nil if it has nothing to say).
     *
     * Lua initializes this table with four searcher functions.
     *
     * The first searcher simply looks for a loader in the package.preload table.
     *
     * The second searcher looks for a loader as a Lua library, using the path
     * stored at package.path. The search is done as described in function
     * package.searchpath.
     *
     * The third searcher looks for a loader as a C library, using the path given
     * by the variable package.cpath. Again, the search is done as described in
     * function package.searchpath. For instance, if the C path is the string
     *
     * `./?.so;./?.dll;/usr/local/?/init.so`
     *
     * the searcher for module foo will try to open the files ./foo.so, ./foo.dll,
     * and /usr/local/foo/init.so, in that order. Once it finds a C library, this
     * searcher first uses a dynamic link facility to link the application with
     * the library. Then it tries to find a C function inside the library to be
     * used as the loader. The name of this C function is the string "luaopen_"
     * concatenated with a copy of the module name where each dot is replaced by
     * an underscore. Moreover, if the module name has a hyphen, its suffix after
     * (and including) the first hyphen is removed. For instance, if the module
     * name is a.b.c-v2.1, the function name will be luaopen_a_b_c.
     *
     * The fourth searcher tries an all-in-one loader. It searches the C path for
     * a library for the root name of the given module. For instance, when
     * requiring a.b.c, it will search for a C library for a. If found, it looks
     * into it for an open function for the submodule; in our example, that would
     * be luaopen_a_b_c. With this facility, a package can pack several C
     * submodules into one single library, with each submodule keeping its
     * original open function.
     *
     * All searchers except the first one (preload) return as the extra value the
     * file name where the module was found, as returned by package.searchpath.
     * The first searcher returns no extra value.
     */
    var searchers: (
        | ((modname: string) => LuaMultiReturn<[(modname: string) => void]>)
        | (<T>(modname: string) => LuaMultiReturn<[(modname: string, extra: T) => T, T]>)
        | string
    )[];
}

declare namespace table {
    /**
     * Returns the elements from the given list. This function is equivalent to
     *
     * `return list[i], list[i+1], ···, list[j]`
     *
     * By default, i is 1 and j is #list.
     */
    function unpack<T extends any[]>(list: T): LuaMultiReturn<T>;
    function unpack<T>(list: T[], i: number, j?: number): LuaMultiReturn<T[]>;

    /**
     * Returns a new table with all parameters stored into keys 1, 2, etc. and
     * with a field "n" with the total number of parameters. Note that the
     * resulting table may not be a sequence.
     */
    function pack<T extends any[]>(...args: T): T & { n: number };
}

declare namespace os {
    /**
     * This function is equivalent to the ISO C function system. It passes command
     * to be executed by an operating system shell. Its first result is true if
     * the command terminated successfully, or nil otherwise. After this first
     * result the function returns a string plus a number, as follows:
     * * "exit": the command terminated normally; the following number is the exit
     *   status of the command.
     * * "signal": the command was terminated by a signal; the following number is
     *   the signal that terminated the command.
     *
     * When called without a command, os.execute returns a boolean that is true if
     * a shell is available.
     */
    function execute(): boolean;

    /**
     * This function is equivalent to the ISO C function system. It passes command
     * to be executed by an operating system shell. Its first result is true if
     * the command terminated successfully, or nil otherwise. After this first
     * result the function returns a string plus a number, as follows:
     * * "exit": the command terminated normally; the following number is the exit
     *   status of the command.
     * * "signal": the command was terminated by a signal; the following number is
     *   the signal that terminated the command.
     *
     * When called without a command, os.execute returns a boolean that is true if
     * a shell is available.
     */
    function execute(
        command: string
    ): LuaMultiReturn<[true | undefined, 'exit' | 'signal', number]>;
}

declare namespace debug {
    interface FunctionInfo<T extends Function> {
        istailcall: boolean;
    }
}

interface LuaMetatable<T> {
    /**
     * Handle iteration through table pairs when `for k,v in pairs(tbl) do ...
     * end` is called.
     */
    __pairs?<T>(t: T): [(t: T, index?: any) => [any, any], T];

    /**
     * Handle iteration through table pairs when `for k,v in ipairs(tbl) do ...
     * end` is called.
     */
    __ipairs?<T extends object>(t: T): [(t: T, index?: number) => [number, any], T, 0];
}

declare namespace coroutine {
    /**
     * Returns the running coroutine plus a boolean, true when the running
     * coroutine is the main one.
     */
    function running(): LuaMultiReturn<[LuaThread, boolean]>;
}
