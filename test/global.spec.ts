import { describeForEachLuaTarget, tstl } from './test-utils';

describeForEachLuaTarget('global', (target) => {
    test('assert', () => {
        const lua = tstl(
            target,
            `
            assert({ bla: "not false"});
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('assert with return', () => {
        const lua = tstl(
            target,
            `
            const v = assert({ bla: "not false"});
            const bla = v.bla;
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('assert with multi-return', () => {
        const lua = tstl(
            target,
            `
            const [v, a, b] = assert({ bla: "not false"}, { foo: "FOO" }, { bar: "BAR" });
            const bla = v.bla;
            const foo = a.foo;
            const bar = b.bar;
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('assert', () => {
        const lua = tstl(
            target,
            `
            assert(false, "assert message");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('getmetatable', () => {
        const lua = tstl(
            target,
            `
            const metatable = getmetatable({});
            const add = metatable!.__add;
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('getmetatable on string', () => {
        const lua = tstl(
            target,
            `
            const metatable = getmetatable("foo");
            const index = metatable!.__index;
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('ipairs', () => {
        const lua = tstl(
            target,
            `
            for (const [i, v] of ipairs([1, 2, 3])) {
                print(i, v);
            }
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('next', () => {
        const lua = tstl(
            target,
            `
            const [nextKey, nextValue] = next({});
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('next with previous index', () => {
        const lua = tstl(
            target,
            `
            const [nextKey, nextValue] = next({ a: "b", c: "d" }, "a");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('pairs', () => {
        const lua = tstl(
            target,
            `
            for (const [k, v] of pairs({ foo: "bar", baz: "bur" })) {
                print(k, v);
            }
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('pairs with LuaTable', () => {
        const lua = tstl(
            target,
            `
            const tbl = new LuaTable<string, string>();
            tbl.set("foo", "bar");
            tbl.set("baz", "bur");
            const takesStr = (str: string) => {};
            for (const [k, v] of pairs(tbl)) {
                takesStr(k);
                takesStr(v);
            }
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('pcall', () => {
        const lua = tstl(
            target,
            `
            const [success, resultOrMessage] = pcall((a: number) => true, 3);
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('pcall with context', () => {
        const lua = tstl(
            target,
            `
            const [success, resultOrMessage] = pcall((a: number) => true, {}, 3);
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('rawget', () => {
        const lua = tstl(
            target,
            `
            const value = rawget({ foo: "bar" }, "foo");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('select', () => {
        const lua = tstl(
            target,
            `
            const values = select(2, "a", "b", "c");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('select destructured', () => {
        const lua = tstl(
            target,
            `
            const [b, c] = select(2, "a", "b", "c");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('select with #', () => {
        const lua = tstl(
            target,
            `
            const count = select("#", "a", "b", "c");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('setmetatable with table index', () => {
        const lua = tstl(
            target,
            `
            const tbl = setmetatable({}, {__index: {foo: "bar"}});
            const takesStr = (s: string) => {};
            takesStr(tbl.foo);
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('setmetatable with function index', () => {
        const lua = tstl(
            target,
            `
            const tbl = setmetatable({}, {__index: (key: string) => key + "bar"});
            const takesStr = (s: string) => {};
            takesStr(tbl.foo);
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('setmetatable with no index', () => {
        const lua = tstl(
            target,
            `
            const tbl = setmetatable({});
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('tonumber', () => {
        const lua = tstl(
            target,
            `
            const number = tonumber("213.4");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('tonumber with base', () => {
        const lua = tstl(
            target,
            `
            const number = tonumber("213.4", 5);
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('tostring', () => {
        const lua = tstl(
            target,
            `
            const str = tostring(213.4);
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('type', () => {
        const lua = tstl(
            target,
            `
            const t = type(213.4);
        `
        );

        expect(lua).toMatchSnapshot();
    });
});
