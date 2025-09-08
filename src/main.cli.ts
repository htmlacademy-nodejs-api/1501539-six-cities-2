#!/usr/bin/env node
import { HelpCommand } from './cli/commands/help.command.js';
import { ImportCommand } from './cli/commands/import.command.js';
import { VersionCommand } from './cli/commands/version.command.js';
import { CliApp } from './cli/index.js';

const bootstrap = () => {
  const app = new CliApp();
  app.registerCommands([new HelpCommand(), new ImportCommand(), new VersionCommand()]);
  app.processCommand(process.argv);
};

bootstrap();
