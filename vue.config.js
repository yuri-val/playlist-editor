module.exports = {
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
