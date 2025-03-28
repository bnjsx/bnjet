/**
 * Entry point for the `exec` bnjsx command-line tool.
 *
 * You can use the `exec` tool in the following ways:
 *
 * 1. **Using Node directly**:
 *    Run commands by using `node exec <command> <arguments> <options>`.
 *    Example:
 *      - `node exec -v` to print the current bnjsx version.
 *
 * 2. **Using npx**:
 *    Run the command via `npx bnjsx <command> <arguments> <options>`.
 *    This is slightly slower but still works for most cases.
 *
 * 3. **Global Installation** (not recommended):
 *    You can install `bnjsx` globally with `npm install -g bnjsx` and run commands like `bnjsx -v`.
 *    but some commands may not work when installed globally due to complexities in their functionality.
 *    It’s recommended to use `npx` or `node exec` for consistency and reliability.
 *
 * Example Usage:
 * - `node exec -v`  -> Prints the current version of bnjsx (fastest).
 * - `npx bnjsx <command>` -> Runs any bnjsx command with npx (a bit slower).
 */

const { execute } = require('bnjsx');
const { Command } = require('bnjsx');

// Execute the command and exit the process upon success or failure.
execute()
  .then(() => process.exit()) // Stop the process after execution.
  .catch((error) => Command.error(error.message)); // Print error message if something goes wrong.
