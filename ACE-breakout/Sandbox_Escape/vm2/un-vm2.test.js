// console.log({}.polluted);

test("Sandbox escape in vm2", () => {
  const { VM } = require("vm2");
  let vmInstance = new VM();
  expect({}.polluted).toBe(undefined);

  let code = (res = eval("this.constructor.prototype.polluted=true"));

  vmInstance.run(code);
  expect({}.polluted).toBe(true);
});
