const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/css/index.scss";',
      },
    },
  },
  publicPath: IS_PROD ? 'http://lxy520.top/' : '/',
  devServer: {
    port: 8080,
    host: 'localhost',
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
