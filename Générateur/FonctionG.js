var nbAttribut=1;
var nbLignes=1;
var nbLignesMax=0;
var nbPersonnage=0;
function AjoutAttribut(){
    let html='<div id="div'+nbAttribut+'"><input type="text" id="attr'+nbAttribut+'"><input onclick="SupprAttribut('+nbAttribut+')" id="suppr'+nbAttribut+'" class="supprA" type="button" value="-"></br></div>';
    $(".listAttribut").append(html);
    html="<div id='LigneAttr"+nbAttribut+"'class='attributs'>Attribut "+nbAttribut+":</div>";
    let html2="<div><input type='text' class='val' id='valeur"+nbAttribut+"'></br></div>"
    $("#attr").append(html);
    $("#valeurs").append(html2);
    nbAttribut++;
    if(nbPersonnage==1){//Nombre de ligne est restreint au nombre d'attribut du premier personnage rentré
        nbLignesMax=nbLignes;
    }
}
function SupprAttribut(indiceA){
    if(nbPersonnage==1){ //Nombre de ligne est restreint au nombre d'attribut du premier personnage rentré
        nbLignesMax=nbLignes;
    }
    $("#div"+indiceA).remove();
    $("#valeur"+indiceA).parent("div").remove();
    $("#LigneAttr"+indiceA).remove();
    for(let i=indiceA+1;i<nbAttribut;i++){
        $("#LigneAttr"+i).empty();
        $("#LigneAttr"+i).attr("id","LigneAttr"+(i-1));
        html="<div id='LigneAttr"+(i-1)+"'class='attributs'>Attribut "+(i-1)+":</div>";
        console.log(html);
        $("#LigneAttr"+(i-1)).append(html);
        $("#suppr"+i).attr("onclick","SupprAttribut("+(i-1)+")");
        $("#attr"+i).attr("id","attr"+(i-1));
        $("#suppr"+i).attr("id","suppr"+(i-1));
        $("#div"+i).attr("id","div"+(i-1));
        $("#valeur"+i).attr("id","valeur"+(i-1));
    }
    nbAttribut--;
}
// //doit prendre toutes les valeurs et les attributs pour faire un dictionnaire comment dans les fichiers JSON
// function getValues(){ 
//     let dicoPersonnage={"nom":$("#valeurNom").val(),"image":$(nbPersonnage-1).attr("src"),"attributs":null}
//     let dicoAttribut={}
//     for(let i=0;i<nbLignes){}
// }
