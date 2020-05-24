const { build: buildCSS } = require('./lib/styles');
const { build: buildHTML } = require('./lib/markup');

const onlyStyles = process.argv.includes('--styles');
const onlyMarkup = process.argv.includes('--markup');
const buildAll = !onlyStyles && !onlyMarkup;

async function build() {
  const tasks = Promise.all([
    (buildAll || onlyStyles) && buildCSS(),
    (buildAll || onlyMarkup) && buildHTML()
  ].filter(Boolean));

  await tasks;
}

build().then().catch();
