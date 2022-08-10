// Based on https://www.lua.org/manual/5.0/manual.html#5.4

/** @noSelfInFile */

/**
 * This library provides generic functions for table manipulation. It provides
 * all its functions inside the table table.
 *
 * Remember that, whenever an operation needs the length of a table, all caveats
 * about the length operator apply (see §3.4.7). All functions ignore
 * non-numeric keys in the tables given as arguments.
 */
declare namespace table {
    /**
     * Given a list where all elements are strings or numbers, returns the string
     * list[i]..sep..list[i+1] ··· sep..list[j]. The default value for sep is the
     * empty string, the default for i is 1, and the default for j is #list. If i
     * is greater than j, returns the empty string.
     */
    function concat(list: (string | number)[], sep?: string, i?: number, j?: number): string;

    /**
     * Executes the given f over all elements of table. For each element, f is
     * called with the index and respective value as arguments. If f returns a
     * non-nil value, then the loop is broken, and this value is returned as the
     * final value of foreach.
     *
     * See the next function for extra information about table traversals.
     */
    function foreach(table: object, f: (index: any, value: any) => any): any;

    /**
     * Executes the given f over the numerical indices of table. For each index,
     * f is called with the index and respective value as arguments. Indices are
     * visited in sequential order, from 1 to n, where n is the size of the
     * table (see 5.4). If f returns a non-nil value, then the loop is broken
     * and this value is returned as the result of foreachi.
     */
    function foreachi(table: object, f: (index: number, value: any) => any): any;

    /**
     * Returns the size of a table, when seen as a list. If the table has an n
     * field with a numeric value, this value is the size of the table.
     * Otherwise, if there was a previous call to table.setn over this table,
     * the respective value is returned. Otherwise, the size is one less the
     * first integer index with a nil value.
     */
    function getn(table: object): number;

    /**
     * Inserts element value at position pos in list, shifting up the elements
     * list[pos], list[pos+1], ···, list[#list]. The default value for pos is
     * #list+1, so that a call table.insert(t,x) inserts x at the end of list t.
     */
    function insert<T>(list: T[], value: T): void;
    function insert<T>(list: T[], pos: number, value: T): void;

    /**
     * Removes from list the element at position pos, returning the value of the
     * removed element. When pos is an integer between 1 and #list, it shifts down
     * the elements list[pos+1], list[pos+2], ···, list[#list] and erases element
     * list[#list]; The index pos can also be 0 when #list is 0, or #list + 1; in
     * those cases, the function erases the element list[pos].
     *
     * The default value for pos is #list, so that a call table.remove(l) removes
     * the last element of list l.
     */
    function remove<T>(list: T[], pos?: number): T | undefined;

    /**
     * Updates the size of a table. If the table has a field "n" with a
     * numerical value, that value is changed to the given n. Otherwise, it
     * updates an internal state so that subsequent calls to table.getn(table)
     * return n.
     */
    function setn(table: object, n: number): void;

    /**
     * Sorts list elements in a given order, in-place, from list[1] to
     * list[#list]. If comp is given, then it must be a function that receives two
     * list elements and returns true when the first element must come before the
     * second in the final order (so that, after the sort, i < j implies not
     * comp(list[j],list[i])). If comp is not given, then the standard Lua
     * operator < is used instead.
     *
     * Note that the comp function must define a strict partial order over the
     * elements in the list; that is, it must be asymmetric and transitive.
     * Otherwise, no valid sort may be possible.
     *
     * The sort algorithm is not stable: elements considered equal by the given
     * order may have their relative positions changed by the sort.
     */
    function sort<T>(list: T[], comp?: (a: T, b: T) => boolean): void;
}
