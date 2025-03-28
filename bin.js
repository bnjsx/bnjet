#!/usr/bin/env node

const { execute } = require('./dist/Executor');
const { error } = require('./dist/Command');

execute()
  .then(() => process.exit()) // Stop the process
  .catch(({ message }) => console.log(error(message)));
