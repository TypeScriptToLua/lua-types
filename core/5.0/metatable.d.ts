// Based on https://www.lua.org/manual/5.0/manual.html#2.8

interface LuaMetatable<
    T,
    TIndex extends object | ((this: T, key: any) => any) | undefined =
        | object
        | ((this: T, key: any) => any)
        | undefined
> {
    /**
     * the addition (+) operation. If any operand for an addition is not a number
     * (nor a string coercible to a number), Lua will try to call a metamethod.
     * First, Lua will check the first operand (even if it is valid). If that
     * operand does not define a metamethod for __add, then Lua will check the
     * second operand. If Lua can find a metamethod, it calls the metamethod with
     * the two operands as arguments, and the result of the call (adjusted to one
     * value) is the result of the operation. Otherwise, it raises an error.
     */
    __add?(this: T, operand: any): any;

    /**
     * the subtraction (-) operation. Behavior similar to the addition operation.
     */
    __sub?(this: T, operand: any): any;

    /**
     * the multiplication (*) operation. Behavior similar to the addition
     * operation.
     */
    __mul?(this: T, operand: any): any;

    /**
     * the division (/) operation. Behavior similar to the addition operation.
     */
    __div?(this: T, operand: any): any;

    /**
     * the exponentiation (^) operation. Behavior similar to the addition
     * operation.
     */
    __pow?(this: T, operand: any): any;

    /**
     * the negation (unary -) operation. Behavior similar to the addition
     * operation.
     */
    __unm?(this: T, operand: any): any;

    /**
     * the concatenation (..) operation. Behavior similar to the addition
     * operation, except that Lua will try a metamethod if any operand is neither
     * a string nor a number (which is always coercible to a string).
     */
    __concat?(this: T, operand: any): any;

    /**
     * the equal (==) operation. Behavior similar to the addition operation,
     * except that Lua will try a metamethod only when the values being compared
     * are either both tables or both full userdata and they are not primitively
     * equal. The result of the call is always converted to a boolean.
     */
    __eq?(this: T, operand: any): boolean;

    /**
     * the less than (<) operation. Behavior similar to the addition operation,
     * except that Lua will try a metamethod only when the values being compared
     * are neither both numbers nor both strings. The result of the call is always
     * converted to a boolean.
     */
    __lt?(this: T, operand: any): boolean;

    /**
     * the less equal (<=) operation. Unlike other operations, the less-equal
     * operation can use two different events. First, Lua looks for the __le
     * metamethod in both operands, like in the less than operation. If it cannot
     * find such a metamethod, then it will try the __lt metamethod, assuming that
     * a <= b is equivalent to not (b < a). As with the other comparison
     * operators, the result is always a boolean. (This use of the __lt event can
     * be removed in future versions; it is also slower than a real __le
     * metamethod.)
     */
    __le?(this: T, operand: any): boolean;

    /**
     * The indexing access table[key]. This event happens when table is not a
     * table or when key is not present in table. The metamethod is looked up in
     * table.
     *
     * Despite the name, the metamethod for this event can be either a function or
     * a table. If it is a function, it is called with table and key as arguments,
     * and the result of the call (adjusted to one value) is the result of the
     * operation. If it is a table, the final result is the result of indexing
     * this table with key. (This indexing is regular, not raw, and therefore can
     * trigger another metamethod.)
     */
    __index?: TIndex;

    /**
     * The indexing assignment table[key] = value. Like the index event, this
     * event happens when table is not a table or when key is not present in
     * table. The metamethod is looked up in table.
     *
     * Like with indexing, the metamethod for this event can be either a function
     * or a table. If it is a function, it is called with table, key, and value as
     * arguments. If it is a table, Lua does an indexing assignment to this table
     * with the same key and value. (This assignment is regular, not raw, and
     * therefore can trigger another metamethod.)
     *
     * Whenever there is a __newindex metamethod, Lua does not perform the
     * primitive assignment. (If necessary, the metamethod itself can call rawset
     * to do the assignment.)
     */
    __newindex?: object | ((this: T, key: any, value: any) => void);

    /**
     * The call operation func(args). This event happens when Lua tries to call a
     * non-function value (that is, func is not a function). The metamethod is
     * looked up in func. If present, the metamethod is called with func as its
     * first argument, followed by the arguments of the original call (args). All
     * results of the call are the result of the operation. (This is the only
     * metamethod that allows multiple results.)
     */
    __call?(this: T, ...args: any[]): any;

    /**
     * If the metatable of v has a __tostring field, then tostring calls the
     * corresponding value with v as argument, and uses the result of the call as
     * its result.
     */
    __tostring?(this: T): string;

    /**
     * If this field is a string containing the character 'k', the keys in the
     * table are weak. If it contains 'v', the values in the table are weak.
     */
    __mode?: 'k' | 'v' | 'kv';

    /**
     * If the object's metatable has this field, `getmetatable` returns the
     * associated value.
     */
    __metatable?: any;

    /**
     * Userdata finalizer code. When userdata is set to be garbage collected, if
     * the metatable has a __gc field pointing to a function, that function is
     * first invoked, passing the userdata to it. The __gc metamethod is not
     * called for tables.
     */
    __gc?(this: T): void;
}
