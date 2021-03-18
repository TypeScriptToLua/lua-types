/** @noSelfInFile */

/**
 * Loads a chunk.
 *
 * If chunk is a string, the chunk is this string. If chunk is a function, load
 * calls it repeatedly to get the chunk pieces. Each call to chunk must return a
 * string that concatenates with previous results. A return of an empty string,
 * nil, or no value signals the end of the chunk.
 *
 * If there are no syntactic errors, returns the compiled chunk as a function;
 * otherwise, returns nil plus the error message.
 *
 * If the resulting function has upvalues, the first upvalue is set to the value
 * of env, if that parameter is given, or to the value of the global
 * environment. Other upvalues are initialized with nil. (When you load a main
 * chunk, the resulting function will always have exactly one upvalue, the _ENV
 * variable (see §2.2). However, when you load a binary chunk created from a
 * function (see string.dump), the resulting function can have an arbitrary
 * number of upvalues.) All upvalues are fresh, that is, they are not shared
 * with any other function.
 *
 * chunkname is used as the name of the chunk for error messages and debug
 * information (see §4.9). When absent, it defaults to chunk, if chunk is a
 * string, or to "=(load)" otherwise.
 *
 * The string mode controls whether the chunk can be text or binary (that is, a
 * precompiled chunk). It may be the string "b" (only binary chunks), "t" (only
 * text chunks), or "bt" (both binary and text). The default is "bt".
 *
 * Lua does not check the consistency of binary chunks. Maliciously crafted
 * binary chunks can crash the interpreter.
 */
declare function loadstring(
    chunk: string | (() => string | null | undefined),
    chunkname?: string,
    mode?: 'b' | 't' | 'bt',
    env?: object
): LuaMultiReturn<[() => any] | [undefined, string]>;

declare namespace bit {
    /**
     * Normalizes a number to the numeric range for bit operations and returns it.
     * This function is usually not needed since all bit operations already
     * normalize all of their input arguments. Check the operational semantics for
     * details.
     */
    function tobit(x: number): number;

    /**
     * Converts its first argument to a hex string. The number of hex digits is
     * given by the absolute value of the optional second argument. Positive
     * numbers between 1 and 8 generate lowercase hex digits. Negative numbers
     * generate uppercase hex digits. Only the least-significant 4*|n| bits are
     * used. The default is to generate 8 lowercase hex digits.
     */
    function tohex(x: number, n?: number): string;

    /**
     * Returns the bitwise not of its argument.
     */
    function bnot(x: number): number;

    /**
     * Returns the bitwise or of all of its arguments.
     */
    function bor(x: number, ...rest: number[]): number;
    /**
     * Returns the bitwise and of all of its arguments.
     */
    function band(x: number, ...rest: number[]): number;
    /**
     * Returns the bitwise xor of all of its arguments.
     */
    function bxor(x: number, ...rest: number[]): number;

    /**
     * Returns the (bitwise logical left-shift, bitwise logical right-shift,
     * bitwise arithmetic right-shift) of its first argument by the number of bits
     * given by the second argument.
     *
     * Logical shifts treat the first argument as an unsigned number and shift in
     * 0-bits. Arithmetic right-shift treats the most-significant bit as a sign
     * bit and replicates it.
     *
     * Only the lower 5 bits of the shift count are used (reduces to the range
     * [0..31]).
     */
    function lshift(x: number, n: number): number;
    /**
     * Returns the (bitwise logical left-shift, bitwise logical right-shift,
     * bitwise arithmetic right-shift) of its first argument by the number of bits
     * given by the second argument.
     *
     * Logical shifts treat the first argument as an unsigned number and shift in
     * 0-bits. Arithmetic right-shift treats the most-significant bit as a sign
     * bit and replicates it.
     *
     * Only the lower 5 bits of the shift count are used (reduces to the range
     * [0..31]).
     */
    function rshift(x: number, n: number): number;
    /**
     * Returns the (bitwise logical left-shift, bitwise logical right-shift,
     * bitwise arithmetic right-shift) of its first argument by the number of bits
     * given by the second argument.
     *
     * Logical shifts treat the first argument as an unsigned number and shift in
     * 0-bits. Arithmetic right-shift treats the most-significant bit as a sign
     * bit and replicates it.
     *
     * Only the lower 5 bits of the shift count are used (reduces to the range
     * [0..31]).
     */
    function arshift(x: number, n: number): number;

