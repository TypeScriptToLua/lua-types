import { LuaTarget } from 'typescript-to-lua';
import { describeForEachLuaTarget, tstl } from './test-utils';

describeForEachLuaTarget('io', (target) => {
    test('close', () => {
        const lua = tstl(
            target,
            `
            io.close();
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('close file', () => {
        const lua = tstl(
            target,
            `
            declare const file: LuaFile;
            io.close(file);
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('flush', () => {
        const lua = tstl(
            target,
            `
            io.flush();
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('input', () => {
        const lua = tstl(
            target,
            `
            const inp = io.input();
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('input with filename', () => {
        const lua = tstl(
            target,
            `
            const inp = io.input("foo.bar");
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('input with file handle', () => {
        const lua = tstl(
            target,
            `
            declare const file: LuaFile;
            const inp = io.input(file);
        `
        );

        expect(lua).toMatchSnapshot();
    });

    test('lines', () => {
        const lua = tstl(
            target,
            `
            for (const [line] of io.lines()) {
                print(line);
            }
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('lines with filename', () => {
        const lua = tstl(
            target,
            `
            for (const [line] of io.lines("foo.bar")) {
                print(line);
            }
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('open', () => {
        const lua = tstl(
            target,
            `
            const [f, err] = io.open("foo.bar");
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('open with mode flag', () => {
        const lua = tstl(
            target,
            `
            const [f, err] = io.open("foo.bar", "r");
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('output', () => {
        const lua = tstl(
            target,
            `
            const inp = io.output();
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('output with filename', () => {
        const lua = tstl(
            target,
            `
            const inp = io.output("foo.bar");
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('output with file handle', () => {
        const lua = tstl(
            target,
            `
            declare const file: LuaFile;
            const inp = io.output(file);
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('popen', () => {
        const lua = tstl(
            target,
            `
            const [proc, err] = io.popen("echo foobar");
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('read zero', () => {
        const lua = tstl(
            target,
            `
            const foo = io.read();
            declare function takesString(str: string): void;
            takesString(foo);
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('read one', () => {
        const useOldFormat =
            [LuaTarget.Lua51, LuaTarget.Lua52, LuaTarget.LuaJIT, LuaTarget.Universal].indexOf(
                target
            ) >= 0;
        const lineFormat = useOldFormat ? '*l' : 'l';
        const lua = tstl(
            target,
            `
            const foo = io.read("${lineFormat}");
            declare function takesString(str: string): void;
            takesString(foo);
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('read multi', () => {
        const useOldFormat =
            [LuaTarget.Lua51, LuaTarget.Lua52, LuaTarget.LuaJIT, LuaTarget.Universal].indexOf(
                target
            ) >= 0;
        const numberFormat = useOldFormat ? '*n' : 'n';
        const lineFormat = useOldFormat ? '*l' : 'l';
        const lua = tstl(
            target,
            `
            const [foo, bar] = io.read("${lineFormat}", "${numberFormat}");
            declare function takesString(str: string): void;
            declare function takesNumber(num: number): void;
            takesString(foo);
            takesNumber(bar);
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('stderr', () => {
        const lua = tstl(
            target,
            `
            io.stderr.write("foobar");
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('stdin', () => {
        const lua = tstl(
            target,
            `
            const input = io.stdin.read();
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('stdout', () => {
        const lua = tstl(
            target,
            `
            io.stdout.write("foobar");
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('tmpfile', () => {
        const lua = tstl(
            target,
            `
            const file = io.tmpfile();
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('type', () => {
        const lua = tstl(
            target,
            `
            declare const file: LuaFile;
            print(io.type(file));
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('write', () => {
        const lua = tstl(
            target,
            `
            const [f, err] = io.write("foobar");
            `
        );

        expect(lua).toMatchSnapshot();
    });
});

describeForEachLuaTarget('file', (target) => {
    test('close', () => {
        const lua = tstl(
            target,
            `
            declare const file: LuaFile;
            file.close();
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('flush', () => {
        const lua = tstl(
            target,
            `
            declare const file: LuaFile;
            file.flush();
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('lines', () => {
        const lua = tstl(
            target,
            `
            declare const file: LuaFile;
            for (const [line] of file.lines()) {
                print(line);
            }
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('read zero', () => {
        const lua = tstl(
            target,
            `
          declare const file: LuaFile;
          const foo = file.read();
          declare function takesString(str: string): void;
          takesString(foo);
          `
        );

        expect(lua).toMatchSnapshot();
    });

    test('read one', () => {
        const useOldFormat =
            [LuaTarget.Lua51, LuaTarget.Lua52, LuaTarget.LuaJIT, LuaTarget.Universal].indexOf(
                target
            ) >= 0;
        const lineFormat = useOldFormat ? '*l' : 'l';
        const lua = tstl(
            target,
            `
          declare const file: LuaFile;
          const foo = file.read("${lineFormat}");
          declare function takesString(str: string): void;
          takesString(foo);
          `
        );

        expect(lua).toMatchSnapshot();
    });

    test('read multi', () => {
        const useOldFormat =
            [LuaTarget.Lua51, LuaTarget.Lua52, LuaTarget.LuaJIT, LuaTarget.Universal].indexOf(
                target
            ) >= 0;
        const numberFormat = useOldFormat ? '*n' : 'n';
        const lineFormat = useOldFormat ? '*l' : 'l';
        const lua = tstl(
            target,
            `
          declare const file: LuaFile;
          const [foo, bar] = file.read("${lineFormat}", "${numberFormat}");
          declare function takesString(str: string): void;
          declare function takesNumber(num: number): void;
          takesString(foo);
          takesNumber(bar);
          `
        );

        expect(lua).toMatchSnapshot();
    });

    test('seek', () => {
        const lua = tstl(
            target,
            `
            declare const file: LuaFile;
            const [pos, err] = file.seek();
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('seek whence', () => {
        const lua = tstl(
            target,
            `
            declare const file: LuaFile;
            const [pos, err] = file.seek("cur");
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('seek offset', () => {
        const lua = tstl(
            target,
            `
            declare const file: LuaFile;
            const [pos, err] = file.seek("cur", 1);
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('setvbuf', () => {
        const lua = tstl(
            target,
            `
            declare const file: LuaFile;
            file.setvbuf("no");
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('setvbuf with size', () => {
        const lua = tstl(
            target,
            `
            declare const file: LuaFile;
            file.setvbuf("line", 10);
            `
        );

        expect(lua).toMatchSnapshot();
    });

    test('write', () => {
        const lua = tstl(
            target,
            `
            declare const file: LuaFile;
            const [f, err] = file.write("foo", "bar");
            `
        );

        expect(lua).toMatchSnapshot();
    });
});
