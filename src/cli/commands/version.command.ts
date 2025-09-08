import chalk from 'chalk';
import { Command } from './command.interface.js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const isPackageJson = (file: {version: string}) => typeof file === 'object' && file !== null && !Array.isArray(file) && file.version;

export class VersionCommand implements Command {
  constructor (private readonly packageJsonPath: string = './package.json') {}

  public getName() {
    return '--version';
  }

  private getVersion() {
    const packageJson = readFileSync(resolve(this.packageJsonPath), { encoding: 'utf-8' });
    try {
      const parsedPackageJson = JSON.parse(packageJson);
      if (isPackageJson(parsedPackageJson)) {
        return parsedPackageJson.version;
      } else {
        throw new Error('Версия не задана');
      }
    } catch {
      throw new Error(`Invalid json file in ${this.packageJsonPath}`);
    }
  }

  public async execute(..._parameters: string[]): Promise<void> {
    const version = this.getVersion();
    console.log(chalk.blue(version));
  }
}
