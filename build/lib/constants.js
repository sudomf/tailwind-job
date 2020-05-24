const path = require('path');
const env = process.argv[2] || '--production';
const isProduction = env === '--production';

module.exports.ENV = isProduction ? 'production' : 'development';
module.exports.SRC_PATH = path.resolve('src');
module.exports.PUBLIC_PATH = path.resolve('public');
module.exports.COMPONENTS_PATH = path.join(this.SRC_PATH, 'components');
module.exports.SOURCE_HTML = path.join(this.SRC_PATH, 'index.html');
module.exports.TARGET_HTML = path.join(this.PUBLIC_PATH, 'index.html');
module.exports.SOURCE_CSS = path.join(this.SRC_PATH, 'index.css');
module.exports.TARGET_CSS = path.join(this.PUBLIC_PATH, 'index.css');
