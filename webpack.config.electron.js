/**
 * Build config for electron 'Main Process' file
 */

import webpack from "webpack";
import path from "path";
import merge from "webpack-merge";
import baseConfig from "./webpack.config.base";

export default merge(baseConfig, {
  devtool: "source-map",

  entry: [ "@babel/polyfill", "./app/main.development" ],

  // 'main.js' in root
  output: {
    path: __dirname,
    filename: "./app/main.js"
  },

  plugins: [
    // Add source map support for stack traces in node
    // https://github.com/evanw/node-source-map-support
    // new webpack.BannerPlugin(
    //   'require("source-map-support").install();',
    //   { raw: true, entryOnly: false }
    // ),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],

  /**
   * Set target to Electron specific node.js env.
   * https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
   */
  target: "electron-main",

  resolve: {
    alias: {
      ws: path.resolve(path.join(__dirname, "node_modules/ws/index.js"))
    }
  },



  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  }
});
