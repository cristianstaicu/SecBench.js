//https://github.com/ronomon/opened/commit/7effe011d4fea8fac7f78c00615e0a6e69af68ec#diff-976ef4b0b2d27968b96bcf9067c6619795c18d2edb1264b006f02b59ee839809
test("Command Injection in @ronomon/opened", () => 
{
	const Opened = require('@ronomon/opened');
	const fs = require('fs')
	const path = './ronomon'
	const paths = ['$(touch ronomon)'];
	
	Opened.files(paths,function(error, hashTable) { });

	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
});
