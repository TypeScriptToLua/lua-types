/** @noSelfInFile */

declare namespace debug {
    /**
     * Returns the current hook settings of the thread, as three values: the
     * current hook function, the current hook mask, and the current hook count
     * (as set by the debug.sethook function).
     */
    function gethook(
        thread?: LuaThread
    ): LuaMultiReturn<[undefined, 0] | [Function, number, string?]>;

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
    function getinfo<T extends Function>(thread: LuaThread, f: T): FunctionInfo<T>;
    function getinfo<T extends Function>(
        thread: LuaThread,
        f: T,
        what: string
    ): Partial<FunctionInfo<T>>;
    function getinfo(f: number): FunctionInfo | undefined;
    function getinfo(f: number, what: string): Partial<FunctionInfo> | undefined;
    function getinfo(thread: LuaThread, f: number): FunctionInfo | undefined;
    function getinfo(thread: LuaThread, f: number, what: string): Partial<FunctionInfo> | undefined;

    /**
     * Returns the metatable of the given value or nil if it does not have a
     * metatable.
     */
    function getmetatable<T extends any>(value: T): LuaMetatable<T> | undefined;

    /**
     * Returns the registry table (see §4.5).
     */
    function getregistry(): Record<string, any>;

    /**
     * Returns the Lua value associated to u. If u is not a full userdata, returns
     * nil.
     */
    function getuservalue(u: LuaUserdata): any;

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
    function sethook(
        thread: LuaThread,
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
    function setlocal(
        thread: LuaThread,
        level: number,
        local: number,
        value: any
    ): string | undefined;

    /**
     * Sets the metatable for the given value to the given table (which can be
     * nil). Returns value.
     */
    function setmetatable<
        T extends object,
        TIndex extends object | ((this: T, key: any) => any) | undefined = undefined
    >(
        value: T,
        table?: LuaMetatable<T, TIndex> | null
    ): TIndex extends (this: T, key: infer TKey) => infer TValue
        ? T & { [K in TKey & string]: TValue }
        : TIndex extends object
        ? T & TIndex
        : T;

    /**
     * If message is present but is neither a string nor nil, this function
     * returns message without further processing. Otherwise, it returns a string
     * with a traceback of the call stack. The optional message string is appended
     * at the beginning of the traceback. An optional level number tells at which
     * level to start the traceback (default is 1, the function calling
     * traceback).
     */
    function traceback(message?: string | null, level?: number | null): string;
    function traceback(thread?: LuaThread, message?: string | null, level?: number | null): string;
    function traceback<T>(message: T): T;
    function traceback<T>(thread: LuaThread, message: T): T;
}

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Performs a full garbage-collection cycle. This is the default option.
 */
declare function collectgarbage(opt?: 'collect'): void;

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Stops automatic execution of the garbage collector. The collector will run
 * only when explicitly invoked, until a call to restart it.
 */
declare function collectgarbage(opt: 'stop'): void;

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Restarts automatic execution of the garbage collector.
 */
declare function collectgarbage(opt: 'restart'): void;

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Sets arg as the new value for the pause of the collector (see §2.5). Returns
 * the previous value for pause.
 */
declare function collectgarbage(opt: 'setpause', arg: number): number;

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Sets arg as the new value for the step multiplier of the collector (see
 * §2.5). Returns the previous value for step.
 */
declare function collectgarbage(opt: 'setstepmul', arg: number): number;

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Performs a garbage-collection step. The step "size" is controlled by arg.
 * With a zero value, the collector will perform one basic (indivisible) step.
 * For non-zero values, the collector will perform as if that amount of memory
 * (in KBytes) had been allocated by Lua. Returns true if the step finished a
 * collection cycle.
 */
declare function collectgarbage(opt: 'step', arg: number): boolean;

/**
 * Returns the length of the object v, which must be a table or a string,
 * without invoking the __len metamethod. Returns an integer.
 */
declare function rawlen(v: object | string): number;

/**
 * If index is a number, returns all arguments after argument number index; a
 * negative number indexes from the end (-1 is the last argument). Otherwise,
 * index must be the string "#", and select returns the total number of extra
 * arguments it received.
 */
declare function select<T>(index: number, ...args: T[]): LuaMultiReturn<T[]>;

/**
 * If index is a number, returns all arguments after argument number index; a
 * negative number indexes from the end (-1 is the last argument). Otherwise,
 * index must be the string "#", and select returns the total number of extra
 * arguments it received.
 */
declare function select<T>(index: '#', ...args: T[]): number;

declare namespace io {
    /**
     * This function is system dependent and is not available on all platforms.
     *
     * Starts program prog in a separated process and returns a file handle that
     * you can use to read data from this program (if mode is "r", the default)
     * or to write data to this program (if mode is "w").
     */
    function popen(prog: string, mode?: 'r' | 'w'): LuaMultiReturn<[LuaFile] | [undefined, string]>;
}

interface LuaFile {
    /**
     * Sets the buffering mode for an output file. There are three available
     * modes:
     *
     * * "no": no buffering; the result of any output operation appears
     *   immediately.
     * * "full": full buffering; output operation is performed only when the
     *   buffer is full or when you explicitly flush the file (see io.flush).
     * * "line": line buffering; output is buffered until a newline is output or
     *   there is any input from some special files (such as a terminal device).
     *   For the last two cases, size specifies the size of the buffer, in bytes.
     *   The default is an appropriate size.
     */
    setvbuf(mode: 'no' | 'full' | 'line', size?: number): void;
}

declare namespace math {
    /**
     * Returns the remainder of the division of x by y that rounds the quotient
     * towards zero. (integer/float)
     */
    function fmod(x: number, y: number): number;

