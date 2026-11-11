import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
execFileSync(process.execPath, ['node_modules/tailwindcss/lib/cli.js','-i','src/styles.css','-o','dist/style.css','--minify'], {stdio:'inherit'});
await build({entryPoints:['src/app.jsx'],bundle:true,minify:true,outfile:'dist/app.js',format:'iife',target:['es2020'],define:{'process.env.NODE_ENV':'"production"'}});
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
let html=readFileSync('dist/index.html','utf8');
for(const file of ['style.css','app.js']){const hash=createHash('sha256').update(readFileSync('dist/'+file)).digest('hex').slice(0,12);html=html.replace(new RegExp(file.replace('.', '\\.')+'(?:\\?v=[a-z0-9]+)?','g'),file+'?v='+hash)}
writeFileSync('dist/index.html',html);
