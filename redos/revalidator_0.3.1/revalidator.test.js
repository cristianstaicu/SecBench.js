//https://securitylab.github.com/advisories/GHSL-2020-352-redos-revalidator/
test("ReDos in revalidator", () => {
  const revalidator = require("revalidator");
  const measureTime = require("./utils").measureTime;

  var myObj = {
    url: "ftp://0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.",
  };

  let t = measureTime(function () {
    revalidator.validate(myObj, {
      properties: {
        url: {
          description: "the url the object should be stored at",
          type: "string",
          format: "url",
          required: true,
        },
      },
    });
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
