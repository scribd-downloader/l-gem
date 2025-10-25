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
        // Language pages
        '/ar',
        '/de',
        '/es',
        '/id',
        '/it',
        '/pt',
        '/tk',
      ],
    }),
    copy({
      targets: [
        { src: 'ads.txt', dest: 'dist' },
        { src: 'js/scripts.js', dest: 'dist/js' },
        { src: 'BingSiteAuth.xml', dest: 'dist' },
        { src: 'google6a0b563becc05893.html', dest: 'dist' }
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
        // Language pages
        ar: resolve(__dirname, 'ar.html'),
        de: resolve(__dirname, 'de.html'),
        es: resolve(__dirname, 'es.html'),
        id: resolve(__dirname, 'id.html'),
        it: resolve(__dirname, 'it.html'),
        pt: resolve(__dirname, 'pt.html'),
        tk: resolve(__dirname, 'tk.html'),
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
          // Language pages
          '/ar': '/ar.html',
          '/de': '/de.html',
          '/es': '/es.html',
          '/id': '/id.html',
          '/it': '/it.html',
          '/pt': '/pt.html',
          '/tk': '/tk.html',
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
      // Language pages middleware
      server.middlewares.use('/ar.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'ar.html'));
      });
      server.middlewares.use('/de.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'de.html'));
      });
      server.middlewares.use('/es.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'es.html'));
      });
      server.middlewares.use('/id.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'id.html'));
      });
      server.middlewares.use('/it.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'it.html'));
      });
      server.middlewares.use('/pt.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'pt.html'));
      });
      server.middlewares.use('/tk.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'tk.html'));
      });
    },
  },
});
