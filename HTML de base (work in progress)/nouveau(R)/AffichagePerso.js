const { cp } = require("fs");

function Affichage(){
    let nbElement = 0;
    console.log("debut decompression fichier JSON");
    $.getJSON("http://localhost:8888/test.json", function(data){
        let html = "<table>";
        html += "<tr>";
        for(let d of data.personnages){
            if(nbElement > 4){
                html += "</tr>";
                html += "<tr>";
                nbElement = 0;
            }
            nbElement += 1;
            html += "<td class='caseTableau'><div class='card-container'><div class='card' onclick='this.classList.toggle(`rotated`)'><div class='card-contents card-front'><img src='http://localhost:8888/fichier/";
            html += d.image;
            html += "' class='avatar'></div><div class='card-contents card-back'><img src='https://raw.githubusercontent.com/eric-gilles/Projet_Prog/main/Animation_rotation/back.jpg'></div></div></div><p class='nom'>";
            html += d.nom;
            html += "</p></td>"  
        }
        html += "</table>";
        $("#Personnages").append(html);
    });
}

function changeImage(img){
    if (img.src == "https://raw.githubusercontent.com/eric-gilles/Projet_Prog/main/Codes/avatar.jpg"){
        //console.log("test");
        img.src = "https://raw.githubusercontent.com/eric-gilles/Projet_Prog/main/Codes/back.jpg";
        img.classList.toggle('rotated');
    }else{
        //img.classList.toggle('rotated');
        img.src = "https://raw.githubusercontent.com/eric-gilles/Projet_Prog/main/Codes/avatar.jpg";
        img.classList.toggle('rotated');
    }
}