import { describeForEachLuaTarget, tstl } from "./test-utils";

describeForEachLuaTarget("table", target => {

    test("table.concat", () => {
        const lua = tstl(target, `
            const myTable = [1, 2, 3];
            table.concat(myTable, ",", 0, myTable.length);
        `);

        expect(lua).toMatchSnapshot();
    });

    test("table.insert", () => {
        const lua = tstl(target, `
            const myTable = [1, 2, 3];
            table.insert(myTable, 4);
        `);

        expect(lua).toMatchSnapshot();
    });

    test("table.insert at position", () => {
        const lua = tstl(target, `
            const myTable = [1, 2, 3];
            table.insert(myTable, 1, 4);
        `);

        expect(lua).toMatchSnapshot();
    });

    test("table.remove", () => {
        const lua = tstl(target, `
            const myTable = [1, 2, 3];
            table.remove(myTable, 2);
        `);

        expect(lua).toMatchSnapshot();
    });

    test("table.sort", () => {
        const lua = tstl(target, `
            const myTable = [1, 2, 3];
            table.sort(myTable, (a, b) => a < b);
        `);

        expect(lua).toMatchSnapshot();
    });
});
