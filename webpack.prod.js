const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [new CleanWebpackPlugin(), new CssMinimizerPlugin(), new TerserPlugin()],
  },
});
