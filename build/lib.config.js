const path = require('path');
const rules = require('./rules');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

//
// This is a build config for codeviewer.
//

// OUTPUT_PATH
const resolve = p => path.resolve(__dirname, p);
const PATH_DIST = resolve('../dist');

module.exports = (env, argv) => {
  return {
    entry: './src/core/index.ts',
    mode: argv.mode,
    output: {
      path: PATH_DIST,
      filename: '[name].js',
      publicPath: '/',
      libraryTarget: 'umd',
      library: 'CodeViewer'
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
      new MiniCssExtractPlugin({ filename: '[name].css' }),
      new FriendlyErrorsPlugin()
    ]
  }
}