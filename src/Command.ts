import { isDefined, isUndefined, isObj, isStr } from '@megaorm/test';

/**
 * Represents a parsed parameter with a key (name) and its type (required, optional, or option).
 *
 * @property `key` The name of the parameter (e.g., 'name', 'male').
 * @property `type` The type of the parameter (e.g., '!', '?', '-').
 */
type Parameters = Array<{ key: string; type: string }>;

/**
 * Represents a parsed argument with a key (name) and its associated value (string).
 *
 * @property `key` The name of the argument (e.g., 'name', 'male').
 * @property `value` The value of the argument (e.g., 'John', 'true').
 */
type Arguments = Array<{ key: string; value: string }>;

/**
 * Represents a parsed option with a key (name) and its associated value (boolean).
 *
 * @property `key` The name of the option (e.g., 'verbose').
 * @property `value` The value of the option (true or false).
 */
type Options = Array<string>;

/**
 * The result of validating command arguments, consisting of parsed arguments and options.
 *
 * @property `arguments` An array of parsed arguments.
 * @property `options` An array of parsed options.
 */
type Result = {
  arguments: Record<string, string>;
  options: Record<string, boolean>;
};

/**
 * Formats a message in red (error).
 * @param message - The message to format.
 * @returns The formatted message with ANSI escape codes.
 */
export function red(message: string): string {
  return `\x1b[31m${message}\x1b[0m`; // Red
}

/**
 * Formats a message in green (success/info).
 * @param message - The message to format.
 * @returns The formatted message with ANSI escape codes.
 */
export function green(message: string): string {
  return `\x1b[32m${message}\x1b[0m`; // Green
}

/**
 * Formats a message in blue (info).
 * @param message - The message to format.
 * @returns The formatted message with ANSI escape codes.
 */
export function blue(message: string): string {
  return `\x1b[36m${message}\x1b[0m`; // Cyan
}

/**
 * Formats a message in orange (warning).
 * @param message - The message to format.
 * @returns The formatted message with ANSI escape codes.
 */
export function orange(message: string): string {
  return `\x1b[33m${message}\x1b[0m`; // Yellow (ANSI lacks true orange)
}

/**
 * Logs a formatted error message with details.
 * Includes the error type, message, and stack trace.
 *
 * @param error - The error object to log.
 */
