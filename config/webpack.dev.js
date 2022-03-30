const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
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
    historyApiFallback: true,
    compress: true,
    liveReload: true,
    open: true,
    port: 8080,
  },
});
