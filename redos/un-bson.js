const BSON = require("bson");
// const { genstr } = require('./utils');

// attack_str = genstr(10000,"s");
// BSON.parse(attack_str);

const Decimal128 = BSON.Decimal128;

// Serialize a document
const doc = { long: Decimal128.fromString("1") };
const data = BSON.serialize(doc);
