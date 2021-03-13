import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

import { LuaTarget, Transpiler } from 'typescript-to-lua';

const targets = [
    LuaTarget.Lua51,
    LuaTarget.Lua52,
    LuaTarget.Lua53,
    LuaTarget.Lua54,
    LuaTarget.LuaJIT,
];

export function describeForEachLuaTarget(name: string, action: (luaTarget: LuaTarget) => void) {
    for (const target of targets)
        describe(`Lua version ${target} / ${name}`, () => {
            action(target);
        });
}

export function tstl(luaTarget: LuaTarget, input: string): string {
    // Resolve the path to the lua version delcaration file we want to test
    const typesPath = path.resolve(__dirname, `../${luaTarget.toLowerCase()}.d.ts`);
    const languageExtensionsPath = path.resolve(
        __dirname,
        `../node_modules/typescript-to-lua/language-extensions`
    );

    // Create a TS program containing input.ts and the declarations file to test
    const rootNames = ['input.ts', typesPath];
    const options = {
        luaTarget,
        skipLibCheck: true,
        lib: ['lib.esnext.d.ts'],
        noHeader: true,
        target: ts.ScriptTarget.ESNext,
        types: [languageExtensionsPath],
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
    };
    const compilerHost = getCompilerHostWithInput(input); // Create a compiler host that returns input for input.ts
    const program = ts.createProgram(rootNames, options, compilerHost);

    // Run TypeScriptToLua
    const outFiles: Array<{ fileName: string; fileContent: string }> = [];
    const { diagnostics: transpileDiagnostics } = new Transpiler().emit({
        program,
        writeFile: (fileName, fileContent) => outFiles.push({ fileName, fileContent }),
    });

    const diagnostics = ts.sortAndDeduplicateDiagnostics([
        ...ts.getPreEmitDiagnostics(program),
        ...transpileDiagnostics,
    ]);

    // Expect no diagnostics, either from TS or TSTL
    const diagnosticMessages = diagnostics.map((d) => d.messageText);
    expect(diagnosticMessages).toEqual([]);

    // Get the result from our input
    const outFile = outFiles.find((f) => f.fileName.endsWith('input.lua'));
    expect(outFile).toBeDefined();

    return outFile.fileContent.trim();
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
