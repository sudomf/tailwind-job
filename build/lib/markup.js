const fs = require('fs');
const path = require('path');
const posthtml = require('posthtml');
const renderAST = require('posthtml-render');
const minify = require('html-minifier').minify;
const { readFile, writeFile } = require('./utils');
const { ENV } = require('./constants');

const { SOURCE_HTML, TARGET_HTML, COMPONENTS_PATH } = require('./constants');
const EXP_REG = /\{\{([^]*?)\}\}/gi;
const Cache = new Map();

const getComponentHTML = (name) => {
  const fileName = name.replace('c-', '') + '.html';
  const hasCache = Cache.has(fileName);

  const contents = hasCache
    ? Cache.get(fileName)
    : fs.readFileSync(path.join(COMPONENTS_PATH, fileName), 'utf-8');

  if (!hasCache) Cache.set(fileName.contents);

  return contents;
};

const parseExpression = (exp, ctx) =>
  eval(`
    const ctx = ${JSON.stringify(ctx)};
    const content = key => require('../../src/content/' + key + '.json');
    const result = eval(${JSON.stringify(exp)});
    typeof result !== 'undefined' ? result : '';
  `);

const parseExpressions = (html, ctx) =>
  html.replace(EXP_REG, (_, group) => parseExpression(group, ctx));

const sanitizeAttrs = (attrs) =>
  Object.entries(attrs).reduce(
    (memo, [key, value]) => ({
      ...memo,
      [key]: value
        .replace(/^(?:[\t ]*(?:\r?\n|\r))+/gi, ' ')
        .replace(/\s\s+/gi, ' ')
        .trim(),
    }),
    {}
  );

const renderComponent = (node) => {
  node.attrs = node.attrs || {};

  const children = node.content ? renderAST(node.content) : '';
  const ctx = { ...node.attrs, children };

  let html = getComponentHTML(node.tag);
  html = parseExpressions(html, ctx);

  const parsed = posthtml()
    .use((tree) => render(tree, ctx))
    .process(html, { sync: true });

  const newNode = parsed.tree[0];

  const alpineProps = Object.entries(node.attrs).reduce(
    (memo, [key, value]) => {
      if (key.startsWith('@') || key.startsWith('x-')) memo[key] = value;

      return memo;
    },
    {}
  );

  newNode.attrs = newNode.attrs || {};
  newNode.attrs = { ...newNode.attrs, ...alpineProps };
  newNode.attrs = sanitizeAttrs(newNode.attrs);

  return newNode;
};

const render = (tree) => {
  return tree.match({ tag: /^c-/ }, (node) => {
    return renderComponent(node);
  });
};

const build = async () => {
  const source = await readFile(SOURCE_HTML, 'utf-8');
  const result = await posthtml()
    .use((tree) => render(tree))
    .process(source);

  let html = result.html;

  if (ENV === 'production')
    html = minify(html, {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      minifyJS: true,
    });

  await writeFile(TARGET_HTML, html, 'utf-8');
};

module.exports.build = build;
