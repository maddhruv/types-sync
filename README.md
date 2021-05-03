# types-sync

Keep your types in sync with DefinitelyTyped - auto install/uninstall types for dependencies on
postinstall.

[![npm version](https://badge.fury.io/js/types-sync.svg)](https://www.npmjs.com/package/types-sync)
[![CI](https://github.com/maddhruv/types-sync/actions/workflows/main.yml/badge.svg)](https://github.com/maddhruv/types-sync/actions/workflows/main.yml)

## Features

- Works with `npm`, `yarn`, `pnpm`, `bolt`
- In sync with [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
- Can be hooked with npm and husky hooks

## Install

`npm install -D types-sync`

## Usage

### As CLI

Use `types-sync` as `prepare` or `prebuild` scripts in your _package.json_

```js
"scripts": {
  "prepare": "types-sync",
}
```

Note: use `types-sync` as the `prepare` script so that it only runs in the local environment.

### As Module

```ts
import typesSync from 'types-sync';

const types = typesSync({
  dependencies,
  devDependencies,
  ignore,
});
```

## Config

Add a `.types-syncrc.json` at the root of your project.

| options        | type                       | description                             |
| -------------- | -------------------------- | --------------------------------------- |
| dependencies   | `Array`                    | dependencies to manually add for sync   |
| ignore         | `Array`                    | ignore these dependencies from removing |
| packageManager | `npm`/`yarn`/`pnpm`/`bolt` | package manager to use                  |
