import { createProxyMiddleware } from "http-proxy-middleware";

/**
 * Configure proxy middleware
 */
const proxySetup = createProxyMiddleware({
    target: 'http://127.0.0.1:8100',
    changeOrigin: true,
    logLevel: 'debug',
    onProxyReq : function onProxyReq(proxyReq, req, res) {
        // add custom header to request
        let token = localStorage.getItem('access_token') ?? '' ;
        proxyReq.setHeader('Authorization', token);
        // or log the req
      }
  });

module.exports = function(app: any) {
  app.use('/api',proxySetup);
};

