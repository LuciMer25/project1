const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir : path.resolve("../backend/public"),
    devServer: {
      proxy : {
       "^/api" : {
                target: 'http://localhost:3000',
                ws: false,
                changeOrigin: true,
                logLevel: 'debug'
              }
      }
     
    }

})