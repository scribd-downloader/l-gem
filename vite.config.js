import { defineConfig } from 'vite';
import vitePluginSitemap from 'vite-plugin-sitemap';
import { resolve } from 'path';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  plugins: [
    vitePluginSitemap({
      hostname: 'https://theludogame.com',
      routes: [
        '/',
        '/about-us',
        '/blog',
        '/contact-us',
        '/disclaimer',
        '/download',
        '/privacy-policy',
        '/terms-of-service',
      ],
    }),
    copy({
      targets: [
        { src: 'ads.txt', dest: 'dist' },
      ],
      hook: 'closeBundle',
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        aboutUs: resolve(__dirname, 'about-us.html'),
        blog: resolve(__dirname, 'blog.html'),
        contactUs: resolve(__dirname, 'contact-us.html'),
        disclaimer: resolve(__dirname, 'disclaimer.html'),
        download: resolve(__dirname, 'download.html'),
        privacyPolicy: resolve(__dirname, 'privacy-policy.html'),
        termsOfService: resolve(__dirname, 'terms-of-service.html'),
      },
    },
  },
  server: {
    fs: { strict: false },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const routeToHtml = {
          '/': '/index.html',
          '/about-us': '/about-us.html',
          '/blog': '/blog.html',
          '/contact-us': '/contact-us.html',
          '/disclaimer': '/disclaimer.html',
          '/download': '/download.html',
          '/privacy-policy': '/privacy-policy.html',
          '/terms-of-service': '/terms-of-service.html',
        };

        const sanitizedUrl = req.url.replace(/\/$/, '');

        if (routeToHtml[sanitizedUrl]) {
          req.url = routeToHtml[sanitizedUrl];
          console.log(`Redirecting to ${req.url}`);
        }
        next();
      });

      server.middlewares.use('/about-us.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'about-us.html'));
      });
      server.middlewares.use('/blog.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'blog.html'));
      });
      server.middlewares.use('/contact-us.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'contact-us.html'));
      });
      server.middlewares.use('/disclaimer.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'disclaimer.html'));
      });
      server.middlewares.use('/download.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'download.html'));
      });
      server.middlewares.use('/privacy-policy.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'privacy-policy.html'));
      });
      server.middlewares.use('/terms-of-service.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'terms-of-service.html'));
      });
    },
  },
});
