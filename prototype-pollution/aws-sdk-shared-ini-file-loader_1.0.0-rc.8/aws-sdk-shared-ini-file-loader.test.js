//https://security.snyk.io/vuln/SNYK-JS-AWSSDKSHAREDINIFILELOADER-1049304
// test("prototype pollution in @aws-sdk/shared-ini-file-loader", () => {
//     expect({}.polluted).toBe(undefined);
//     var fs = require('fs')
//     var sharedIniFileLoader = require('@aws-sdk/shared-ini-file-loader')

//     var parsed = await sharedIniFileLoader.loadSharedConfigFiles({ filepath: './payload.toml' })
//     // console.log(parsed)
//     // console.log(parsed.proto)
//     // console.log({}.proto)
//     // console.log(polluted)
//     // sleep(2000);
//     expect({}.polluted).toBe("yes");
// });

// var fs = require('fs')
// var sharedIniFileLoader = require('@aws-sdk/shared-ini-file-loader')

// async function main() {
//     var parsed = await sharedIniFileLoader.loadSharedConfigFiles({ filepath: './payload.toml' })
//     console.log(parsed)
//     console.log(parsed.proto)
//     console.log({}.proto)
//     console.log(polluted)
// }
// main()
