import { renderHome, renderError } from './resources/js/ssr';
import fs from 'fs';

fs.writeFileSync('resources/views/index.blade.php', renderHome('en'));
fs.writeFileSync('resources/views/errors/minimal.blade.php', renderError('en', '404'));

console.log('Shells generated!');