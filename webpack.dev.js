const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// Merge webpack dev config with common configs
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    stats: 'errors-only',
    hot: true,
    open: true,
    port: 9000
  },
  module: {
    rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            // `{
            //   loader: MiniCssExtractPlugin.loader,
            //   options: {
            //     reloadAll: true,
            //     publicPath: '/css',
            //     hmr: true,
            //   },
            // },`
            'css-loader',
            'sass-loader',
          ],
        },
      ]
  }
});