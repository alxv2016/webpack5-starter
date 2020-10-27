const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const DIST_PATH = path.join(__dirname, 'dist');
// Merge webpack dev config with common configs
module.exports = merge(common, {
  // https://webpack.js.org/configuration/mode/#usage
  mode: 'development',
  // https://webpack.js.org/configuration/devtool/#devtool
  // (inline = original sources)
  devtool: 'inline-source-map',
  // Dev server config options:
  // https://webpack.js.org/configuration/dev-server/#devservercontentbase
  // https://webpack.js.org/configuration/dev-server/#devservercompress
  // https://webpack.js.org/configuration/dev-server/#devserverstats-
  // https://webpack.js.org/configuration/dev-server/#devserverlivereload
  // https://webpack.js.org/configuration/dev-server/#devserverwatchcontentbase
  devServer: {
    contentBase: DIST_PATH,
    publicPath: '/',
    compress: true,
    stats: 'errors-only',
    liveReload: true,
    watchContentBase: true,
    open: true,
    port: 9000,
  },
});
