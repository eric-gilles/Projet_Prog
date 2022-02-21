const { cp } = require("fs");

function Affichage(){
    let nbElement = 0;
    console.log("debut decompression fichier JSON");
    $.getJSON("http://localhost:8888/test.json", function(data){
        for(let i in data.personnages){
            nbElement+=1;
        }
        console.log("Nombre d'élements : "+nbElement);
        console.log("fin debut decompression fichier JSON");
        let html = "<table>";
        console.log("Début For");
        for(let i=nbElement; i>0; i-=5){
            console.log("For in progress");
            html += "<tr>";
            for(let j=0; j<=5; j++){
                if(nbElement>0){
                    html += "<td><img src=";
                    html += i.image;
                    html += " class='avatar'></td>";
                    nbElement--;
                }
            }
            html += "</tr>";
        }
        console.log("Fin For");
        html += "</table>";
        $("#Personnages").append(html);
    });
}

