const path = require('path');
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

//
// CONST
// ---
const PATH = p => path.resolve(__dirname, p);
const PATH_DIST = PATH('./dist');

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
// Rules
// ----
const rules = (IS_PROD) => [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [{
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }]
  },
  {
    test: /\.(scss|css)$/,
    oneOf: [
      {
        resourceQuery: /raw/,
        use: [
          IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        use: [
          IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: IS_PROD ? '[hash:base64]' : '[hash:base64:4]_[local]'
              }
            },
          },
          'sass-loader'
        ]
      }
    ]
  }
];

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
    new FriendlyErrorsPlugin()
  ];

  if (IS_PROD) {
    list.push(
      new MiniCssExtractPlugin({
        filename: 'style.css'
      })
    )
  } else {
    list.push(
      new webpack.HotModuleReplacementPlugin()
    );
    list.push(
      new HtmlWebPackPlugin({
        template: 'index.html',
        filename: 'index.html'
      })
    );
  }

  return list;
}

module.exports = (env, argv) => {
  // Build Env
  const IS_PROD = argv.mode === 'production';
  // Export Config
  return {
    entry: IS_PROD ? './src/@core/index.ts' : './src/index.ts',
    mode: argv.mode,
    output: {
      path: PATH_DIST,
      filename: '[name].js',
      publicPath: '/',
      ...IS_PROD ? {
        libraryTarget: 'umd',
        library: 'Codeviewer',
      }: null
    },
    devtool: IS_PROD ? false : '#cheap-eval-source-map',
    resolve: {
      extensions: ['.js', '.ts', '.ts', '.json']
    },
    devServer,
    module: {
      rules: rules(IS_PROD)
    },
    plugins: plugins(IS_PROD)
  }
};