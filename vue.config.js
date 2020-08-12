module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://185.209.85.213:8000', // target host
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/api': '/api', // rewrite path
        },
      },
      '/web': {
        target: 'http://185.209.85.213:8001', // target host
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/web': '/web', // rewrite path
        },
      },
    },
    port: 80,
  },
}
