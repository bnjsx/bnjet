/**
 * 🛠️ BNJSX Configuration File
 *
 * This file defines the core settings for your BNJSX application.
 * Be sure to review and adjust configurations before deploying to production.
 */

const { Cluster, ClusterPool, SQLite, UTC, Vite } = require('bnjsx');

// Tools
const vite = Vite.assets.bind(Vite);
const year = UTC.get.year.bind(UTC);

/** @type {import('bnjsx').AppOptions} */
module.exports = {
  /**
   * 🌍 Environment Configuration
   *
   * `dev`  - Development mode with hot reloading.
   * `prod` - Production mode with optimizations.
   */
  env: 'env',

  /**
   * 🚀 Application Mode
   *
   * `web`  - Web application.
   * `api`  - API-only mode (no views, only JSON responses).
   */
  mode: 'web',

  /**
   * 🏠 Server Configuration
   */
  host: 'localhost', // ✅ Server hostname
  port: 3030, // ✅ Port to listen on
  protocol: 'http', // ✅ `http` or `https`
  key: undefined, // ✅ SSL key (required for HTTPS)
  cert: undefined, // ✅ SSL certificate (required for HTTPS)

  /**
   * 🚀 Caching (❗Set to `true` in production)
   */
  cache: false,

  /**
   * 🗄️ Database Cluster Configuration
   *
   * Define multiple database pools and manage connections.
   */
  default: 'sqlite',
  cluster: new Cluster(
    new ClusterPool('sqlite', new SQLite('./database/main.sqlite'))
  ),

  /**
   * 🌍 CORS Configuration
   *
   * Define allowed origins for cross-origin requests.
   */
  cors: { origin: '*' },

  /**
   * 🔒 Security Configuration
   *
   * Content Security Policy (CSP) is disabled by default to allow communication with Vite during development.
   * Configure appropriately for production.
   */
  security: { contentSecurityPolicy: false },

  /**
   * 📁 Paths Configuration
   *
   * Defines the structure of your project. If modified, ensure Vite config is updated accordingly.
   */
  paths: {
    views: './views',
    generators: 'src/generators',
    models: 'src/models',
    seeders: 'src/seeders',
    commands: 'src/commands',
  },

  /**
   * 🏗️ TypeScript Support
   *
   * When enabled (`true`), BNJSX CLI generates TypeScript files in `src/`.
   * Otherwise, JavaScript files are created at the root.
   */
  typescript: { enabled: false },

  /**
   * 🌐 Global Variables
   *
   * These variables can be referenced globally in Flex templates like `$(#app_name)`.
   */
  globals: { app_name: 'bnjsx' },

  /**
   * 🔧 Tools
   *
   * Functions that can be referenced globally in Flex components.
   * Example usage: `$( @vite('/assets/css/style.css', '/assets/ts/app.ts') )`
   */
  tools: {
    year, // Prints the current year `$( @year() )` in templates
    vite, // Injects Vite assets
  },

  /**
   * 🌍 Public Assets
   *
   * Defines settings for serving public assets.
   */
  public: {
    root: './public',
  },
};