    /**
     * The float value HUGE_VAL, a value larger than any other numeric value.
     */
    const huge: number;

    /**
     * Returns the integral part of x and the fractional part of x. Its second
     * result is always a float.
     */
    function modf(x: number): LuaMultiReturn<[number, number]>;
}

interface LuaMetatable<
    T,
    TIndex extends object | ((this: T, key: any) => any) | undefined =
        | object
        | ((this: T, key: any) => any)
        | undefined
> {
    /**
     * the modulo (%) operation. Behavior similar to the addition operation.
     */
    __mod?(this: T, operand: any): any;

    /**
     * the length (#) operation. If the object is not a string, Lua will try its
     * metamethod. If there is a metamethod, Lua calls it with the object as
     * argument, and the result of the call (always adjusted to one value) is the
     * result of the operation. If there is no metamethod but the object is a
     * table, then Lua uses the table length operation (see §3.4.7). Otherwise,
     * Lua raises an error.
     */
    __len?(this: T): any;
}

/**
 * The package library provides basic facilities for loading modules in Lua. It
 * exports one function directly in the global environment: require. Everything
 * else is exported in a table package.
 */
declare namespace package {
    /**
     * A string describing some compile-time configurations for packages. This
     * string is a sequence of lines:
     * * The first line is the directory separator string. Default is '\' for
     *   Windows and '/' for all other systems.
     * * The second line is the character that separates templates in a path.
     *   Default is ';'.
     * * The third line is the string that marks the substitution points in a
     *   template. Default is '?'.
     * * The fourth line is a string that, in a path in Windows, is replaced by
     *   the executable's directory. Default is '!'.
     * * The fifth line is a mark to ignore all text after it when building the
     *   luaopen_ function name. Default is '-'.
     */
    var config: string;

    /**
     * The path used by require to search for a C loader.
     *
     * Lua initializes the C path package.cpath in the same way it initializes the
     * Lua path package.path, using the environment variable LUA_CPATH_5_3, or the
     * environment variable LUA_CPATH, or a default path defined in luaconf.h.
     */
    var cpath: string;

    /**
     * A table used by require to control which modules are already loaded. When
     * you require a module modname and package.loaded[modname] is not false,
     * require simply returns the value stored there.
     *
     * This variable is only a reference to the real table; assignments to this
     * variable do not change the table used by require.
     */
    const loaded: Record<string, any>;

