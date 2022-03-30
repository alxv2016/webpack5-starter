// Plugins
// https://github.com/johnagan/clean-webpack-plugin
// https://webpack.js.org/plugins/copy-webpack-plugin/
// https://webpack.js.org/plugins/html-webpack-plugin/
// https://webpack.js.org/plugins/mini-css-extract-plugin/
// https://github.com/mrsteele/dotenv-webpack
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
// File to our paths
const paths = require('./paths');

// Common webpack config
module.exports = {
  // https://webpack.js.org/configuration/entry-context/#context
  // Set our absolute path: the src directory
  context: paths.src,
  // https://webpack.js.org/configuration/entry-context/#dependencies
  // the entry file(s) Where webpack looks to start building the bundle
  // dependOn will let you share vendor libraries
  entry: {
    app: {
      import: paths.src + '/index.ts',
      dependOn: 'vendors',
    },
    vendors: ['axios'],
  },
  // the output file(s) Where webpack outputs the assets and bundles
  // https://webpack.js.org/configuration/output/#outputpath
  // https://webpack.js.org/configuration/output/#outputpublicpath
  // https://webpack.js.org/configuration/output/#outputclean
  // NOTE: clean is build in feature won't need cleanwebpackplugin
  output: {
    clean: true,
    path: paths.build,
    filename: 'js/[name].[contenthash].bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: '/',
  },
  // Resolve typescript
  // https://webpack.js.org/configuration/resolve/#resolvemodules
  // https://webpack.js.org/configuration/resolve/#resolveextensions
  // https://webpack.js.org/configuration/resolve/#resolvealias
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.ts', '.js'],
    alias: {
      '@': paths.src,
      public: paths.public,
    },
  },
  // Plugins Customize the webpack build process
  // https://webpack.js.org/configuration/plugins/#plugins
  plugins: [
    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      // favicon: '',
      template: paths.src + '/template.html',
      filename: 'index.html',
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
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              emit: true,
              // publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
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
