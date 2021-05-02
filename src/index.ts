import fetch from 'isomorphic-fetch';

import { Dependencies, Options, AvailableTypes } from './types';

const TYPES_DIRECTORY_CDN = 'https://cdn.jsdelivr.net/gh/maddhruv/types-directory/directory.json';

const cache: { data: AvailableTypes | null } = {
  data: null,
};

const getTypes = async (): Promise<AvailableTypes> => {
  if (cache.data !== null) return cache.data;

  try {
    const response = await fetch(TYPES_DIRECTORY_CDN);
    const data = await response.json();
    cache.data = data;
    return data;
  } catch (error) {
    console.error('Please check your internet connection');
    throw new Error(error);
  }
};

const without = (source: Dependencies, destination: Dependencies): Dependencies =>
  source.filter(element => !destination.includes(element));

const intersection = (source: Dependencies, destination: Dependencies): Dependencies =>
  source.filter(element => destination.includes(element));

const typesSync = async (options?: Options) => {
  const dependencies = options?.dependencies || [];
  const devDependencies = options?.devDependencies || [];
  const ignored = options?.ignore || [];

  const allDependencies = Array.from(new Set([...dependencies, ...devDependencies]));

  const dependenciesAfterExclude = without(allDependencies, ignored);

  const installedTypes = devDependencies.filter(d => d.indexOf('@types/') === 0);

  const availableTypes = await getTypes();

  const depsTypes = without(
    installedTypes.map(t => t.slice(7)),
    ignored,
  );

  const typesToUninstall: Dependencies = without(depsTypes, dependenciesAfterExclude).map(
    t => `@types/${t}`,
  );

  const typesAvailable: Dependencies = intersection(
    dependenciesAfterExclude,
    availableTypes.types,
  ).map(t => `@types/${t}`);

  const typesToInstall: Dependencies = without(typesAvailable, installedTypes);

  return {
    install: typesToInstall,
    uninstall: typesToUninstall,
  };
};

export { typesSync, TYPES_DIRECTORY_CDN };

export default typesSync;
