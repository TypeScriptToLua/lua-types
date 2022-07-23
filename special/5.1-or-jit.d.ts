/** @noSelfInFile */

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Returns the total memory in use by Lua in Kbytes. The value has a fractional
 * part, so that it multiplied by 1024 gives the exact number of bytes in use by
 * Lua (except for overflows).
 */
declare function collectgarbage(opt: 'count'): number;

/**
 * Returns the elements from the given list. This function is equivalent to
 *
 * `return list[i], list[i+1], ···, list[j]`
 *
 * except that the above code can be written only for a fixed number of
 * elements. By default, i is 1 and j is the length of the list, as defined by
 * the length operator (see §2.5.5).
 */
declare function unpack<T extends any[]>(list: T): LuaMultiReturn<T>;
declare function unpack<T>(list: T[], i: number, j?: number): LuaMultiReturn<T[]>;

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

declare namespace debug {
    /**
     * Returns the environment of object o.
     */
    function getfenv(o: object): any;

    /**
     * Sets the environment of the given object to the given table. Returns
     * object.
     */
    function setfenv<T extends object>(o: T, table: object): T;
}

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
     */
    var loaders: (
        | ((modname: string) => LuaMultiReturn<[(modname: string) => void]>)
        | (<T>(modname: string) => LuaMultiReturn<[(modname: string, extra: T) => T, T]>)
        | string
    )[];
}

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

declare namespace table {
    /**
     * Returns the largest positive numerical index of the given table, or zero if
     * the table has no positive numerical indices. (To do its job this function
     * does a linear traversal of the whole table.)
     */
    function maxn(table: object): number;
}

declare namespace coroutine {
    /**
     * Returns the running coroutine, or nil when called by the main thread.
     */
    function running(): LuaThread | undefined;
}
