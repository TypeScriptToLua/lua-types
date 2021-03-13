# Lua Types

[![npm](https://img.shields.io/npm/v/lua-types.svg)](https://npmjs.com/package/lua-types) [![Travis](https://img.shields.io/travis/ark120202/lua-types.svg)](https://travis-ci.org/ark120202/lua-types)

> TypeScript definitions for Lua standard library

## Installation

> NOTE: In most of cases your environment-specific types would already include this package. In that case you don't need to do anything. If you're a developer of such types you should add `lua-types` as a dependency and load it by adding `/// <reference types="lua-types/<version>" />`

1. Get this package from npm

```bash
yarn add -D lua-types
# or
npm install -D lua-types
```

2. Modify your `tsconfig.json`

```diff
{
  "compilerOptions": {
+    "types": ["lua-types/<version>"]
  }
}
```

Where `<version>` is one of:

-   `5.1`
-   `5.2`
-   `5.3`
-   `5.4`
-   `jit`

> NOTE: All other files in this module shouldn't be considered public. Do not import them manually, as they may change in non-major updates. If your environment doesn't provide all of standard Lua features, consider banning them with a [no-restricted-globals](https://eslint.org/docs/rules/no-restricted-globals) eslint rule.
