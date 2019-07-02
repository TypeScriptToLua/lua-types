// Based on https://www.lua.org/manual/5.3/manual.html#6.3

/** @noSelfInFile */

/**
 * Loads the given module. The function starts by looking into the
 * package.loaded table to determine whether modname is already loaded. If it
 * is, then require returns the value stored at package.loaded[modname].
 * Otherwise, it tries to find a loader for the module.
 *
 * To find a loader, require is guided by the package.searchers sequence. By
 * changing this sequence, we can change how require looks for a module. The
 * following explanation is based on the default configuration for
 * package.searchers.
 *
 * First require queries package.preload[modname]. If it has a value, this value
 * (which must be a function) is the loader. Otherwise require searches for a
 * Lua loader using the path stored in package.path. If that also fails, it
 * searches for a C loader using the path stored in package.cpath. If that also
 * fails, it tries an all-in-one loader (see package.searchers).
 *
 * Once a loader is found, require calls the loader with two arguments: modname
 * and an extra value dependent on how it got the loader. (If the loader came
 * from a file, this extra value is the file name.) If the loader returns any
 * non-nil value, require assigns the returned value to package.loaded[modname].
 * If the loader does not return a non-nil value and has not assigned any value
 * to package.loaded[modname], then require assigns true to this entry. In any
 * case, require returns the final value of package.loaded[modname].
 *
 * If there is any error loading or running the module, or if it cannot find any
 * loader for the module, then require raises an error.
 */
declare function require(modname: string): any;

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
    funcname: string,
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
