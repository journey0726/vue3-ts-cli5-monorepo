const { defineConfig } = require('@vue/cli-service')
const path = require('path')

const serve = require('./config/server.ts')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const moduleName = process.env.TARGETMODULE || 'monitor'
const currentDate = new Date().toLocaleDateString().split('/').join('-')
const currentTime = new Date().toLocaleTimeString().split(':').join('-')

module.exports = defineConfig({
  runtimeCompiler: true,
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: serve,
  publicPath: '/',
  outputDir: `dist/${moduleName}_${currentDate}_${currentTime}`,
  configureWebpack: {
    entry: `/packages/${moduleName}/src/main.ts`,
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
      }),
    ],
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@share', path.resolve(__dirname, `packages/share`)).set('@monitor', path.resolve(__dirname, `packages/monitor/src`))
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'background.js',
      outputDir: `dist-electron/${moduleName}_${currentDate}_${currentTime}`,
    },
  },
})
