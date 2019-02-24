/**
 * Loads a chunk.
 *
 * If chunk is a string, the chunk is this string. If chunk is a function, load calls it repeatedly to get the chunk pieces. Each call to chunk must return a string that concatenates with previous results. A return of an empty string, nil, or no value signals the end of the chunk.
 *
 * If there are no syntactic errors, returns the compiled chunk as a function; otherwise, returns nil plus the error message.
 *
 * If the resulting function has upvalues, the first upvalue is set to the value of env, if that parameter is given, or to the value of the global environment. Other upvalues are initialized with nil. (When you load a main chunk, the resulting function will always have exactly one upvalue, the _ENV variable (see §2.2). However, when you load a binary chunk created from a function (see string.dump), the resulting function can have an arbitrary number of upvalues.) All upvalues are fresh, that is, they are not shared with any other function.
 *
 * chunkname is used as the name of the chunk for error messages and debug information (see §4.9). When absent, it defaults to chunk, if chunk is a string, or to "=(load)" otherwise.
 *
 * The string mode controls whether the chunk can be text or binary (that is, a precompiled chunk). It may be the string "b" (only binary chunks), "t" (only text chunks), or "bt" (both binary and text). The default is "bt".
 *
 * Lua does not check the consistency of binary chunks. Maliciously crafted binary chunks can crash the interpreter.
 * @tupleReturn
 */
declare const loadstring: typeof load;
