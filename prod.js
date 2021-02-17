var express = require('express');
var path = require("path");
var app = express(); // better instead
app.use(express.static(path.join(__dirname, 'build'))); //  "public" off of current is root
app.listen(8083);