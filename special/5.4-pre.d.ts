/** @noSelfInFile */

declare namespace math {
    /**
     * When called without arguments, returns a pseudo-random float with uniform
     * distribution in the range [0,1). When called with two integers m and n,
     * math.random returns a pseudo-random integer with uniform distribution in
     * the range [m, n]. (The value n-m cannot be negative and must fit in a Lua
     * integer.) The call math.random(n) is equivalent to math.random(1,n).
     *
     * This function is an interface to the underling pseudo-random generator
     * function provided by C.
     */
    function random(m?: number, n?: number): number;

    /**
     * Sets x as the "seed" for the pseudo-random generator: equal seeds produce
     * equal sequences of numbers.
     */
    function randomseed(x: number): number;
}
