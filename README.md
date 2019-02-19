# Lua Types

[![npm](https://img.shields.io/npm/v/types-lua.svg)](https://npmjs.com/package/types-lua)
[![Travis](https://img.shields.io/travis/ark120202/types-lua.svg)](https://travis-ci.org/ark120202/types-lua)

> TypeScript definitions for Lua standard library.

## Installation

> NOTE: In most of cases your environment-specific types would already include this package.
> In that case you don't need to do anything. If you're a developer of such types you should add
> `types-lua` as a dependency and load it by adding `/// <reference types="types-lua/VERSION" />`

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

* `5.1`
* `5.2`
* `5.3`
* `5.4`
* `jit`
