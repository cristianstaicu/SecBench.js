test("Arbitrary code execution in mobile-icon-resizer", (done) => {
  expect.assertions(2);
  const fs = require("fs");
  const pathM = require("path");
  const resize = require("mobile-icon-resizer");
  const path = "./mobile-icon-resizer";
  
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  
  let options = {
    config: pathM.resolve(__dirname, "./config")
  };
  
  try {
    resize(options, function (err) {});
  } catch (e) {console.log(e)}
  
  file_exist = fs.existsSync(path);
  
  setTimeout(() => {
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
    done();
  }, 500);
});
