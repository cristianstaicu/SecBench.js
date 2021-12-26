function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}
async function main() {
  var a = require("compile-sass");
  a.setupCleanupOnExit("& touch aaa");
  console.log("Press Ctrl-C in 3 seconds...");
  await sleep(3000);
}
main();
//have to do control c in between program...
