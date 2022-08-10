// Based on https://www.lua.org/manual/5.0/manual.html#5.1

/** @noSelfInFile */

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
