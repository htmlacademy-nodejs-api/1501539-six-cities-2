import { injectable } from 'inversify';
import { CommandParser } from './command-parser.js';
import { Command } from './commands/command.interface.js';

type Commands = Record<string, Command>

@injectable()
export class CliApp {
  private readonly defaultCommandName = '--help';
  public commands: Commands = {};

  public registerCommands(commands: Command[]) {
    this.commands = commands.reduce((acc, currentCommand) => ({
      ...acc,
      [currentCommand.getName()]: currentCommand
    }), {});
  }

  public getCommand(commandName:string): Command | never {
    return this.commands[commandName] ?? this.commands[this.defaultCommandName];
  }

  public async processCommand(cliArguments: string[]) {
    const parsedCommand = CommandParser.parse(cliArguments);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    await command.execute(...commandArguments);
  }
}
