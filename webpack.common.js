const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const SOURCE_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');
// Common webpack config
module.exports = {
  // 1 base directory
  // https://webpack.js.org/configuration/entry-context/#context
  context: SOURCE_PATH,
  // 2 the entry file(s)
  // https://webpack.js.org/configuration/entry-context/#entry
  entry: {
    main: {
      import: `${SOURCE_PATH}/index.ts`,
      dependOn: 'vendor',
    },
    vendor: ['lodash', 'axios'],
  },
  // 3 the output file(s)
  // https://webpack.js.org/configuration/output/#outputpath
  // https://webpack.js.org/configuration/output/#outputpublicpath
  output: {
    path: DIST_PATH,
    publicPath: './',
    filename: 'js/[name].[contenthash].bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  // 4 Resolve typescript
  // https://webpack.js.org/configuration/resolve/#resolveextensions
  resolve: {
    extensions: ['.ts', '.js'],
  },
  // 5 Plugins
  // https://webpack.js.org/configuration/plugins/#plugins
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: `${SOURCE_PATH}/index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    new Dotenv({
      path: './.env',
    }),
  ],
  // 6 Modules (Loaders)
  // https://webpack.js.org/configuration/module/#ruleloaders
  module: {
    rules: [
      // Typescript rules
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Babel rules
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // Scss loader
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
          'sass-loader',
        ],
      },
      // Image loader
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // Webpack5 assets loader
      {
        test: /\.(jpeg|png|svg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
};
