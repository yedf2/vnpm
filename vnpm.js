'use strict';
let fs = require('fs');
var execSync = require('child_process').execSync;
let path = process.argv[2] || '.';
let f = path + '/package.json';
let olds = fs.readFileSync(f).toString();
let p = JSON.parse(olds)
let oldv = p.version;
let vers = p.version.split('.');
let v3 = parseInt(vers[2])+1;
p.version = `${vers[0]}.${vers[1]}.${v3}`;
let news = JSON.stringify(p, null, 4);
fs.writeFileSync(f, news);
console.log(`old version: ${oldv}, new version: ${p.version}`);
let cmd = `npm publish ${path} && cnpm sync ${p.name}`;
console.log(cmd);
execSync(cmd, {stdio:[0,1,2]})
