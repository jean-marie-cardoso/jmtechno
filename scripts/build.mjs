import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=JSON.parse(await readFile(path.join(root,'links.json'),'utf8'));
const base='https://jean-marie-cardoso.github.io/labo-techno/';
const codes=new Set(),destinations=new Set();
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const links=source.map(item=>{
 if(!item||!/^b?[345]\d{2}$/.test(item.code)||codes.has(item.code)||typeof item.title!=='string'||!item.title.trim())throw Error('Code ou titre invalide');
 const regular=/^([345])\/(\d{2})\/$/.exec(item.path),bonus=/^bonus\/([345])-(\d{2})\/$/.exec(item.path);
 const expected=regular?regular[1]+regular[2]:bonus?'b'+bonus[1]+bonus[2]:null;
 if(!expected||expected!==item.code||destinations.has(item.path))throw Error('Correspondance ou destination invalide');
 codes.add(item.code);destinations.add(item.path);
 return {...item,url:new URL(item.path,base).href};
}).sort((a,b)=>a.code.localeCompare(b.code,'fr'));
const shortcuts=JSON.parse(await readFile(path.join(root,'shortcuts.json'),'utf8'));
for(const item of shortcuts){
 const url=new URL(item.url);
 if(!/^[a-z]{2,12}$/.test(item.code)||codes.has(item.code)||url.origin!=='https://jean-marie-cardoso.github.io'||!['/classe-calme/','/classe-calme/partage/'].includes(url.pathname)||url.search||url.hash||!item.title)throw Error('Raccourci invalide');
 codes.add(item.code);
}
await mkdir(path.join(root,'public'),{recursive:true});
await writeFile(path.join(root,'public','links-data.js'),'/* Généré par scripts/build.mjs à partir de links.json. */\nwindow.JMTechnoLinks = '+JSON.stringify(links).replace(/</g,'\\u003c')+';\nwindow.JMTechnoShortcuts = '+JSON.stringify(shortcuts).replace(/</g,'\\u003c')+';\n');
for(const item of [...links,...shortcuts]){
 const dir=path.join(root,'public',item.code);await mkdir(dir,{recursive:true});
 const html='<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url='+escape(item.url)+'"><title>'+escape(item.title)+' · JM Techno</title><script>location.replace('+JSON.stringify(item.url).replace(/</g,'\\u003c')+');</script><style>body{font-family:Arial,sans-serif;background:#f4f6ef;color:#234437;display:grid;place-content:center;min-height:90vh;text-align:center;padding:20px}a{color:inherit;font-size:20px}</style></head><body><a href="'+escape(item.url)+'">Ouvrir l’activité '+escape(item.code)+'</a></body></html>\n';
 await writeFile(path.join(dir,'index.html'),html);
}
await writeFile(path.join(root,'public','CNAME'),'jmtechno.fr\n');
await writeFile(path.join(root,'public','.nojekyll'),'');
console.log(links.length+' activités et '+shortcuts.length+' raccourcis générés.');
