var heu = require('heroku-exec-util');
heu.ssh({args:{}},'test; touch HACKED; #','','test',{path:'test'})