    /**
     * Returns bitwise left rotation of its first argument by the number of bits
     * given by the second argument. Bits shifted out on one side are shifted back
     * in on the other side.
     *
     * Only the lower 5 bits of the rotate count are used (reduces to the range
     * [0..31]).
     */
    function rol(x: number, n: number): number;

    /**
     * Returns bitwise right rotation of its first argument by the number of bits
     * given by the second argument. Bits shifted out on one side are shifted back
     * in on the other side.
     *
     * Only the lower 5 bits of the rotate count are used (reduces to the range
     * [0..31]).
     */
    function ror(x: number, n: number): number;

    /**
     * Swaps the bytes of its argument and returns it. This can be used to convert
     * little-endian 32 bit numbers to big-endian 32 bit numbers or vice versa
     */
    function bswap(x: number): number;
}

declare namespace ffi {
    /**
     * Adds multiple C declarations for types or external symbols (named variables
     * or functions). def must be a Lua string. It's recommended to use the
     * syntactic sugar for string arguments as follows:
     *
     * The contents of the string must be a sequence of C declarations, separated
     * by semicolons. The trailing semicolon for a single declaration may be
     * omitted.
     *
     * Please note that external symbols are only declared, but they are not bound
     * to any specific address, yet. Binding is achieved with C library namespaces
     * (see below).
     *
     * C declarations are not passed through a C pre-processor, yet. No
     * pre-processor tokens are allowed, except for #pragma pack. Replace #define
     * in existing C header files with enum, static const or typedef and/or pass
     * the files through an external C pre-processor (once). Be careful not to
     * include unneeded or redundant declarations from unrelated header files.
     */
    function cdef(defs: string): void;

    /**
     * This is the default C library namespace — note the uppercase 'C'. It binds
     * to the default set of symbols or libraries on the target system. These are
     * more or less the same as a C compiler would offer by default, without
     * specifying extra link libraries.
     *
     * On POSIX systems, this binds to symbols in the default or global namespace.
     * This includes all exported symbols from the executable and any libraries
     * loaded into the global namespace. This includes at least libc, libm, libdl
     * (on Linux), libgcc (if compiled with GCC), as well as any exported symbols
     * from the Lua/C API provided by LuaJIT itself.
     *
     * On Windows systems, this binds to symbols exported from the *.exe, the
     * lua51.dll (i.e. the Lua/C API provided by LuaJIT itself), the C runtime
     * library LuaJIT was linked with (msvcrt*.dll), kernel32.dll, user32.dll and
     * gdi32.dll.
     */
    const C: Record<string, any>;

    /**
     * This loads the dynamic library given by name and returns a new C library
     * namespace which binds to its symbols. On POSIX systems, if global is true,
     * the library symbols are loaded into the global namespace, too.
     *
     * If name is a path, the library is loaded from this path. Otherwise name is
     * canonicalized in a system-dependent way and searched in the default search
     * path for dynamic libraries:
     *
     * On POSIX systems, if the name contains no dot, the extension .so is
     * appended. Also, the lib prefix is prepended if necessary. So ffi.load("z")
     * looks for "libz.so" in the default shared library search path.
     *
     * On Windows systems, if the name contains no dot, the extension .dll is
     * appended. So ffi.load("ws2_32") looks for "ws2_32.dll" in the default DLL
     * search path.
     */
    function load(name: string, global?: boolean): any;

