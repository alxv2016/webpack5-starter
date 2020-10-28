const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
// Common webpack config
module.exports = {
  // 1 base directory
  // https://webpack.js.org/configuration/entry-context/#context
  context: path.resolve(__dirname, './src'),
  // 2 the entry file(s) Where webpack looks to start building the bundle
  // https://webpack.js.org/configuration/entry-context/#entry
  entry: {
    main: {
      import: path.resolve(__dirname, 'src/index.ts'),
      dependOn: 'vendor',
    },
    vendor: ['lodash', 'axios'],
  },
  // 3 the output file(s) Where webpack outputs the assets and bundles
  // https://webpack.js.org/configuration/output/#outputpath
  // https://webpack.js.org/configuration/output/#outputpublicpath
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  // 4 Resolve typescript
  // https://webpack.js.org/configuration/resolve/#resolveextensions
  resolve: {
    extensions: ['.ts', '.js'],
  },
  // 5 Plugins Customize the webpack build process
  // https://webpack.js.org/configuration/plugins/#plugins
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      // favicon: '',
      template: path.resolve(__dirname, './src/index.html'),
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
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
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
        test: /\.(ico|jpeg|png|svg|gif)$/,
        type: 'asset/resource',
      },
      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
};
