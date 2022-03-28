var nbAttribut=1;
var nbLignes=1;
var nbLignesMax=0;
var nbPersonnage=0;
var nbElement = 0;
var colonne = 0;
var listePersonnages = new Object();
var listeNom = [];


function AjoutAttribut(){
    if(nbAttribut<16){
        let html='<div id="div'+nbAttribut+'">Est-ce que ce/ces personnages <br><input maxlength="23" class="saisieAttributs" type="text" id="attr'+nbAttribut+'"> <i id="suppr'+nbAttribut+'" onclick="SupprAttribut('+nbAttribut+')" class="fa fa-trash-o" style="font-size:24px"></i></br></div>';
        $(".listAttribut").append(html);
        html="<div id='LigneAttr"+nbAttribut+"'class='attributs'>"+(nbAttribut+1)+"ème Attribut</div>";
        let html2="<div><input type='text' class='val' id='valeur"+nbAttribut+"'></br></div>"
        $("#attr").append(html);
        $("#valeurs").append(html2);
        nbAttribut++;  
        if(nbPersonnage==1){//Nombre de ligne est restreint au nombre d'attribut du premier personnage rentré
            nbLignesMax=nbLignes;
        }
    }
    else {
        alert("Avez-vous vraiment besoin d'autant d'attibuts ?");
    }
    AffichageDyn();
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
        if($("#attr"+i).val() != ""){
            $("#LigneAttr"+(i-1)).append($("#attr"+i).val());
        }
        else {
            $("#LigneAttr"+(i-1)).append(i+"ème Attribut");
        }
        $("#suppr"+i).attr("onclick","SupprAttribut("+(i-1)+")");
        $("#attr"+i).attr("id","attr"+(i-1));
        $("#suppr"+i).attr("id","suppr"+(i-1));
        $("#div"+i).attr("id","div"+(i-1));
        $("#valeur"+i).attr("id","valeur"+(i-1));
    }
    nbAttribut--;
    AffichageDyn();
}

var nbPersoPrevious = 0;
//Crée l'objet d'un personnage
function creationObjetPerso(){
    console.log("lancement création Personnage");
    let erreur = false;
    let personnage = new Object();
    console.log("Nombre de personnages : ", nbPersonnage)
    if($("#valeurNom").val() != "" && nbPersoPrevious+1 == nbPersonnage){
        personnage.nom = $("#valeurNom").val();
        personnage.image = document.getElementById(nbPersonnage-1).src;
        personnage.attributs = new Object();
        for(let i=0;i<nbAttribut;i++){
            if($("#attr"+i).val() != ""){
                personnage.attributs[$("#attr"+i).val()] = $("#valeur"+i).val().split(",");
                $("#valeur"+i).val("");
            }
            else {
                erreur = true;
                console.log("Erreur : Attribut null");
                alert("L'un des attributs n'est pas renseigné correctement ou est vide");
            }
        }
        let var1;
        let var2;
        for(let o of listeNom){
            let compteur=0;
            for (let a in listePersonnages[o].attributs) {
                if (listePersonnages[o].attributs[a].length == personnage.attributs[a].length) {
                    let c=0;
                    for (let e of personnage.attributs[a]) {
                        if (listePersonnages[o].attributs[a].includes(e)) {c++;}
                    }
                    if (c==personnage.attributs[a].length) {compteur++;}
                }            
            }
            erreur = (compteur==nbAttribut);
            var1 = JSON.stringify(personnage.attributs);
            var2 = JSON.stringify(listePersonnages[o].attributs);
            if ((var1 == var2) || (personnage.nom == listePersonnages[o].nom)) {
                erreur = true;
                alert("Ce personnage est indéférenciable ou a le même nom qu'un personnage déjà créée");
            }
        }
    } else {
        erreur = true;
        console.log("Erreur : Nombre de personnage non incrémenté");
        alert("Veuillez ajouter une image pour votre personnage");
    }
    if (!erreur) {
        /*for(let i=0;i<nbAttribut;i++){
            personnage.attributs[$("#attr"+i).val()] = $("#valeur"+i).val().split(",");
            $("#valeur"+i).val("");
        }*/
        nbPersoPrevious += 1;
        $("#addAttribut").remove();
        for(let i=0;i<nbAttribut;i++){
            $("#attr"+i).prop("disabled",true);
            if(i>0) {
                $("#suppr"+i).remove();
            }
        }
        console.log("Pas d'erreur, le perso crée est :");
        console.log(personnage);
        listePersonnages[$("#valeurNom").val()] = personnage;
        listeNom.push($("#valeurNom").val());
        console.log(listePersonnages);
        console.log(listeNom);
        $("#valeurNom").val("");
        $("#importButton").prop("disabled",false);
    } 
    else {
        nombrePersonnages--;
    }
}

