var nbAttribut=1;
var nbLignes=1;
var nbLignesMax=0;
var nbPersonnage=0;
var nbElement = 0;
var colonne = 0;
var listePersonnages;// = new object();

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

//Crée l'objet d'un personnage
function creationObjetPerso(){
    let erreur = false;
    if($("valeurNom").val != null && $((nbPersonnage-1).toString()).src != null){
        var personnage = new Object();
        personnages.nom = $("valeurNom").val;
        personnages.image = $((nbPersonnage-1).toString()).src;
        personnages.attributs = new object();
        for(let i=0;i<nbAttribut;i++){
            if(personnages.attributs[$("attr"+i).val] != null &&  $("valeur"+i) != null){
                personnages.attributs[$("attr"+i).val] = $("valeur"+i).split(",");
            }
            else {erreur = true;}
        }
    } else {erreur = true;}
    if (!erreur) {listePersonnages[$("valeurNom").val] = personnage;}
}

//Convertit les personnages en un objet JSON
function conversionJSON(){
    var json = new object();
    json.personnages = [];
    let index = 0;
    for(let o of listePersonnages){
       json.personnages[index] = o;
       index += 1; 
    }
    downloadObjectAsJson(json,"GrillePersonnageUtilisateur");
}

//fonction d'ajout des images et affichage dans le tableau
function importIMG(){
    let input = document.getElementById("file");
    if (input.files && input.files[0]) {
        var fr = new FileReader();
        fr.onload = function (e) {
        nbElement++;
        if(nbElement == 5) $("#table").find('tbody').append('<tr></tr>');
        var x = document.createElement("img");
        x.setAttribute("src", e.target.result);//lien d'environ 62000 caractères
        x.setAttribute("class", "avatar");
        x.setAttribute("id", nbPersonnage);
        document.getElementById("table").rows[colonne].insertCell(-1).appendChild(x);
        $("#"+(nbPersonnage)).after("<p id='nom"+nbPersonnage+"'>jnsdfndsjfosdjoijf <i class='fa fa-trash-o' style='font-size:24px'></i></p>");
        nbPersonnage++;
    };
    fr.readAsDataURL(input.files[0]);
        if (nbElement == 5) {
            colonne++;
            nbElement = 0;
        }
    }
}

//Téléchargement d'un fichier json
function downloadObjectAsJson(Obj, Name){
    var data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(Obj));
    var download = document.createElement('a');
    download.setAttribute("href", data);
    download.setAttribute("download", Name + ".json");
    document.body.appendChild(download); // required for firefox
    download.click();
    download.remove();
}