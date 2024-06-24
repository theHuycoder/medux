require('ts-node').register();

module.exports = [
  {
    context: '*',
    target: `http://localhost:4300`,
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
];