function supprimerPerso(){
    nbPersonnage--;
    nbPersoPrevious--;
    $("#td"+(nbPersonnage)).remove();
    Reflect.deleteProperty(listePersonnages, listeNom[nbPersonnage]);
    listeNom.splice(nbPersonnage, 1);
    $("#importButton").prop("disabled",false);
}

//Convertit les personnages en un objet JSON
function conversionJSON(){
console.log("Liste des personnages : \n"+listePersonnages);
    var json = new Object();
    json.personnages = [];
    let index = 0;
    for(let o of listeNom){
        console.log(o);
        console.log(listePersonnages[o]);
        json.personnages.push(listePersonnages[o]);
        index += 1;
    }
    downloadObjectAsJson(json,"GrillePersonnageUtilisateur");
}

//fonction d'ajout des images et affichage dans le tableau
function importIMG(){
    console.log("addimg option:selected : "+$("#addimg option:selected").val());
    if($("#addimg option:selected").val()==1) {
        file = document.getElementById("file");
        if (file.files && file.files[0]) {
            $("#importButton").prop("disabled",true);
            var fr = new FileReader();
            fr.onload = function (e) {
                nbElement++;
                if(nbElement == 5) {
                    $("#table").find('tbody').append('<tr></tr>');
                }
                var x = document.createElement("img");
                x.setAttribute("src", e.target.result);//lien d'environ 62000 caractères
                x.setAttribute("class", "avatar");
                x.setAttribute("id", nbPersonnage);
                document.getElementById("table").rows[colonne].insertCell(-1).appendChild(x);
                $("#"+nbPersonnage).parent().attr("id", "td"+nbPersonnage);
                $("#"+(nbPersonnage)).after("<p id='nom"+nbPersonnage+"'></p>");
                nbPersonnage++;
                AffichageDynNom();
                for(let i=0;i<nbPersonnage;i++){
                    let width = document.getElementById(i).clientWidth;
                    document.getElementById(i).style.height = (width+0)+"px";
                }
            };
            fr.readAsDataURL(file.files[0]);
            if (nbElement == 5) {
                colonne++;
                nbElement = 0;
            }
        } 
    }
    else {
        if ($("#addimg option:selected").val()==2 && $("#url").val()!="") {
            $("#importButton").prop("disabled",true);
            nbElement++;
            if(nbElement == 5) {
                $("#table").find('tbody').append('<tr></tr>');
            }
            var x = document.createElement("img");
            x.setAttribute("src",  $("#url").val());
            x.setAttribute("class", "avatar");
            x.setAttribute("id", nbPersonnage);
            document.getElementById("table").rows[colonne].insertCell(-1).appendChild(x);
            $("#"+nbPersonnage).parent().attr("id", "td"+nbPersonnage);
            $("#"+(nbPersonnage)).after("<p id='nom"+nbPersonnage+"'></p>");
            nbPersonnage++;
            if (nbElement == 5) {
                colonne++;
                nbElement = 0;
            }
        }
    }
    AffichageDynNom();
    for(let i=0;i<nbPersonnage;i++){
        let width = document.getElementById(i).clientWidth;
        document.getElementById(i).style.height = (width+0)+"px";
    }
}

//Téléchargement d'un fichier json
function downloadObjectAsJson(Obj, Name){
    var data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(Obj));
    var download = document.createElement('a');
    download.setAttribute("href", data);
    download.setAttribute("download", Name + ".json");
    document.body.appendChild(download); //Obligatoire avec firefox
    download.click();
    download.remove();
}

function addImg(){
    if($("#file").length>0) $("#file").remove();
    if($("#url").length>0) $("#url").remove();
    var choix=$("#addimg option:selected").val();
    if(choix==1) {
        $("<input type='file' id='file' title='Choisir une image.'>").insertAfter("#addimg");
    }
    else if(choix==2) {
        $("<input type='url' id='url' title='Choisir une image via Url.'>").insertAfter("#addimg");
    }
}