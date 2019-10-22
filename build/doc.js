'use strict'
const ora = require('ora');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config')({}, { mode: 'production' });
const spinner = ora('building for production...');
const print = require('./print');
spinner.start();
webpack(webpackConfig, (err, stats) => {
  spinner.stop();
  print(err, stats);
});
