const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const nano = require('cssnano');
const { readFile, writeFile } = require('./utils');

const { ENV, SOURCE_CSS, TARGET_CSS } = require('./constants');

const build = async () => {
  const css = await readFile(SOURCE_CSS);
  const plugins = [tailwindcss];

  if(ENV === 'production'){ 
    plugins.push(autoprefixer);
    plugins.push(nano);
  }

  const result =  await postcss(plugins)
    .process(css, { from: SOURCE_CSS, to: TARGET_CSS });

  return writeFile(TARGET_CSS, result.css, () => true);
};

module.exports.build = build;