    // TODO: http://luajit.org/ext_ffi_api.html
}

declare namespace jit {
    /**
     * Turns the whole JIT compiler on (default).
     *
     * This function is typically used with the command line option -j on.
     */
    function on(): void;

    /**
     * Turns the whole JIT compiler off.
     *
     * This function is typically used with the command line option -j off.
     */
    function off(): void;

    /**
     * Flushes the whole cache of compiled code.
     */
    function flush(): void;

    /**
     * Enables JIT compilation for a Lua function (this is the default).
     *
     * The current function, i.e. the Lua function calling this library function,
     * can also be specified by passing true as the first argument.
     *
     * If the second argument is true, JIT compilation is also enabled, disabled
     * or flushed recursively for all sub-functions of a function. With false only
     * the sub-functions are affected.
     *
     * This function only sets a flag which is checked when the function is about
     * to be compiled. It does not trigger immediate compilation.
     */
    function on(func: Function | true, recursive?: boolean): void;

    /**
     * Disables JIT compilation for a Lua function and flushes any already
     * compiled code from the code cache.
     *
     * The current function, i.e. the Lua function calling this library function,
     * can also be specified by passing true as the first argument.
     *
     * If the second argument is true, JIT compilation is also enabled, disabled
     * or flushed recursively for all sub-functions of a function. With false only
     * the sub-functions are affected.
     *
     * This function only sets a flag which is checked when the function is about
     * to be compiled. It does not trigger immediate compilation.
     */
    function off(func: Function | true, recursive?: boolean): void;

    /**
     * Flushes the code, but doesn't affect the enable/disable status.
     *
     * The current function, i.e. the Lua function calling this library function,
     * can also be specified by passing true as the first argument.
     *
     * If the second argument is true, JIT compilation is also enabled, disabled
     * or flushed recursively for all sub-functions of a function. With false only
     * the sub-functions are affected.
     */
    function flush(func: Function | true, recursive?: boolean): void;

    /**
     * Flushes the root trace, specified by its number, and all of its side traces
     * from the cache. The code for the trace will be retained as long as there
     * are any other traces which link to it.
     */
    function flush(tr: number): void;

    /**
     * Returns the current status of the JIT compiler. The first result is either
     * true or false if the JIT compiler is turned on or off. The remaining
     * results are strings for CPU-specific features and enabled optimizations.
     */
    function status(): LuaMultiReturn<[boolean, ...string[]]>;

    /**
     * Contains the LuaJIT version string.
     */
    const version: string;

    /**
     * Contains the version number of the LuaJIT core. Version xx.yy.zz is
     * represented by the decimal number xxyyzz.
     */
    const version_num: number;

    /**
     * Contains the target OS name.
     */
    const os: 'Windows' | 'Linux' | 'OSX' | 'BSD' | 'POSIX' | 'Other';

    /**
     * Contains the target architecture name.
     */
    const arch: 'x86' | 'x64' | 'arm' | 'ppc' | 'ppcspe' | 'mips';

    /**
     * This sub-module provides the backend for the -O command line option.
     *
     * You can also use it programmatically, e.g.:
     *
     * ```
     * jit.opt.start(2) -- same as -O2
     * jit.opt.start("-dce")
     * jit.opt.start("hotloop=10", "hotexit=2")
     * ```
     *
     * Unlike in LuaJIT 1.x, the module is built-in and optimization is turned on
     * by default! It's no longer necessary to run require("jit.opt").start(),
     * which was one of the ways to enable optimization.
     */
    const opt: any;

    /**
     * This sub-module holds functions to introspect the bytecode, generated
     * traces, the IR and the generated machine code. The functionality provided
     * by this module is still in flux and therefore undocumented.
     *
     * The debug modules -jbc, -jv and -jdump make extensive use of these
     * functions. Please check out their source code, if you want to know more.
     */
    const util: any;
}
