module.exports = {
  entry: './src/index.ts',
  target: 'node',
  // mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader','shebang-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  }
};
