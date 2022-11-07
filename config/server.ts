module.exports = {
  host: '0.0.0.0',
  port: 3000,
  hot: true,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
    '/mock': {
      target: 'http://127.0.0.1:3000/',
      changeOrigin: true,
      pathRewrite: {
        '^/mock': '',
      },
    },
  },
}
