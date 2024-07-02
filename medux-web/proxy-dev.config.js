require('ts-node').register();

module.exports = [
  {
    context: '/auth/*',
    target: `http://localhost:4300`,
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
];
