function Affichage(){
    console.log("coucou j'existe");
    let nbElement = 0;
    console.log("debut decompression fichier JSON");
    $.getJSON("http://localhost:8888/test.json", function(data){
        console.log("je suis dans le getJSON");
        $.each( data, function() {
            nbElement ++;
          });
    });
    console.log("fin debut decompression fichier JSON");
    let html = "<table>";
    for(let i=nbElement; i>0; i-=5){
        html += "<tr>";
        for(let j=0; j<=5; j++){
            if(nbElement>0){
                html += "<td><img src='avatar.jpg' class='avatar'></td>";
                nbElement--;
            }
        }
        html += "</tr>";
    }
    html += "</table>";
    $("#Personnages").append(html);
}

