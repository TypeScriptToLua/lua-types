import { describeForEachLuaTarget, tstl } from './test-utils';

describeForEachLuaTarget('string', (target) => {
    test('string.byte', () => {
        const lua = tstl(
            target,
            `
            const b = string.byte("d");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.byte multiple', () => {
        const lua = tstl(
            target,
            `
            const [a, b, c, d] = string.byte("abcd", 1, 4);
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.char', () => {
        const lua = tstl(
            target,
            `
            const str = string.char(64, 65, 66);
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.dump', () => {
        const lua = tstl(
            target,
            `
            const str = string.dump(() => 5);
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.find', () => {
        const lua = tstl(
            target,
            `
            const result = string.find("abc", "b");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.find destructure', () => {
        const lua = tstl(
            target,
            `
            const [start, end, matchString] = string.find("abc", "b");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.find destructure', () => {
        const lua = tstl(
            target,
            `
            const [start, end, matchString, matchString2] = string.find("abc", "b", 5, false);
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.format', () => {
        const lua = tstl(
            target,
            `
            const str = string.format('%q', 'a string with "quotes" and \\n new line');
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.gmatch', () => {
        const lua = tstl(
            target,
            `
            const s = "hello world from Lua";
            for (const [w] of string.gmatch(s, "%a+")) {
                print(w)
            }
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.gmatch destructure', () => {
        const lua = tstl(
            target,
            `
            const s = "from=world, to=Lua";
            for (const [k, v] of string.gmatch(s, "(%w+)=(%w+)")) {
                print(k, v)
            }
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.gsub string', () => {
        const lua = tstl(
            target,
            `
            const result = string.gsub("hello world", "l", "R");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.gsub string destructured', () => {
        const lua = tstl(
            target,
            `
            const [result, numOccurrences] = string.gsub("hello world", "l", "R");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.gsub table', () => {
        const lua = tstl(
            target,
            `
            const result = string.gsub("hello world", "l", {l: "R"});
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.gsub function', () => {
        const lua = tstl(
            target,
            `
            const result = string.gsub("hello world", "l", (match: string) => "R");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.match', () => {
        const lua = tstl(
            target,
            `
            const result = string.match("hello world", "l");
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('string.match destructured', () => {
        const lua = tstl(
            target,
            `
            const [match1, match2] = string.match("hello world", "l");
        `
        );

        expect(lua).toMatchSnapshot();
    });
});
