//https://snyk.io/vuln/SNYK-JS-PORTKILLER-1078537
test("Command Injection in wincred", () => 
{
	const wincred = require('wincred');
	const fs = require('fs')
	const path = './wincred'
	
	wincred.getCredential("|| touch wincred");


	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
});
