const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, "../backend/public"),
  devServer: {
    proxy: {
      "^/api": {
        target: 'http://localhost:3000',
        ws: false,
        changeOrigin: true,
        logLevel: 'debug'
      }
    },
    allowedHosts: "all",
    port: 80,
    host: '0.0.0.0'
  }
});
