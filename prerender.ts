import { renderHome, renderError } from './resources/js/ssr';
import fs from 'fs';

const date = new Date().toISOString().split('T')[0];
fs.writeFileSync('resources/views/index.blade.php', renderHome('en'));
fs.writeFileSync('resources/views/errors/minimal.blade.php', renderError('en', '404'));
fs.writeFileSync('public/sitemap.xml', 
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Indonesian version -->
  <url>
    <loc>https://roastx.kiuyha.my.id/id</loc> <!-- Direct URL to the Indonesian page -->
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- English version -->
  <url>
    <loc>https://roastx.kiuyha.my.id/en</loc> <!-- Direct URL to the English page -->
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);

console.log('Shells generated!');