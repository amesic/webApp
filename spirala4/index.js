var express=require("express");
var controller=require('./public/controllers/controller');
const path = require('path');
var bodyParser=require('body-parser');

var app=express();
//ejs
app.set('view engine', 'ejs');
//public folder
app.use(express.static(path.join(__dirname, "public")));
//pdf
app.use('/pdf',express.static('./public/uploads'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

controller(app);
 app.listen(8080);
 