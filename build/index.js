'use strict'
const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('./lib.config')({}, { mode: 'production' });
const spinner = ora('building for production...');
const print = require('./print');
spinner.start();

// 1. Build Lib
console.log(chalk.yellow(`
  [1/2] Start Build Lib.
`));

webpack(webpackConfig, (err, stats) => {
  spinner.stop();
  print(err, stats);

  // 2. Build Extension
  console.log(chalk.yellow(`
  [2/2]Start Build Extension.
`));
  webpack(require('./lib.ext.config'), print);
});
