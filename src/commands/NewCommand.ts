import { basename, relative, resolve } from 'path';
import { Command, red, green, orange, bugger } from '../Command';
import { copySync } from 'fs-extra';

/**
 * Command that outputs the current version of the application.
 *
 *
 * @extends Command
 */
export class NewCommand extends Command {
  // xinit new ./project -ts -react
  protected static syntax: string =
    '<? path> <-ts> <-js> <-react> <-vue> <-debug>';

  public static message(path: string): void {
    console.log(green(`  🌱  Project created successfully!`));
    console.log(orange(`  💡  Run the following commands:`));

    // Change directory to the newly created project folder
    console.log(`  ▪️  cd ${path ? path : '.'}`);

    // Install the project dependencies
    console.log(`  ▪️  npm install`);

    // Start the Vite development server
    console.log(`  ▪️  npm run dev    ${green('# Start Vite dev server')}`);

    // Start the BNJSX server
    console.log(`  ▪️  npm start      ${green('# Start Bnjsx server')}`);
  }

  /**
   * Logs the current version of the application to the console.
   */
  public static exec(): any {
    const path = this.argument('path');
    const ts = this.option('ts');
    const js = this.option('js');
    const react = this.option('react');
    const vue = this.option('vue');
    const debug = this.option('debug');
    const root = process.cwd();
    const dest = resolve(root, path ? path : '');
    const name = basename(dest);

    if (!name) {
      return console.log(
        red('  ❌  Invalid project name. Please specify a valid path.')
      );
    }

    // Handle unsupported combinations
    if ((ts && js) || (!ts && !js) || (react && vue)) {
      return console.log(
        red('  ❌  Unsupported combination! Check our docs for more info...')
      );
    }

    if (ts && react) {
      return console.log(
        orange(' 💡  React + TypeScript support is coming soon... Stay tuned!')
      );
    }

    if (js && react) {
      return console.log(
        orange(' 💡  React + JavaScript support is coming soon... Stay tuned!')
      );
    }

    if (ts && vue) {
      return console.log(
        orange(' 💡  Vue + TypeScript support is coming soon... Stay tuned!')
      );
    }

    if (js && vue) {
      return console.log(
        orange(' 💡  Vue + JavaScript support is coming soon... Stay tuned!')
      );
    }

    if (ts || js) {
      const path = ts ? '../../ts' : '../../js';
      const src = resolve(__dirname, path);

      try {
        copySync(src, dest);
        return this.message(relative(process.cwd(), dest));
      } catch (error) {
        if (debug) return bugger(error);

        return console.log(
          red(
            `  ❌  There was an error copying files! Use -debug for more details.`
          )
        );
      }
    }

    console.log(
      red('  ❌  Unsupported combination! Check our docs for more info...')
    );
  }
}
