// Commands

import { Command, CommandError } from './Command';

import {
  isDefined,
  isFullStr,
  isSubclass,
  isUndefined,
  isPromise,
} from '@megaorm/test';
import { VersionCommand } from './commands/VersionCommand';
import { NewCommand } from './commands/NewCommand';

/**
 * Type representing an array of registered commands.
 * Each entry contains the command name and the corresponding command class.
 *
 * @property `name` The name of the command.
 * @property `command` The command class that extends Command.
 */
type Commands = Array<{ name: string; command: typeof Command }>;

const commands: Commands = [
  { name: 'new', command: NewCommand },
  { name: '-v', command: VersionCommand },
];

/**
 * Registers a command under a specific name. If the name is already registered or the command is invalid, an error is thrown.
 *
 * @param name The name of the command.
 * @param command The `Command` subclass.
 * @throws `CommandError` if the name is invalid, the command class is not a subclass of `Command`, or if the name already exists.
 */
export function register(name: string, command: typeof Command) {
  if (!isSubclass(command, Command)) {
    throw new CommandError(`Invalid command: ${String(command)}`);
  }

  if (!isFullStr(name)) {
    throw new CommandError(`Invalid command name: ${String(name)}`);
  }

  const cmd = commands.find((command) => command.name === name);

  if (isDefined(cmd)) {
    throw new CommandError(`Deplicated command names: ${name}`);
  }

  commands.push({ name, command });
}

/**
 * Executes the command associated with the argument passed from the command line.
 *
 * @returns A promise that resolves when the command finishes execution, or rejects with an error.
 * @throws `CommandError`if the command name is undefined, the command is unknown, or the `exec` method is invalid.
 */
export function execute(): Promise<void> {
  return new Promise((resolve, reject) => {
    const name = process.argv[2];

    if (isUndefined(name)) {
      return reject(new CommandError('Undefined command name'));
    }

    const command = commands.find((cmd) => cmd.name === name)?.command;

    if (isUndefined(command)) {
      return reject(new CommandError(`Unknown command: ${name}`));
    }

    const value = command.exec();

    if (!isPromise(value)) return resolve(value as void);

    return (value as Promise<void>).then(resolve).catch(reject);
  });
}
