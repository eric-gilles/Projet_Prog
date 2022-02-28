
function ligneCol(nombre) {
    let v1 = 1,
        v2 = 1;
    let html = "<table>";
    while (v1 * v2 < nombre) {
        if ((v1 + 1) * (v1) < v1 * (v2 + 1)) {
            v1 += 1;
        } else { v2 += 1 }
    }
    let max = Math.max(v1, v2);
    let min = Math.min(v1, v2);
    let compteur = 0;
    console.log([max, min]);
    card="<div class='card-container'><div class='card' onclick='this.classList.toggle(`rotated`)'><div class='card-contents card-front'><img src='https://raw.githubusercontent.com/eric-gilles/Projet_Prog/main/Codes/avatar.jpg'></div><div class='card-contents card-back'><img src='https://raw.githubusercontent.com/eric-gilles/Projet_Prog/main/Codes/back.jpg' style='height:450px;width:450px;'></div></div></div>";
    for (let index = 0; index < min; index++) {
        html += "<tr>";
        for (let index = 0; index < max; index++) {
            if (compteur < nombre) {
                html += "<td>"+card+"</td>";
                compteur++;
            }
        }
        html += "</tr>";
    }
    $("#Personnages").append(html);
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
