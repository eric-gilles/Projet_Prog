const { cp } = require("fs");

function Affichage(json){
    let nbElement = 0;
    if (json != null){
        $("#Personnages").empty();
        console.log("debut decompression fichier JSON");
            let html = "<table>";
            html += "<tr>";
            let idImg = 0;
            for(let d of json.personnages){
                if(nbElement > 4){
                    html += "</tr>";
                    html += "<tr>";
                    nbElement = 0;
                }
                nbElement += 1;
                let fonctionChangeImage = `changeImage('`+idImg+`','`+d.image+`','https://raw.githubusercontent.com/eric-gilles/Projet_Prog/main/images/back.jpg')`;
                html += `<td class="caseTableau"><img src='`+d.image+`' class="avatar" id="`+idImg+`"`;
                html += `onclick="`+fonctionChangeImage+`"></div><p class="nom">`;
                html += d.nom;
                html += `</p></td>`;
                idImg += 1;
            }
            html += "</table>";
            $("#Personnages").append(html);
    } 
    else {
        console.log("Aucun fichier json actif");
    }  
}

function changeImage(idImg,oldImageLink,newImageLink){
    document.getElementById(idImg).setAttribute("class","rotated");
    setTimeout(function(){
        document.getElementById(idImg).src = newImageLink;
        document.getElementById(idImg).clientHeight = document.getElementById(idImg).clientWidth;
        document.getElementById(idImg).setAttribute("onclick","changeImage('"+idImg+"','"+newImageLink+"','"+oldImageLink+"')");
        setTimeout(function(){
            document.getElementById(idImg).setAttribute("class","avatar");
        }, 800); 
    }, 800);
}