export function bugger(error: Error): void {
  console.log(red('\n  ❌  ERROR OCCURRED'));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`${red('  🔻  Message:')} ${error.message}`);
  console.log(`${red('  🔻  Name:')} ${error.name}`);

  if (error.stack) {
    console.log('\n' + red('  🔻  Stack Trace:'));
    console.log(
      error.stack
        .split('\n')
        .slice(1)
        .map((line) => `  ▪️  ${line.trim()}`)
        .join('\n')
    );
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

/**
 * Custom error class used in Command for handling command-related errors.
 */
export class CommandError extends Error {}

/**
 * Abstract class representing a command with a specific syntax, arguments, and options.
 * The class validates and parses the provided command-line arguments according to the defined syntax.
 *
 * @property `syntax` The command syntax that defines the required/optional parameters and options.
 *
 * @throws `CommandError` Throws an error if the provided syntax is invalid.
 */
export abstract class Command {
  /**
   * The command syntax that defines parameters and options.
   */
  protected static syntax: string;

  /**
   * Parsed arguments & options provided during command execution.
   */
  protected static result: Result;

  /**
   * Parses the syntax string to extract command parameters.
   * It identifies required arguments (`<!`), optional arguments (`<?`), and options (`<-`).
   *
   * @param syntax The command syntax string to be parsed.
   * @returns An array of parsed parameters with their type and key.
   */
  protected static parse(syntax: string): Parameters {
    if (!isStr(syntax)) {
      throw new CommandError(`Invalid syntax: ${String(syntax)}`);
    }

    // Regular expression to match required <!>, optional <?>, and options <-> patterns
    const pattern = /<(\!|\?|\-)\s*([a-z0-9_]+)\s*>/g;

    // Array to store the parsed result (each parameter with its type and name)
    const result: { key: string; type: string }[] = [];

    let match;

    // Match all occurrences of <! name>, <? name>, and <- name> patterns
    while ((match = pattern.exec(syntax)) !== null) {
      // Add the matched parameter (key and type) to the result array
      result.push({ key: match[2], type: match[1] });
    }

    // Return the parsed parameters
    return result;
  }

  /**
   * Validates command arguments based on the provided parameters.
   * Ensures that required arguments are present, optional arguments are handled properly,
   * and options are validated and parsed correctly.
   *
   * @param params An array of parameter definitions (each with a name and type).
   * @param args An array of command-line arguments provided by the user.
   * @returns The parsed result containing arguments and options.
   * @throws `CommandError` if there are too many arguments, missing required arguments, or unexpected options.
   */
  protected static validate(params: Parameters, args: Array<string>): Result {
    // Check if the number of arguments exceeds the expected parameters
    if (args.length > params.length) {
      throw new CommandError(`Too many arguments provided`);
    }

    const result = { arguments: {}, options: {} };

    const options = params
      .filter((param) => param.type === '-')
      .map((option) => option.key);

    // Iterate through each parameter definition to validate the arguments
    for (let i = 0; i < params.length; i++) {
      const type = params[i].type; // The type of the parameter (!, ?, or -)
      const param = params[i].key; // The name of the parameter
      const arg = args[i]; // The corresponding argument provided by the user

      // Handle options (type '-')
      if (type === '-') {
        if (arg && !options.map((o) => '-' + o).includes(arg)) {
          throw new CommandError(`Unkown option: ${arg}`);
        }

        // Add the option to the result, marking it as true if provided, false otherwise
        const option = options.find((o) => '-' + o === arg);
        if (option) result.options[option] = true;
        if (!result.options[param]) result.options[param] = false;
        continue;
      }

      // Handle optional arguments (type '?')
      if (type === '?') {
        // If an option appears instead of a value, adjust the argument list and proceed
        if (isDefined(arg) && arg.startsWith('-')) {
          args = [...args.slice(0, i), arg, ...args.slice(i)];
          result.arguments[param] = undefined;
          continue;
        }

        // Add the optional argument to the result (value can be undefined)
        result.arguments[param] = arg;
        continue;
      }

      // Handle required arguments (type '!')
      if (type === '!' && isDefined(arg) && !arg.startsWith('-')) {
        // Add the required argument to the result
        result.arguments[param] = arg;
        continue;
      }

      // If a required argument is missing or invalid, throw an error
      throw new CommandError(`Missing required argument: ${param}`);
    }

    // Return the parsed result containing arguments and options
    return result;
  }

  /**
   * Retrieves the value of a specific argument by its name.
   *
   * @param name The name of the argument to retrieve.
   * @returns The value of the argument.
   * @throws `CommandError` if the argument name is invalid or not found.
   */
  protected static argument(name: string): string | void {
    if (!isStr(name)) {
      throw new CommandError(`Invalid argument name: ${String(name)}`);
    }

    if (!isObj(this.result)) {
      // Cache result arguemnts and options
      this.result = this.validate(
        this.parse(this.syntax),
        process.argv.slice(3)
      );
    }

    return this.result.arguments[name];
  }

  /**
   * Retrieves the value of a specific option by its name.
   *
   * @param name The name of the option to retrieve.
   * @returns The value of the option.
   * @throws `CommandError` if the option name is invalid or not found.
   */
  protected static option(name: string): boolean {
    if (!isStr(name)) {
      throw new CommandError(`Invalid option name: ${String(name)}`);
    }

    if (!isObj(this.result)) {
      // Cache result arguemnts and options
      this.result = this.validate(
        this.parse(this.syntax),
        process.argv.slice(3)
      );
    }

    return this.result.options[name];
  }

  /**
   * Logs an informational message in blue color.
   *
   * @param message The message to log.
   */
  public static info(message: string) {
    console.log(`\x1b[34m${message}\x1b[0m`);
  }

  /**
   * Logs an error message in red color.
   *
   * @param message The error message to log.
   */
  public static error(message: string) {
    console.log(`\x1b[31m${message}\x1b[0m`);
  }

  /**
   * Logs a warning message in yellow color.
   *
   * @param message The warning message to log.
   */
  public static warning(message: string) {
    console.log(`\x1b[33m${message}\x1b[0m`);
  }

  /**
   * Logs a success message in green color.
   *
   * @param message The success message to log.
   */
  public static success(message: string) {
    console.log(`\x1b[32m${message}\x1b[0m`);
  }

  /**
   * Executes the command logic.
   * This is an abstract method and should be implemented in a subclass.
   *
   * @returns The result of the command execution.
   */
  public static exec(): unknown {
    throw new CommandError(`${this.name}.exec implementation is missing`);
  }
}
