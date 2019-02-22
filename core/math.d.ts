// Based on https://www.lua.org/manual/5.3/manual.html#6.7


/**
 * This library provides basic mathematical functions. It provides all its functions and constants inside the table math. Functions with the annotation "integer/float" give integer results for integer arguments and float results for float (or mixed) arguments. Rounding functions (math.ceil, math.floor, and math.modf) return an integer when the result fits in the range of an integer, or a float otherwise.
 */
declare namespace math {
  /**
   * Returns the absolute value of x. (integer/float)
   */
  function abs(x: number): number;

  /**
   * Returns the arc cosine of x (in radians).
   */
  function acos(x: number): number;

  /**
   * Returns the arc sine of x (in radians).
   */
  function asin(x: number): number;

  /**
   * Returns the arc tangent of y/x (in radians), but uses the signs of both parameters to find the quadrant of the result. (It also handles correctly the case of x being zero.)
   *
   * The default value for x is 1, so that the call math.atan(y) returns the arc tangent of y.
   */
  function atan(y: number, x?: number): number;

  /**
   * Returns the arc tangent of y/x (in radians), but uses the signs of both parameters to find the quadrant of the result. (It also handles correctly the case of x being zero.)
   */
  function atan2(y: number, x: number): number;

  /**   * Returns the smallest integral value larger than or equal to x.
   */
  function ceil(x: number): number;

  /**
   * Returns the cosine of x (assumed to be in radians).
   */
  function cos(x: number): number;

  /**
   * Returns the hyperbolic cosine of x.
   */
  function cosh(x: number): number;

  /**
   * Converts the angle x from radians to degrees.
   */
  function deg(x: number): number;

  /**
   * Returns the value ex (where e is the base of natural logarithms).
   */
  function exp(x: number): number;

  /**
   * Returns the largest integral value smaller than or equal to x.
   */
  function floor(x: number): number;

  /**
   * Returns the remainder of the division of x by y that rounds the quotient towards zero. (integer/float)
   */
  function fmod(x: number, y: number): number;

  /**
   * Returns m and e such that x = m2e, e is an integer and the absolute value of m is in the range [0.5, 1) (or zero when x is zero).
   */
  function frexp(x: number): number;

  /**
   * The float value HUGE_VAL, a value larger than any other numeric value.
   */
  const huge: number;

  /**
   * Returns m2e (e should be an integer).
   */
  function ldexp(m: number, e: number): number;

  /**
   * Returns the logarithm of x in the given base. The default for base is e (so that the function returns the natural logarithm of x).
   */
  function log(x: number, base?: number): number;

  /**
   * Returns the base-10 logarithm of x.
   */
  function log10(x: number): number;

  /**
   * Returns the argument with the maximum value, according to the Lua operator <. (integer/float)
   */
  function max(x: number, ...numbers: number[]): number;

  /**
   * Returns the argument with the minimum value, according to the Lua operator <. (integer/float)
   */
  function min(x: number, ...numbers: number[]): number;

  /**
   * Returns the integral part of x and the fractional part of x. Its second result is always a float.
   */
  function modf(x: number): number;

  /**
   * The value of π.
   */
  const pi: number;

  /**
   * Returns x ^ y
   */
  function pow(x: number, y: number): number;

  /**
   * Converts the angle x from degrees to radians.
   */
  function rad(x: number): number;

  /**
   * This function is an interface to the simple pseudo-random generator function rand provided by ANSI C. (No guarantees can be given for its statistical properties.)
   * When called without arguments, returns a uniform pseudo-random real number in the range [0,1). When called with an integer number m, math.random returns a uniform pseudo-random integer in the range [1, m]. When called with two integer numbers m and n, math.random returns a uniform pseudo-random integer in the range [m, n].
   */
  function random(m?: number, n?: number): number;

  /**
   * Sets x as the "seed" for the pseudo-random generator: equal seeds produce equal sequences of numbers.
   */
  function randomseed(x: number): number;

  /**
   * Returns the sine of x (assumed to be in radians).
   */
  function sin(x: number): number;

  /**
   * Returns the hyperbolic sine of x.
   */
  function sinh(x: number): number;

  /**
   * Returns the square root of x. (You can also use the expression x^0.5 to compute this value.)
   */
  function sqrt(x: number): number;

  /**
   * Returns the tangent of x (assumed to be in radians).
   */
  function tan(x: number): number;

  /**
   * Returns the hyperbolic tangent of x.
   */
  function tanh(x: number): number;

  /**
   * If the value x is convertible to an integer, returns that integer. Otherwise, returns nil.
   */
  function tointeger(x: number): number;

  /**
   * Returns "integer" if x is an integer, "float" if it is a float, or nil if x is not a number.
   */
  function type(x: number): 'integer' | 'float' | null;

  /**
   * Returns a boolean, true if and only if integer m is below integer n when they are compared as unsigned integers.
   */
  function ult(m: number, n: number): boolean;
}
