
declare namespace math {
  /**
   * Returns the arc tangent of y/x (in radians), but uses the signs of both parameters to find the quadrant of the result. (It also handles correctly the case of x being zero.)
   */
  function atan2(y: number, x: number): number;

  /**
   * Returns the hyperbolic cosine of x.
   */
  function cosh(x: number): number;

  /**
   * Returns m and e such that x = m2e, e is an integer and the absolute value of m is in the range [0.5, 1) (or zero when x is zero).
   */
  function frexp(x: number): number;

  /**
   * Returns m2e (e should be an integer).
   */
  function ldexp(m: number, e: number): number;

  /**
   * Returns the base-10 logarithm of x.
   */
  function log10(x: number): number;

  /**
   * Returns x ^ y
   */
  function pow(x: number, y: number): number;

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
   * Returns the hyperbolic sine of x.
   */
  function sinh(x: number): number;

  /**
   * Returns the hyperbolic tangent of x.
   */
  function tanh(x: number): number;
}