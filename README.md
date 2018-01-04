# Lua Types

[![Travis](https://img.shields.io/npm/v/lua-types.svg)](https://npmjs.com/package/lua-types)
[![Travis](https://img.shields.io/travis/ark120202/lua-types.svg)](https://travis-ci.org/ark120202/lua-types)

TypeScript definitions for Lua 5.3 standard library.

## Installation

1. Get Lua Types from npm

```bash
yarn add -D lua-types
# or
npm install -D lua-types
```

2. Modify your `tsconfig.json`

```json
{
  "compilerOptions": {
    "typeRoots": ["@types", "node_modules/lua-types/types"]
  },
  "include": ["src/**/*.ts"]
}
```
