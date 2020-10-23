const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Commonly used webpack config
module.exports = {
  // 1 the entry file(s)
  entry: {
    main: './src/index.ts'
  },
  // 2 the output file(s)
  output: {
    // NodeJs relative path resolver
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js',
    // publicPath: '/js',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My Test App',
      inject: true,
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    })
  ],
  module: {
    rules: [
      // Typescript rules
      {
        test: /\.tsx?$/,
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
            presets: ['@babel/preset-env']
          }
        }
      },
      // Scss loader
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true,
              publicPath: '/css',
              hmr: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
};