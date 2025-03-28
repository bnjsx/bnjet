## bnjet

**bnjet** is a scaffolding tool for the **bnjsx** framework, allowing you to quickly create **bnjsx** projects in seconds.

### Installation

To install **bnjet** globally, run:

```bash
npm install -g bnjet
```

Once installed, you can use the command line tool globally.

### Available Commands

- **`bnjet -v`**
  Prints the current version of **bnjet**.

- **`bnjet new <path> <options>`**
  Creates a new **bnjsx** project in the specified path or in the current directory if no path is specified. You need to provide one of the following options:

  - `-ts` to create a **bnjsx TypeScript** project for web.
  - `-js` to create a **bnjsx JavaScript** project for web.
  - `-ts -react` to create a **bnjsx TS React** project (coming soon in the next version).
  - `-js -react` to create a **bnjsx JS React** project (coming soon in the next version).
  - `-ts -vue` to create a **bnjsx TS Vue** project (coming soon in the next version).
  - `-js -vue` to create a **bnjsx JS Vue** project (coming soon in the next version).

### Getting Started

1. After installing **bnjet**, navigate to your project directory and run:

```bash
npm install
```

2. Start the Vite server for development:

```bash
npm run dev
```

3. Start the **bnjsx** server and open your application at [localhost:2025](http://localhost:2025):

```bash
npm run start
```

By default, **bnjsx** projects come with **auth** implemented out of the box, but we plan to introduce an option in the future to configure this functionality.

### Frontend Development with Vite

**bnjsx** projects use **Vite** for frontend asset handling, which means you'll get **HMR (Hot Module Replacement)** and live reload every time you update your views or React components.

### Jest Testing

Your **bnjsx** project comes with **Jest** preconfigured, Simply place your test files in the `test` folder and run:

```bash
npm run test
```

### Command Line Tool

**bnjsx** projects also come with a command-line interface entry point at the root project, `exec.js`. You can use it to communicate with **bnjsx** and execute commands like:

```bash
node exec -v
node exec mk:gen products
```

Alternatively, you can use `npx bnjsx -v`, but note that it may be a bit slower.

### TailwindCSS Integration

**bnjsx** projects come with **TailwindCSS** preconfigured. It’s ready to use with **auto-reload** when you update your views or React components (if using React).

### Assets Handling

Assets in the `public` folder are served by the **bnjsx** server, while assets in the `assets` folder are served by the Vite server during development and by the **bnjsx** server in production. To switch to production, make sure to set the `bnjsx.config.js` `env` option to `pro`.

### Production Setup

When your project is ready for production, follow these steps:

1. Build your project:

```bash
npm run build
```

This will output the build to the `/app` folder.

2. Install **production-only** dependencies:

```bash
cd app && npm i --omit=dev
```

3. Make sure your database is ready by running:

```bash
node exec gen
```

4. Update `bnjsx.config.js` in the `/app` folder:

   - Set `env` to `pro`
   - Set `cache` to `true`
   - Configure other options such as `host`, `port`, `protocol`, `key`, `cert`, etc.

5. Run the server:

```bash
node index
```

### Enjoy Your Development

That’s it! Enjoy seamless **bnjsx** development with **bnjet**.
