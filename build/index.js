const path = require('path');
const fs = require('fs');
const builds = require('../src/chapters/build');
const oper = process.argv[2];


const dstDir = path.join(__dirname, '../docs/');
clean(dstDir);
fs.mkdirSync(dstDir);
copy([{
  src: path.join(__dirname, '../src/assets'),
  dst: path.join(dstDir, './assets')
},{
  src: path.join(__dirname, '../src/js'),
  dst: path.join(dstDir, './js')
}]);

let els = [];
for (let build of builds){
  els = els.concat(els, build(dstDir));
}

let data = fs.readFileSync(path.join(__dirname, '../src/index.html'), {encoding: 'utf8'});
data = data.replace('</body>', els.join('<br/>')+'</body>');
fs.writeFileSync(path.join(dstDir, './index.html'), data, {encoding: 'utf8'});

function clean(dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  let stat = fs.statSync(dir);
  if (stat.isFile()) {
    fs.unlinkSync(dir);
  } else {
    let files = fs.readdirSync(dir);
    files.forEach(f => {
      clean(path.join(dir, f))
    })
    fs.rmdirSync(dir, {recursive: true})
  }
}

function copy(datas){
  datas.forEach(data => {
    let { src, dst } = data;
    if (!fs.existsSync(dst)){
      fs.mkdirSync(dst);
    }
    let files = fs.readdirSync(src);
    files.forEach(f => {
      let stat = fs.statSync(path.join(src, f));
      if (stat.isDirectory()) {
        return;
      }
      fs.copyFileSync(path.join(src, f), path.join(dst, f));
    })
  })
}