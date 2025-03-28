# Changelog

All notable changes to this project will be documented in this file.

## Bnjet@1.0.2 - 2025-03-28

- **Fixed issue with `nodemon` starting asynchronously**: When executing `npm run start`, `nodemon` would run before the TypeScript compilation (`tsc --watch`) finished, causing issues with the server starting up. To resolve this, introduced the `wait-on` tool, which waits for the `dist/index.js` file to be generated before starting `nodemon`. The final command became:

```json
{
  "start": "concurrently \"tsc --watch --project tsconfig.server.json --incremental\" \"wait-on dist/index.js && nodemon\""
}
```

## Bnjet@1.0.1 - 2025-03-28

- **Fixed issue in `.npmignore` file**: After publishing `1.0.0`, certain files and folders were unintentionally ignored, specifically in the `ts` and `js` scaffolding directories. Updated the `.npmignore` file to only ignore files and folders in the root directory, resolving the issue.

## Bnjet@1.0.0 - 2025-03-28

- **Initial release of `Bnjet`**.
