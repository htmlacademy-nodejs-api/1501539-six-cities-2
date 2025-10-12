#!/usr/bin/env node
import { Container } from 'inversify';
import { GenerateCommand } from './cli/commands/generate.command.js';
import { HelpCommand } from './cli/commands/help.command.js';
import { ImportCommand } from './cli/commands/import.command.js';
import { VersionCommand } from './cli/commands/version.command.js';
import { CliApp } from './cli/index.js';
import { createCliContainer } from './cli/cli.container.js';
import { Component } from './shared/types/component.enum.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createCommentContainer } from './shared/modules/comment/index.js';

const bootstrap = () => {
  const appContainer = new Container();
  createCliContainer(appContainer);
  createUserContainer(appContainer);
  createOfferContainer(appContainer);
  createCommentContainer(appContainer);

  const app = appContainer.get<CliApp>(Component.CliApplication);
  app.registerCommands([new HelpCommand(), appContainer.get<ImportCommand>(Component.ImportCommand), new VersionCommand(), new GenerateCommand()]);
  app.processCommand(process.argv);
};

bootstrap();
