const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "E:/javaStudy/workspace_sb/api-walking/src/main/resources/static"
})
module.exports = {
  devServer: {
    proxy: {
      '/kakaoapi': {
        target: 'https://kauth.kakao.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};