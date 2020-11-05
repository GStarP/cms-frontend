module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 8085,
    open: true,
    proxy: {
      '/api': {
        target: 'http://119.45.140.10:8081',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api': '/'
        }
      }
    }
  }
}
