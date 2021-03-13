// Based on https://www.lua.org/manual/5.3/manual.html#6.7

/** @noSelfInFile */

/**
 * This library provides basic mathematical functions. It provides all its
 * functions and constants inside the table math. Functions with the annotation
 * "integer/float" give integer results for integer arguments and float results
 * for float (or mixed) arguments. Rounding functions (math.ceil, math.floor,
 * and math.modf) return an integer when the result fits in the range of an
 * integer, or a float otherwise.
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
     * Returns the smallest integral value larger than or equal to x.
     */
    function ceil(x: number): number;

    /**
     * Returns the cosine of x (assumed to be in radians).
     */
    function cos(x: number): number;

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
     * Returns the remainder of the division of x by y that rounds the quotient
     * towards zero. (integer/float)
     */
    function fmod(x: number, y: number): number;

    /**
     * The float value HUGE_VAL, a value larger than any other numeric value.
     */
    const huge: number;

    /**
     * Returns the argument with the maximum value, according to the Lua operator
     * <. (integer/float)
     */
    function max(x: number, ...numbers: number[]): number;

    /**
     * Returns the argument with the minimum value, according to the Lua operator
     * <. (integer/float)
     */
    function min(x: number, ...numbers: number[]): number;

    /**
     * Returns the integral part of x and the fractional part of x. Its second
     * result is always a float.
     */
    function modf(x: number): LuaMultiReturn<[number, number]>;

    /**
     * The value of π.
     */
    const pi: number;

    /**
     * Converts the angle x from degrees to radians.
     */
    function rad(x: number): number;

    /**
     * Returns the sine of x (assumed to be in radians).
     */
    function sin(x: number): number;

    /**
     * Returns the square root of x. (You can also use the expression x^0.5 to
     * compute this value.)
     */
    function sqrt(x: number): number;

    /**
     * Returns the tangent of x (assumed to be in radians).
     */
    function tan(x: number): number;
}
