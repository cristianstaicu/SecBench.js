let Koa = require('koa');
let swagger = require('swagger-injector');
 
let app = new Koa();
 
app.use(swagger.koa({
  path: `${__dirname}/node_modules/swagger-injector/tests/swagger.json`,
}));
 
app.listen(3000);