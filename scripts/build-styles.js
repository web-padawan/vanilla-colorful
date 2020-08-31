const fs = require('fs');
const glob = require('glob');
const util = require('util');

const sass = require('sass');

const renderSass = util.promisify(sass.render);
const writeFile = util.promisify(fs.writeFile);

const delimiter = /<%\s*content\s*%>/;

async function sassToCss(sassFile) {
  const result = await renderSass({
    file: sassFile,
    outputStyle: 'compressed'
  });
  return result.css.toString();
}

const template = 'export default `<% content %>`;\n';

async function sassRender(sourceFile) {
  const replacement = await sassToCss(sourceFile);
  const newContent = template.replace(delimiter, replacement);
  const outputFile = sourceFile.replace('.scss', '.ts');
  return writeFile(outputFile, newContent, 'utf-8');
}

glob('./src/lib/styles/*.scss', (err, files) => {
  files
    .forEach(file => {
      sassRender(file).catch(error => {
        console.error(error);
        process.exit(-1);
      });
    });
});
