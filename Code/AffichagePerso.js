const { cp } = require("fs");

function Affichage(){
    let nbElement = 0;
    console.log("debut decompression fichier JSON");
    $.getJSON("http://localhost:8888/test.json", function(data){
        let html = "<table>";
        html += "<tr>";
        let idImg = 0;
        for(let d of data.personnages){
            if(nbElement > 4){
                html += "</tr>";
                html += "<tr>";
                nbElement = 0;
            }
            nbElement += 1;
            let imageLink = `http://localhost:8888/fichier/`+d.image;
            let fonctionChangeImage = `changeImage('`+idImg+`','`+imageLink+`','https://raw.githubusercontent.com/eric-gilles/Projet_Prog/main/Animation_rotation/back.jpg')`;
            html += `<td class="caseTableau"><img src='`+imageLink+`' class="avatar" id="`+idImg+`"`;
            html += `onclick="`+fonctionChangeImage+`"></div><p class="nom">`;
            html += d.nom;
            html += `</p></td>`;
            idImg += 1;
        }
        html += "</table>";
        $("#Personnages").append(html);
    });
}



function changeImage(idImg,oldImageLink,newImageLink){
    document.getElementById(idImg).setAttribute("class","rotated");
    setTimeout(function(){
        document.getElementById(idImg).src = newImageLink;
        console.log(document.getElementById(idImg).clientHeight);
        console.log(document.getElementById(idImg).clientWidth);
        document.getElementById(idImg).clientHeight = document.getElementById(idImg).clientWidth;
        document.getElementById(idImg).setAttribute("onclick","changeImage('"+idImg+"','"+newImageLink+"','"+oldImageLink+"')");
        document.getElementById(idImg).setAttribute("class","avatar");
    }, 1000);
}