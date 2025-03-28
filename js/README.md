# BNJSX Scaffolding

A full-stack starter template with Vite (frontend) and BNJSX (backend).

## 🚀 Quick Start

### Development

1. **Start Vite dev server** for frontend HMR: `npm run dev`
2. **Start BNJSX server** in a separate terminal: `npm run start`
3. Open: `http://localhost:2025`

### Production

1. Build your project: `npm run build` (Outputs to `/app` folder)
2. Install **production-only** dependencies: `cd app && npm i --omit=dev`
3. Make sure your database is ready: `node exec gen`
4. Update `bnjsx.config.js` in the `/app` folder
   - Set `env` to `pro`
   - Set `cache` to `true`
   - Set other options `host`, `port`, `protocol`, `key`, `cert` ...
5. Run the server: `node index`

## 🧪 Testing

- Place test files in `/test`
- Run tests: `npm run test `

## Prerequisites

- Node.js (latest LTS recommended)
