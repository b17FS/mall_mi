const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8080,
    // 项目访问 /api 时，会被拦截，然后代理到 target 指定的后台接口域名
    // pathRewrite是和target打配合使用的,
    // 看上去时访问 /api 接口，实际访问的是 'https://www.imooc.com/mock
    proxy: {
      '/api': {
        target: 'https://www.imooc.com',
        // 是否跨域
        changeOrigin: true,
        pathRewrite: {
          '/api': '/mock'
          // '/api': ' '
        }
      }
    }
  }
})
