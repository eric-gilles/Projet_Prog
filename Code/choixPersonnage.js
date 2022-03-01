// const { cp } = require("fs");
function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function ChoixPersonnage(json){
    var nbrePerso = 0;
    for ( p of json.personnages){  
        nbrePerso+=1;   
    }    
    return randomInt(nbrePerso);
}
