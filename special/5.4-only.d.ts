/** @noSelfInFile */

declare namespace math {
    /**
     * When called without arguments, returns a pseudo-random float with uniform
     * distribution in the range [0,1). When called with two integers m and n,
     * math.random returns a pseudo-random integer with uniform distribution in
     * the range [m, n]. The call math.random(n), for a positive n, is equivalent
     * to math.random(1,n). The call math.random(0) produces an integer with all
     * bits (pseudo)random.
     *
     * Lua initializes its pseudo-random generator with a weak attempt for
     * "randomness", so that math.random should generate different sequences of
     * results each time the program runs. To ensure a required level of
     * randomness to the initial state (or contrarily, to have a deterministic
     * sequence, for instance when debugging a program), you should call
     * math.randomseed explicitly.
     *
     * The results from this function have good statistical qualities, but they
     * are not cryptographically secure. (For instance, there are no garanties
     * that it is hard to predict future results based on the observation of some
     * number of previous results.)
     */
    function random(m?: number, n?: number): number;

    /**
     * Sets x and y as the "seed" for the pseudo-random generator: equal seeds
     * produce equal sequences of numbers. The default for y is zero.
     */
    function randomseed(x: number, y?: number): number;
}
