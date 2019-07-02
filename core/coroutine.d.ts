// Based on https://www.lua.org/manual/5.3/manual.html#6.2

/** @noSelfInFile */

/**
 * This library comprises the operations to manipulate coroutines, which come
 * inside the table coroutine.
 */
declare namespace coroutine {
  /**
   * Creates a new coroutine, with body f. f must be a function. Returns this
   * new coroutine, an object with type "thread".
   */
  function create(f: (...args: any[]) => any): LuaThread;

  /**
   * Starts or continues the execution of coroutine co. The first time you
   * resume a coroutine, it starts running its body. The values val1, ... are
   * passed as the arguments to the body function. If the coroutine has yielded,
   * resume restarts it; the values val1, ... are passed as the results from the
   * yield.
   *
   * If the coroutine runs without any errors, resume returns true plus any
   * values passed to yield (when the coroutine yields) or any values returned
   * by the body function (when the coroutine terminates). If there is any
   * error, resume returns false plus the error message.
   * @tupleReturn
   */
  function resume(co: LuaThread, ...val: any[]): [true, ...any[]] | [false, string];

  /**
   * Returns the status of coroutine co, as a string: "running", if the
   * coroutine is running (that is, it called status); "suspended", if the
   * coroutine is suspended in a call to yield, or if it has not started running
   * yet; "normal" if the coroutine is active but not running (that is, it has
   * resumed another coroutine); and "dead" if the coroutine has finished its
   * body function, or if it has stopped with an error.
   */
  function status(co: LuaThread): 'running' | 'suspended' | 'normal' | 'dead';

  /**
   * Creates a new coroutine, with body f. f must be a function. Returns a
   * function that resumes the coroutine each time it is called. Any arguments
   * passed to the function behave as the extra arguments to resume. Returns the
   * same values returned by resume, except the first boolean. In case of error,
   * propagates the error.
   */
  function wrap(f: (...args: any[]) => any): /** @tupleReturn */ (...args: any[]) => any[];

  /**
   * Suspends the execution of the calling coroutine. Any arguments to yield are
   * passed as extra results to resume.
   * @tupleReturn
   */
  function yield(...args: any[]): any[];
}