    /**
     * Dynamically links the host program with the C library libname.
     *
     * If funcname is "*", then it only links with the library, making the symbols
     * exported by the library available to other dynamically linked libraries.
     * Otherwise, it looks for a function funcname inside the library and returns
     * this function as a C function. So, funcname must follow the lua_CFunction
     * prototype (see lua_CFunction).
     *
     * This is a low-level function. It completely bypasses the package and module
     * system. Unlike require, it does not perform any path searching and does not
     * automatically adds extensions. libname must be the complete file name of
     * the C library, including if necessary a path and an extension. funcname
     * must be the exact name exported by the C library (which may depend on the C
     * compiler and linker used).
     *
     * This function is not supported by Standard C. As such, it is only available
     * on some platforms (Windows, Linux, Mac OS X, Solaris, BSD, plus other Unix
     * systems that support the dlfcn standard).
     */
    function loadlib(
        libname: string,
        funcname: string
    ): [Function] | [undefined, string, 'open' | 'init'];

    /**
     * The path used by require to search for a Lua loader.
     *
     * At start-up, Lua initializes this variable with the value of the
     * environment variable LUA_PATH_5_3 or the environment variable LUA_PATH or
     * with a default path defined in luaconf.h, if those environment variables
     * are not defined. Any ";;" in the value of the environment variable is
     * replaced by the default path.
     */
    var path: string;

    /**
     * A table to store loaders for specific modules (see require).
     *
     * This variable is only a reference to the real table; assignments to this
     * variable do not change the table used by require.
     */
    const preload: Record<string, (modname: string, fileName?: string) => any>;

    /**
     * Searches for the given name in the given path.
     *
     * A path is a string containing a sequence of templates separated by
     * semicolons. For each template, the function replaces each interrogation
     * mark (if any) in the template with a copy of name wherein all occurrences
     * of sep (a dot, by default) were replaced by rep (the system's directory
     * separator, by default), and then tries to open the resulting file name.
     *
     * For instance, if the path is the string
     *
     * `./?.lua;./?.lc;/usr/local/?/init.lua`
     *
     * the search for the name foo.a will try to open the files ./foo/a.lua,
     * ./foo/a.lc, and /usr/local/foo/a/init.lua, in that order.
     *
     * Returns the resulting name of the first file that it can open in read mode
     * (after closing the file), or nil plus an error message if none succeeds.
     * (This error message lists all file names it tried to open.)
     */
    function searchpath(name: string, path: string, sep?: string, rep?: string): string;
}

declare namespace string {
    /**
     * Returns the internal numeric codes of the characters s[i], s[i+1], ...,
     * s[j]. The default value for i is 1; the default value for j is i. These
     * indices are corrected following the same rules of function string.sub.
     *
     * Numeric codes are not necessarily portable across platforms.
     */
    function byte(s: string, i?: number): number;
    function byte(s: string, i?: number, j?: number): LuaMultiReturn<number[]>;

    /**
     * Returns an iterator function that, each time it is called, returns the next
     * captures from pattern (see §6.4.1) over the string s. If pattern specifies
     * no captures, then the whole match is produced in each call.
     *
     * As an example, the following loop will iterate over all the words from
     * string s, printing one per line:
     *
     * ```
     * s = "hello world from Lua"
     * for w in string.gmatch(s, "%a+") do
     *   print(w)
     * end
     * ```
     *
     * The next example collects all pairs key=value from the given string into a
     * table:
     *
     * ```
     * t = {}
     * s = "from=world, to=Lua"
     * for k, v in string.gmatch(s, "(%w+)=(%w+)") do
     *   t[k] = v
     * end
     * ```
     *
     * For this function, a caret '^' at the start of a pattern does not work as
     * an anchor, as this would prevent the iteration.
     */
    function gmatch(s: string, pattern: string): LuaIterable<LuaMultiReturn<string[]>>;

    /**
     * Looks for the first match of pattern (see §6.4.1) in the string s. If it
     * finds one, then match returns the captures from the pattern; otherwise it
     * returns nil. If pattern specifies no captures, then the whole match is
     * returned. A third, optional numeric argument init specifies where to start
     * the search; its default value is 1 and can be negative.
     */
    function match(s: string, pattern: string, init?: number): LuaMultiReturn<string[]>;

    /**
     * Returns a string that is the string s reversed.
     */
    function reverse(s: string): string;
}
