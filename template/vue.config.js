const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: './',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/var.scss";'
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionWebpackPlugin({
          // 正在匹配需要压缩的文件后缀
          test: /\.(js|css|svg|woff|ttf|json|html)$/,
          // 大于10kb的会压缩
          threshold: 10240
          // 其余配置查看compression-webpack-plugin
        })
      );
    }
  },
  chainWebpack: config => {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
  },

  runtimeCompiler: true,
  productionSourceMap: false
};
