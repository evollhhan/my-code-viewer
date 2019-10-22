const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (IS_PROD) => [
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