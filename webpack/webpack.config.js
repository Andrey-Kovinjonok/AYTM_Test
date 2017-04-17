const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.join(__dirname, '/../src');

const opt = {
  folders: {
    js: srcPath,
  },
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname)],
        use: 'babel-loader',
      }, {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        // loader: 'url-loader',
        loader: 'file-loader',
        options: {
          context: path.resolve(__dirname, '..'),
          minetype: 'image/svg+xml',
          name: 'assets/[name].[ext]',
          //  outputPath: path.join("assets", "/"),
          // publicPath: path.resolve(__dirname, '../assets'),
          //name: '[name].[ext]',
        },
      }, {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Test Task',
      template: '../webpack/template.html',
    }),
  ],

  resolve: {
    extensions: ['.json', '.js', '.jsx'],

    modules: [
      'node_modules',
    ],
  },
};
