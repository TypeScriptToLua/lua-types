# Lua Types

[![npm](https://img.shields.io/npm/v/lua-types.svg)](https://npmjs.com/package/lua-types)
[![Travis](https://img.shields.io/travis/ark120202/lua-types.svg)](https://travis-ci.org/ark120202/lua-types)

> TypeScript definitions for Lua standard library

## Installation

> NOTE: In most of cases your environment-specific types would already include this package. In that
> case you don't need to do anything. If you're a developer of such types you should add `lua-types`
> as a dependency and load it by adding `/// <reference types="lua-types/VERSION" />`

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
    "types": ["lua-types/VERSION"]
  }
}
```

Currently supported values of `VERSION` are:

- `5.1`
- `5.2`
- `5.3`
- `5.4`
- `jit`

## Loading only a subset of features

Some Lua environments are sandboxed and don't have some globals declared, like `io`, `os` and
`debug`. To avoid registering these globals, you can import core files separately. For example:

```json
{
  "compilerOptions": {
    "types": [
      "lua-types/core/coroutine",
      "lua-types/core/global",
      "lua-types/core/math",
      "lua-types/core/metatable",
      "lua-types/core/modules",
      "lua-types/core/string",
      "lua-types/core/table",
      "lua-types/special/jit"
    ]
  }
}
```
