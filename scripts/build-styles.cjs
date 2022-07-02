const fs = require('fs');
const glob = require('glob');
const util = require('util');

const csso = require('csso');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

const delimiter = /<%\s*content\s*%>/;

async function minifyCss(cssFile) {
  const data = await readFile(cssFile, 'utf8');
  const result = csso.minify(data);
  return result.css;
}

const template = 'export default `<% content %>`;\n';

async function processFile(sourceFile) {
  const replacement = await minifyCss(sourceFile);
  const newContent = template.replace(delimiter, replacement);
  const outputFile = sourceFile.replace('.css', '.ts');
  return writeFile(outputFile, newContent, 'utf-8');
}

glob('./src/lib/styles/*.css', (err, files) => {
  files
    .forEach(file => {
      processFile(file).catch(error => {
        console.error(error);
        process.exit(-1);
      });
    });
});
