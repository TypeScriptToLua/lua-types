import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

import { LuaTarget, transpile } from 'typescript-to-lua';

const targets = [LuaTarget.Lua51, LuaTarget.Lua52, LuaTarget.Lua53, LuaTarget.LuaJIT];

export function describeForEachLuaTarget(name: string, action: (luaTarget: LuaTarget) => void) {
    for (const target of targets)
        describe(`Lua version ${target} / ${name}`, () => {
            action(target);
        });
}

export function tstl(luaTarget: LuaTarget, input: string): string {
    // Resolve the path to the lua version delcaration file we want to test
    const typesPath = path.resolve(__dirname, `../${luaTarget.toLowerCase()}.d.ts`);

    // Create a TS program containing input.ts and the declarations file to test
    const rootNames = ['input.ts', typesPath];
    const options = { luaTarget, noHeader: true, target: ts.ScriptTarget.ESNext };
    const compilerHost = getCompilerHostWithInput(input); // Create a compiler host that returns input for input.ts
    const program = ts.createProgram(rootNames, options, compilerHost);

    // Run TypeScriptToLua
    const result = transpile({ program });

    // Expect no diagnostics, either from TS or TSTL
    const diagnostics = [...ts.getPreEmitDiagnostics(program), ...result.diagnostics];
    const diagnosticMessages = diagnostics.map((d) => d.messageText);
    expect(diagnosticMessages).toEqual([]);

    // Get the result from our input
    const testFile = result.transpiledFiles.find((f) => f.fileName === 'input.ts');
    expect(testFile).toBeDefined();

    //return result.file.lua;
    return testFile.lua.trim();
}

const fileCache: Record<string, string> = {};

// Create a compiler host that simply reads files from disk, except for "input.ts", for which it returns its input parameter.
function getCompilerHostWithInput(input: string) {
    return {
        fileExists: () => true,
        getCanonicalFileName: (fileName) => fileName,
        getCurrentDirectory: () => '',
        getDefaultLibFileName: ts.getDefaultLibFileName,
        readFile: () => '',
        getNewLine: () => '\n',
        useCaseSensitiveFileNames: () => false,
        writeFile() {},

        getSourceFile(fileName, languageVersion) {
            if (fileName === 'input.ts') {
                return ts.createSourceFile(fileName, input, languageVersion);
            }

            if (fileCache[fileName]) {
                return ts.createSourceFile(fileName, fileCache[fileName], languageVersion);
            }

            let filePath = fileName;

            if (fileName.startsWith('lib.')) {
                const typeScriptDir = path.dirname(require.resolve('typescript'));
                filePath = path.join(typeScriptDir, fileName);
            }

            const fileContent = fs.readFileSync(filePath).toString();
            fileCache[fileName] = fileContent;
            return ts.createSourceFile(fileName, fileContent, languageVersion);
        },
    };
}
