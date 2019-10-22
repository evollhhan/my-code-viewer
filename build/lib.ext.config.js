const path = require('path');
const chalk = require('chalk');
const rules = require('./rules');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

//
// This is a build config for highlight.js extension.
//

// OUTPUT_PATH
const resolve = p => path.resolve(__dirname, p);
const PATH_DIST = resolve('../dist');

module.exports = {
  entry: './src/extend/lang-support.ts',
  mode: 'production',
  output: {
    path: PATH_DIST,
    filename: 'hl.web.js',
    publicPath: '/',
    libraryTarget: 'umd',
    library: 'HL'
  },
  devtool: false,
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    rules: rules(true)
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new MiniCssExtractPlugin({ filename: 'hl.web.css' }),
    new FriendlyErrorsPlugin()
  ]
}
