function ligneCol(nombre){
    let v1=1,v2=1;
    let html="<table>";
    while (v1*v2 < nombre){
        if((v1+1)*(v1) < v1*(v2+1)){
            v1+=1;
        }
        else {v2+=1}
    }
    let max = Math.max(v1,v2);
    let min = Math.min(v1,v2);
    let compteur = 0;
    console.log([max,min]);
    for (let index = 0; index < min; index++) {
        html += "<tr>";
        for (let index = 0; index < max; index++) {
            if (compteur < nombre){
                html += "<td><img src='avatar.jpg'></td>";
                compteur++;
            }
        }
        html += "</tr>";
    }
    $("#Personnages").append(html);
}