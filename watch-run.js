'use strict';
let fs = require('fs');
var execSync = require('child_process').execSync;

let cmd = process.argv.slice(3).join(' ');

if (!cmd.length) {
  console.log('usage: watch-run <pathes> <cmd>');
  process.exit(1);
}

function exec1(cmd) {
  console.log(cmd);
  execSync(cmd, {stdio:[0,1,2]})
  console.log('finished');
}

let pathes = process.argv[2].split(' ');
for (let p of pathes) {
  fs.watch(p, (event, filename) => {
    console.log(`${filename} ${event}`);
    exec1(cmd);
  });
}

exec1(cmd);  
