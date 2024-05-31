const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // This is the path you'll use in your API requests
    createProxyMiddleware({
      target: 'https://uat.esewa.com.np', // The eSewa API URL
      changeOrigin: true,
    })
  );
};
