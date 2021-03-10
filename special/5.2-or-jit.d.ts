//@ts-expect-error Every Lua version has its own FileReadFormat defined, causing a name conflict that we can ignore since the user will only use one Lua version
type FileReadFormat = '*n' | '*a' | '*l' | '*L' | number;
