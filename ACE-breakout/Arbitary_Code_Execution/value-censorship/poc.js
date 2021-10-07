const censor = require('value-censorship')

censor(`
((async function(){}).constructor("42"))()
`)
