/** @noSelfInFile */

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Returns the total memory in use by Lua (in Kbytes) and a second value with
 * the total memory in bytes modulo 1024. The first value has a fractional part,
 * so the following equality is always true:
 *
 * ```
 * k, b = collectgarbage("count")
 * assert(k*1024 == math.floor(k)*1024 + b)
 * ```
 */
declare function collectgarbage(opt: 'count'): [number, number];

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Changes the collector to generational mode. This is an experimental feature
 * (see §2.5).
 */
declare function collectgarbage(opt: 'generational'): void;

/**
 * This function is a generic interface to the garbage collector. It performs
 * different functions according to its first argument, opt.
 *
 * Changes the collector to incremental mode. This is the default mode.
 */
declare function collectgarbage(opt: 'incremental'): void;

/**
 * This library provides bitwise operations. It provides all its functions
 * inside the table bit32.
 *
 * Unless otherwise stated, all functions accept numeric arguments in the range
 * (-251,+251); each argument is normalized to the remainder of its division by
 * 232 and truncated to an integer (in some unspecified way), so that its final
 * value falls in the range [0,232 - 1]. Similarly, all results are in the range
 * [0,232 - 1]. Note that bit32.bnot(0) is 0xFFFFFFFF, which is different from
 * -1.
 */
declare namespace bit32 {
    /**
     * Returns the number x shifted disp bits to the right. The number disp may be
     * any representable integer. Negative displacements shift to the left.
     *
     * This shift operation is what is called arithmetic shift. Vacant bits on the
     * left are filled with copies of the higher bit of x; vacant bits on the
     * right are filled with zeros. In particular, displacements with absolute
     * values higher than 31 result in zero or 0xFFFFFFFF (all original bits are
     * shifted out).
     */
    function arshift(x: number, disp: number): number;

    /**
     * Returns the bitwise and of its operands.
     */
    function band(...operands: number[]): number;

    /**
     * Returns the bitwise negation of x. For any integer x, the following
     * identity holds:
     *
     * `assert(bit32.bnot(x) == (-1 - x) % 2^32)`
     */
    function bnot(x: number): number;

    /**
     * Returns the bitwise or of its operands.
     */
    function bor(...operands: number[]): number;

    /**
     * Returns a boolean signaling whether the bitwise and of its operands is
     * different from zero.
     */
    function btest(...operands: number[]): boolean;

    /**
     * Returns the bitwise exclusive or of its operands.
     */
    function bxor(...operands: number[]): number;

    /**
     * Returns the unsigned number formed by the bits field to field + width - 1
     * from n. Bits are numbered from 0 (least significant) to 31 (most
     * significant). All accessed bits must be in the range [0, 31].
     *
     * The default for width is 1.
     */
    function extract(n: number, field: number, width?: number): number;

    /**
     * Returns a copy of n with the bits field to field + width - 1 replaced by
     * the value v. See bit32.extract for details about field and width.
     */
    function replace(n: number, v: number, field: number, width?: number): number;

    /**
     * Returns the number x rotated disp bits to the left. The number disp may be
     * any representable integer.
     *
     * For any valid displacement, the following identity holds:
     *
     * `assert(bit32.lrotate(x, disp) == bit32.lrotate(x, disp % 32))`
     *
     * In particular, negative displacements rotate to the right.
     */
    function lrotate(x: number, disp: number): number;

    /**
     *  Returns the number x shifted disp bits to the left. The number disp may be
     *  any representable integer. Negative displacements shift to the right. In
     *  any direction, vacant bits are filled with zeros. In particular,
     *  displacements with absolute values higher than 31 result in zero (all bits
     *  are shifted out).
     *
     *  For positive displacements, the following equality holds:
     *
     *  `assert(bit32.lshift(b, disp) == (b * 2^disp) % 2^32)`
     */
    function lshift(x: number, disp: number): number;

    /**
     * Returns the number x rotated disp bits to the right. The number disp may be
     * any representable integer.
     *
     * For any valid displacement, the following identity holds:
     *
     * `assert(bit32.rrotate(x, disp) == bit32.rrotate(x, disp % 32))`
     *
     * In particular, negative displacements rotate to the left.
     */
    function rrotate(x: number, disp: number): number;

    /**
     * Returns the number x shifted disp bits to the right. The number disp may be
     * any representable integer. Negative displacements shift to the left. In any
     * direction, vacant bits are filled with zeros. In particular, displacements
     * with absolute values higher than 31 result in zero (all bits are shifted
     * out).
     *
     * For positive displacements, the following equality holds:
     *
     * `assert(bit32.rshift(b, disp) == math.floor(b % 2^32 / 2^disp))`
     *
     * This shift operation is what is called logical shift.
     */
    function rshift(x: number, disp: number): number;
}
