var express = require('express');
var app = express();
app.use(express.static('dist/todo-ui'));
app.get('/', function (req, res,next) {
    res.redirect('/');
});
app.listen(4200)