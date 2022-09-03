/// <reference path="../../5.4.d.ts" />
const mytable = new LuaMap<string, number>();

for (const [k, v] of pairs(mytable)) {
}

function multiReturn(): LuaMultiReturn<[string, number, string]> {
    return $multi('3', 5, '6');
}
