var express = require("express");
var app = express();
var fs = require("fs");
app.listen(8888);

app.get('/', function(request, response) {
    response.sendFile('HTML.html', {root: __dirname});
});

app.get('/:nomFichier',function(request,response) {
    response.sendFile(request.params.nomFichier,{root:__dirname});
});

app.get('/json',function(request, response) {
    response.sendFile('grille.json', {root: __dirname});
});