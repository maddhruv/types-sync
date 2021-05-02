# types-sync

Keep your types in sync with DefinitelyTyped - auto install/uninstall types for dependencies on
postinstall.

## Features

- Works with `npm`, `yarn`, `pnpm`, `bolt`
- In sync with [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
- Can be hooked with npm and husky hooks

## Install

`npm install -D types-sync`

## Usage

### As CLI

Use `types-sync` as `postinstall` or `prebuild` scripts in your _package.json_

```js
"scripts": {
  "postinstall": "types-sync-types",
}
```

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

Add a `.typesSyncrc.json` at the root of your project.

| options        | type                       | description                             |
| -------------- | -------------------------- | --------------------------------------- |
| dependencies   | `Array`                    | dependencies to manually add for sync   |
| ignore         | `Array`                    | ignore these dependencies from removing |
| packageManager | `npm`/`yarn`/`pnpm`/`bolt` | package manager to use                  |
