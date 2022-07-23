/** @noSelfInFile */

declare namespace math {
    /**
     * Returns the arc tangent of x (in radians).
     */
    function atan(x: number): number;

    /**
     * Returns the arc tangent of y/x (in radians), but uses the signs of both
     * parameters to find the quadrant of the result. (It also handles correctly
     * the case of x being zero.)
     */
    function atan2(y: number, x: number): number;

    /**
     * Returns the hyperbolic cosine of x.
     */
    function cosh(x: number): number;

    /**
     * Returns m and e such that x = m2e, e is an integer and the absolute value
     * of m is in the range [0.5, 1) (or zero when x is zero).
     */
    function frexp(x: number): number;

    /**
     * Returns m2e (e should be an integer).
     */
    function ldexp(m: number, e: number): number;

    /**
     * Returns xy. (You can also use the expression x^y to compute this value.)
     */
    function pow(x: number, y: number): number;

    /**
     * Returns the hyperbolic sine of x.
     */
    function sinh(x: number): number;

    /**
     * Returns the hyperbolic tangent of x.
     */
    function tanh(x: number): number;
}
