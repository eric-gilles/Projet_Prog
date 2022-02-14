function Affichage(nombre){
    let html = "<table>";
    for(let i=nombre; i>0; i-=5){
        html += "<tr>";
        for(let j=0; j<=5; j++){
            if(nombre>0){
                html += "<td><img src='avatar.jpg' class='avatar'></td>";
                nombre--;
            }
        }
        html += "</tr>";
    }
    html += "</table>";
    $("#Personnages").append(html);
}
