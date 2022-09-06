import { typesSync } from '../src';

describe('Types Sync', () => {
  it('Test 1', async () => {
    const t = await typesSync({
      dependencies: ['lodash'],
    });
    expect(t).toEqual({ install: ['@types/lodash'], uninstall: [] });
  });

  it('Test 2', async () => {
    const t = await typesSync({
      dependencies: ['lodash', 'react'],
    });
    expect(t).toEqual({ install: ['@types/lodash', '@types/react'], uninstall: [] });
  });

  it('Test 3', async () => {
    const t = await typesSync({
      dependencies: ['lodash', 'react'],
      devDependencies: ['@types/react'],
    });
    expect(t).toEqual({ install: ['@types/lodash'], uninstall: [] });
  });

  it('Test 4', async () => {
    const t = await typesSync({
      dependencies: ['lodash', 'react'],
      devDependencies: ['@types/lodash', '@types/react'],
    });
    expect(t).toEqual({ install: [], uninstall: [] });
  });

  it('Test 5', async () => {
    const t = await typesSync({
      dependencies: ['lodash', 'react'],
      devDependencies: ['@types/lodash', '@types/react', '@types/node'],
    });
    expect(t).toEqual({ install: [], uninstall: ['@types/node'] });
  });

  it('Test 6', async () => {
    const t = await typesSync({
      dependencies: [],
      devDependencies: ['@types/lodash', '@types/react', '@types/node'],
    });
    expect(t).toEqual({ install: [], uninstall: ['@types/lodash', '@types/react', '@types/node'] });
  });

  it('Test 7', async () => {
    const t = await typesSync({
      dependencies: [],
      devDependencies: ['@types/lodash', '@types/react', '@types/node'],
      ignore: ['node'],
    });
    expect(t).toEqual({ install: [], uninstall: ['@types/lodash', '@types/react'] });
  });

  it('Test 8', async () => {
    const t = await typesSync({
      dependencies: ['some-package-that-doesnt-exist'],
      devDependencies: [],
      ignore: [],
    });
    expect(t).toEqual({ install: [], uninstall: [] });
  });
});
