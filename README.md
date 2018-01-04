# Types Lua

[![npm](https://img.shields.io/npm/v/types-lua.svg)](https://npmjs.com/package/types-lua)
[![Travis](https://img.shields.io/travis/ark120202/types-lua.svg)](https://travis-ci.org/ark120202/types-lua)

TypeScript definitions for Lua 5.3 standard library.

## Installation

1. Get Lua Types from npm

```bash
yarn add -D types-lua
# or
npm install -D types-lua
```

2. Modify your `tsconfig.json`

```json
{
  "compilerOptions": {
    "typeRoots": ["@types", "node_modules/types-lua/types"]
  },
  "include": ["src/**/*.ts"]
}
```
