const npg = require("node-pg-migrate");
const measureTime = require("./utils").measureTime;
const genstr = require("./utils").genstr;

let attack_str = "<head" + genstr(10000, " S");

npg(attack_str);

//(.+\(.*\))
