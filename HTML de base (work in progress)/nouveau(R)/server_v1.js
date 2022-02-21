var express = require("express");
var fs = require("fs");
var app = express();
app.listen(8888);

app.get('/',function(request,response) {
    console.log("Chargement de la page");
    response.sendFile('QuiEstCe.html',{root: __dirname});
});

app.get('/fichier/:fichier',function(request,response) {
    console.log("Chargement du fichier :");
    console.log(request.params.fichier);
    response.sendFile(request.params.fichier,{root: __dirname});
});

app.get('/:json',function(request,response) {
    console.log("Chargement du fichier JSON");
    let jsonFile = fs.readFileSync(request.params.json,'utf8');
    let parsed = JSON.parse(jsonFile);
    console.log(parsed);
    response.end(JSON.stringify(parsed));
});