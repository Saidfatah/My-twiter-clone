module.exports = {
    target: 'node',
    mode: 'development',
    entry: './index.js',
    resolve: {
      modules: ['server', 'node_modules'],
    },
  };