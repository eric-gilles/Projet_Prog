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

//Test
const nbEssaisNormal = 3;
var nbEssais = nbEssaisNormal;
function TestPerso(var index){
    $.getJSON("http://localhost:8888/test.json", function(data){
        let html = "<option>...</option>";
        for(let d of data.personnages){
            html += "<option>"+d.nom+"</option>";
        }
        $("#essai").append(html);
    });
    var select = document.getElementById('essai');
    console.log(nbEssais);
    if ((select.selectedIndex == index)&&(nbEssais>0)){
        alert("Bravo ! Vous avez gagnez ! Vous êtes trop fort");
    }else if (nbEssais==0){
        if (confirm("Fin du Jeu ! Perdu ! Vous êtes vraiment nul ! Reset :")){
            nbEssais = nbEssaisNormal;
        }
    }
    else{
        nbEssais--;
    }
}
