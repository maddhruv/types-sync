import { types } from 'types-directory';

import { Dependencies, Options } from './types';

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

  const depsTypes = without(
    installedTypes.map(t => t.slice(7)),
    ignored,
  );

  const typesToUninstall: Dependencies = without(depsTypes, dependenciesAfterExclude).map(
    t => `@types/${t}`,
  );

  const typesAvailable: Dependencies = intersection(dependenciesAfterExclude, types).map(
    t => `@types/${t}`,
  );

  const typesToInstall: Dependencies = without(typesAvailable, installedTypes);

  return {
    install: typesToInstall,
    uninstall: typesToUninstall,
  };
};

export { typesSync };

export default typesSync;
