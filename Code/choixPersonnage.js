const { cp } = require("fs");

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function choixPersonnage(){
    let nbrePerso = 0;
    console.log("debut decompression fichier JSON");
    $.getJSON("http://localhost:8888/test.json", function(data){
        for (p of data.personnages){
            nbrePerso+=1;
        }
    });
    return (data.personnages[randomInt(nbrePerso)]);
} 
