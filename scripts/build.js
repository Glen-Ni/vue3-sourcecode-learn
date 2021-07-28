const fs = require('fs');
const execa = require('execa');

const targets = fs.readdirSync('packages').filter(i => {
  return fs.statSync(`packages/${i}`).isDirectory();
})

async function runParallel(source, iteratorFn) {
  const ret = []
  console.log('aaaaaaaaaaa', source)
  source.forEach(i => {
    const p = iteratorFn(i)
    ret.push(p);
  })
  return Promise.all(ret)
}

async function build(target) {
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {stdio: 'inherit'})
  console.log('打包成功');
}

runParallel(targets, build)