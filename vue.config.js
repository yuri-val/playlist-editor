module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/playlist-editor/' : '/',
  configureWebpack: {
    output: {
      chunkFilename: '[name].bundle.js',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  },
};
