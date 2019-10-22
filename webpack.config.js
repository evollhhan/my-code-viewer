const path = require('path');
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const rules = require('./build/rules');

//
// CONST
// ---
const PATH = p => path.resolve(__dirname, p);
const PATH_DIST = PATH('./docs');

//
// DevServer
// ----
const devServer = {
  host: '0.0.0.0',
  port: 3000,
  open: true,
  disableHostCheck: true,
  clientLogLevel: 'error',
  overlay: {
    warnings: false,
    errors: true
  },
  quiet: true,
  watchOptions: {
    poll: false
  }
};

//
// Plugins
// ---
const plugins = (IS_PROD) => {
  const list = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': IS_PROD ? '"production"' : '"development"'
    }),
    new FriendlyErrorsPlugin(),
    new HtmlWebPackPlugin({
      template: 'index.html',
      filename: 'index.html'
    })
  ];

  if (IS_PROD) {
    list.push(
      new MiniCssExtractPlugin({
        filename: '[name].[hash:4].css'
      })
    )
  } else {
    list.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return list;
}

module.exports = (env, argv) => {
  // Build Env
  const IS_PROD = argv.mode === 'production';
  // Export Config
  return {
    entry: './src/index.ts',
    mode: argv.mode,
    output: {
      path: PATH_DIST,
      filename: IS_PROD ? '[name].[hash:4].js' : '[name].js',
      publicPath: IS_PROD ? '/my-code-viewer/' : ''
    },
    devtool: IS_PROD ? false : '#cheap-eval-source-map',
    resolve: {
      extensions: ['.js', '.ts', '.json']
    },
    devServer,
    module: {
      rules: rules(IS_PROD)
    },
    plugins: plugins(IS_PROD)
  }
};