import { defineConfig } from 'vite';
import reload from 'vite-plugin-full-reload';
import copy from 'rollup-plugin-copy';

/**
 * Vite Configuration File
 * ------------------------
 * This config handles:
 * - Live reloading for changes in the `views/` directory.
 * - Copying essential files to the `app/` directory during the build.
 * - Customizing the build output and rollup options.
 * - Enabling CORS for local development.
 */

export default defineConfig({
  plugins: [
    /**
     * 🔄 Full Reload Plugin
     * ---------------------
     * Watches for changes in the `views/` directory and reloads the browser.
     */
    reload('./views/**/*.fx'),

    /**
     * 📂 File Copy Plugin
     * -------------------
     * Copies necessary files and directories into the `app/` folder during the build process.
     */
    copy({
      targets: [
        { src: 'database/*', dest: 'app/database' }, // Copy `database/` to `app/database`
        { src: 'views/*', dest: 'app/views' }, // Copy `views/` to `app/views`
        { src: 'src/*', dest: 'app' }, // Copy `src/` to `app/`
        { src: 'bnjsx.config.js', dest: 'app' }, // Copy the config file
        { src: 'package.json', dest: 'app' }, // Copy package.json
        { src: '.env', dest: 'app' }, // Copy environment variables
      ],
    }),
  ],

  build: {
    /**
     * 📦 Build Output Configuration
     * ------------------------------
     * - Outputs built assets to `app/public/`
     * - Cleans the directory before each build
     * - Generates a manifest.json file for asset resolution
     */
    outDir: 'app/public',
    emptyOutDir: true,
    manifest: true,

    rollupOptions: {
      /**
       * 🚀 Rollup Entry Points
       * ----------------------
       * Defines the main entry files for bundling.
       */
      input: {
        app: 'assets/js/app.js', // JavaScript/TypeScript entry point
        style: 'assets/css/style.css', // CSS entry point
      },
    },
  },

  server: {
    /**
     * 🌍 Development Server Configuration
     * -----------------------------------
     * - Enables CORS for the frontend to communicate with `localhost:2025`
     * - Restricts allowed methods to `GET`
     */
    cors: {
      origin: 'http://localhost:2025', // Allow only this origin
      methods: 'GET, POST, PUT, DELETE', // Allowed HTTP methods
      credentials: true, // Allow cookies to be sent with the request
    },

    /**
     * 👀 Watch Ignore Configuration
     * ------------------------------
     * Prevents unnecessary reloads by ignoring changes in:
     * - SQLite database files
     * - The `dist/` folder (build output)
     * - TypeScript source files (`src/`) since they are compiled
     * - TypeScript test files (`test/`)
     */
    watch: {
      ignored: [
        '**/database/*.sqlite*', // Exclude all SQLite files
        '**/src/**/*.js', // Exclude Javascript source files from being watched
        '**/test/**/*.js', // Exclude Javascript test files
      ],
    },
  },
});
