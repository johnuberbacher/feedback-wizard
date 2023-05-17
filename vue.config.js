const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/'
  // publicPath: process.env.VUE_APP_PUBLIC_PATH,
})