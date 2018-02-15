var express = require('express');
var app = express();
var server = app.listen(1009, encender);

function encender() {
  console.log('Estas en weather ...');
}
app.use(express.static('public'));