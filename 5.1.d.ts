import './core';

/**
 * A global variable (not a function) that holds a string containing the running Lua version.
 */
declare const _VERSION: 'Lua 5.1';

/**
 * This function is a generic interface to the garbage collector. It performs different functions according to its first argument, opt.
 *
 * Returns the total memory in use by Lua in Kbytes. The value has a fractional part, so that it multiplied by 1024 gives the exact number of bytes in use by Lua (except for overflows).
 */
declare function collectgarbage(opt: 'count'): number;

/**
 * Loads a chunk using function func to get its pieces. Each call to func must return a string that concatenates with previous results. A return of an empty string, nil, or no value signals the end of the chunk.
 *
 * If there are no errors, returns the compiled chunk as a function; otherwise, returns nil plus the error message. The environment of the returned function is the global environment.
 *
 * chunkname is used as the chunk name for error messages and debug information. When absent, it defaults to "=(load)".
 * @tupleReturn
 */
declare function load(
  func: () => string | null | undefined,
  chunkname?: string,
): () => any | [null, string];

/**
 * Similar to load, but gets the chunk from file filename or from the standard input, if no file name is given.
 * @tupleReturn
 */
declare function loadfile(filename?: string): () => any | [null, string];

/**
 * Similar to load, but gets the chunk from the given string.
 *
 * To load and run a given string, use the idiom
 *
 * `assert(loadstring(s))()`
 *
 * When absent, chunkname defaults to the given string.
 * @tupleReturn
 */
declare function loadstring(string: string, chunkname?: string): () => any | [null, string];

/**
 * Returns the elements from the given list. This function is equivalent to
 *
 * `return list[i], list[i+1], ···, list[j]`
 *
 * except that the above code can be written only for a fixed number of elements. By default, i is 1 and j is the length of the list, as defined by the length operator (see §2.5.5).
 * @tupleReturn
 */
declare function unpack(list: any[], i?: number, j?: number): any[];

/**
 * This function is similar to pcall, except that it sets a new message handler msgh.
 *
 * xpcall calls function f in protected mode, using err as the error handler. Any error inside f is not propagated; instead, xpcall catches the error, calls the err function with the original error object, and returns a status code. Its first result is the status code (a boolean), which is true if the call succeeds without errors. In this case, xpcall also returns all results from the call, after this first result. In case of any error, xpcall returns false plus the result from err.
 */
declare function xpcall(f: () => any, err: () => any): true | [false, string];

/**
 * Returns the current environment in use by the function. f can be a Lua function or a number that specifies the function at that stack level: Level 1 is the function calling getfenv. If the given function is not a Lua function, or if f is 0, getfenv returns the global environment. The default for f is 1.
 */
declare function getfenv(f?: Function | number): typeof _G | table;

/**
 * Sets the environment to be used by the given function. f can be a Lua function or a number that specifies the function at that stack level: Level 1 is the function calling setfenv. setfenv returns the given function.
 *
 * As a special case, when f is 0 setfenv changes the environment of the running thread. In this case, setfenv returns no values.
 */
declare function setfenv<T extends Function>(f: T, table: table): T;
declare function setfenv(f: 0, table: table): Function;
declare function setfenv(f: number, table: table): void;

declare namespace debug {
  /**
   * Returns the environment of object o.
   */
  function getfenv(o: object): table;

  /**
   * Sets the environment of the given object to the given table. Returns object.
   */
  function setfenv<T extends object>(o: T, table: table): T;
}

declare namespace package {
  /**
   * A table used by require to control how to load modules.
   *
   * Each entry in this table is a searcher function. When looking for a module, require calls each of these searchers in ascending order, with the module name (the argument given to require) as its sole parameter. The function can return another function (the module loader) plus an extra value that will be passed to that loader, or a string explaining why it did not find that module (or nil if it has nothing to say).
   *
   * Lua initializes this table with four searcher functions.
   *
   * The first searcher simply looks for a loader in the package.preload table.
   *
   * The second searcher looks for a loader as a Lua library, using the path stored at package.path. The search is done as described in function package.searchpath.
   *
   * The third searcher looks for a loader as a C library, using the path given by the variable package.cpath. Again, the search is done as described in function package.searchpath. For instance, if the C path is the string
   *
   * `./?.so;./?.dll;/usr/local/?/init.so`
   *
   * the searcher for module foo will try to open the files ./foo.so, ./foo.dll, and /usr/local/foo/init.so, in that order. Once it finds a C library, this searcher first uses a dynamic link facility to link the application with the library. Then it tries to find a C function inside the library to be used as the loader. The name of this C function is the string "luaopen_" concatenated with a copy of the module name where each dot is replaced by an underscore. Moreover, if the module name has a hyphen, its suffix after (and including) the first hyphen is removed. For instance, if the module name is a.b.c-v2.1, the function name will be luaopen_a_b_c.
   *
   * The fourth searcher tries an all-in-one loader. It searches the C path for a library for the root name of the given module. For instance, when requiring a.b.c, it will search for a C library for a. If found, it looks into it for an open function for the submodule; in our example, that would be luaopen_a_b_c. With this facility, a package can pack several C submodules into one single library, with each submodule keeping its original open function.
   */
  var loaders: table;
}

declare namespace os {
  /**
   * Calls the C function exit, with an optional code, to terminate the host program. The default value for code is the success code.
   */
  function exit(code?: number): never;

  /**
   * This function is equivalent to the C function system. It passes command to be executed by an operating system shell. It returns a status code, which is system-dependent. If command is absent, then it returns nonzero if a shell is available and zero otherwise.
   * @tupleReturn
   */
  function execute(): number;
}

declare namespace math {
  /**
   * Returns the base-10 logarithm of x.
   */
  function log10(x: number): number;
}

declare namespace table {
  /**
   * Returns the largest positive numerical index of the given table, or zero if the table has no positive numerical indices. (To do its job this function does a linear traversal of the whole table.)
   */
  function maxn(table: table): number;
}
