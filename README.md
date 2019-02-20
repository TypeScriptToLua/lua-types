# Lua Types

[![npm](https://img.shields.io/npm/v/types-lua.svg)](https://npmjs.com/package/types-lua)
[![Travis](https://img.shields.io/travis/ark120202/types-lua.svg)](https://travis-ci.org/ark120202/types-lua)

> TypeScript definitions for Lua standard library

## Installation

> NOTE: In most of cases your environment-specific types would already include this package. In that
> case you don't need to do anything. If you're a developer of such types you should add `types-lua`
> as a dependency and load it by adding `/// <reference types="types-lua/VERSION" />`

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
    "types": ["types-lua/VERSION"]
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
`debug`. To avoid registering these globals you should look at the version-specific file at the root
of this package and loaded each of it's dependencies separately. For example

```json
{
  "compilerOptions": {
    "types": [
      "types-lua/core/coroutine",
      "types-lua/core/debug",
      "types-lua/core/global",
      "types-lua/core/math",
      "types-lua/core/metatable",
      "types-lua/core/modules",
      "types-lua/core/string",
      "types-lua/core/table",
      "types-lua/special/5.1-only",
      "types-lua/special/jit-only"
    ]
  }
}
```
