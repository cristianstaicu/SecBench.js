
// regex :   if (/^(?:\w+\.\w{2,})+(?:\/.*|$)/.test(url)) {
//https://github.com/pocketly/node-sanitize/commit/4fd57530367ea9f2570b1e57d1a1a32e7f5d644f#
const san = require('sanitize');
san('wwwww.abc.com/abc')