const { resolve } = require('path');

const cfg = require('./webpack.config.js');

const isVerbose = true;

const PORT = 3019;

module.exports = {
  entry: {
    bundle: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${PORT}`,
      'webpack/hot/only-dev-server',
      resolve(__dirname, 'hotReload'),
    ],
  },
  output: {
    path: resolve(__dirname),
    publicPath: '/',
    // filename: '[hash].[name].js',
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  context: resolve(__dirname, '../src'),
  devtool: 'inline-source-map',
  // devtool: 'cheap-module-source-map',
  // devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: resolve(__dirname, '../assets'),
    hot: true,
    host: '0.0.0.0',
    port: PORT,
    publicPath: '/',
    historyApiFallback: true,
  },

  stats: {
    colors: true,
    reasons: true,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },

  module: cfg.module,
  plugins: cfg.plugins,
  resolve: cfg.resolve,

  performance: { hints: false },
};

/*
https://github.com/jaredlunde/webpack2-react-es7-boilerplate/blob/master/webpack.config.js
*/
