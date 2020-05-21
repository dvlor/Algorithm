const fs = require('fs');
const path = require('path');
const currentDir = __dirname;

module.exports = function(dst){
  let allJs = getJs();
  var template = fs.readFileSync(path.join(currentDir, 'template.html'), {encoding: 'utf8'});
  return allJs.map(js => {
    let fileName = js.split('.')[0];
    fs.writeFileSync(path.join(dst, fileName+'.html'), template.replace('$$', fs.readFileSync(path.join(currentDir, js))));
    return `<a href="./${fileName}.html">${fileName}</a>`
  })
}

function getJs() {
  var files = fs.readdirSync(currentDir);
  return files.filter(f => f.endsWith('.js') && f !== 'build.js');
}