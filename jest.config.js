const aliases = require('module-alias-jest/register')

/** @type {import('jest').Config} */
const config = {
    verbose: true,
    maxWorkers: 1,
    forceExit: true,
    detectOpenHandles: true,
    moduleNameMapper: aliases.jest
  };
  
module.exports = config;