let basicCTypes = [
  "int",
  "long",
  "char",
  "short",
  "double",
  "float",
  "unsigned",
  "signed",
  "void",
  "bool",
];
function cTypes(identifier) {
  return (
    basicCTypes.propertyIsEnumerable(identifier) || /.+_t$/.test(identifier)
  );
}
test("ReDos in codemirror", () => {
  const genstr = require("../utils").genstr;
  const measureTime = require("../utils").measureTime;
  let str = genstr(65536, "a");
  let t = measureTime(function () {
    cTypes(str);
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
