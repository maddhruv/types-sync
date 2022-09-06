#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const cosmiconfig = require('cosmiconfig');
const findUp = require('find-up');

const { typesSync } = require('../dist');

const explorer = cosmiconfig('types-sync');

(async () => {
  try {
    const { dependencies, devDependencies } = JSON.parse(
      fs.readFileSync(`${process.cwd()}/package.json`).toString(),
    );

    const cosmic = await explorer.search();

    const config = cosmic ? cosmic.config : {};

    const types = await typesSync({
      dependencies: [...Object.keys(dependencies || []), ...(config.dependencies || [])],
      devDependencies: Object.keys(devDependencies || []),
      ignore: [...(config.ignore || [])],
    });

    let agent = 'npm';
    if (!config.packageManager) {
      const LOCKS = {
        'pnpm-lock.yaml': 'pnpm',
        'yarn.lock': 'yarn',
        'package-lock.json': 'npm',
      };
      const result = await findUp(Object.keys(LOCKS));
      agent = result ? LOCKS[path.basename(result)] : 'npm';
    }
    const packageManager = config.packageManager || agent;

    let installer = 'npm i -D',
      uninstaller = 'npm uninstall';

    if (packageManager === 'yarn') {
      installer = 'yarn add -D';
      uninstaller = 'yarn remove';
    } else if (packageManager === 'pnpm') {
      installer = 'pnpm add -D';
      uninstaller = 'pnpm remove';
    } else if (packageManager === 'bolt') {
      installer = 'bolt add -D';
      uninstaller = 'bolt remove';
    }

    console.log(chalk.blue(`Using ${packageManager}`));

    if (types.install.length === 0) {
      console.log(chalk.yellow('No new typings to install'));
    } else {
      const installCMD = `${installer} ${types.install.join(' ')}`;
      console.log(chalk.green('Installing', types.install.join(', ')));
      console.log(execSync(installCMD).toString());
    }

    if (config.removeUnused) {
      if (types.uninstall.length === 0) {
        console.log(chalk.yellow('No unused typing to remove'));
      } else {
        const uninstallCMD = `${uninstaller} ${types.uninstall.join(' ')}`;
        console.log(chalk.green('Uninstalling', types.uninstall.join(', ')));
        console.log(execSync(uninstallCMD).toString());
      }
    }
  } catch (error) {
    throw new Error(error);
  }
})();
