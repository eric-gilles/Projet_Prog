// const { cp } = require("fs");
function randomInt(max) {
    return Math.floor(Math.random() * max);
}



var indexBonneReponse = 0;
var jsonObject;
//On fixe le nombre d'essais du mode Normal
const nbEssaisNormal = 3;
var nbEssais = nbEssaisNormal;




//Choix du personnage caché, son index sera placé dans "indexBonneReponse"
//Cette fonction ajoute aussi un variable "jsonObject" qui contient l'objet json parsé
function ChoixPersonnage(json){
    var nbrePerso = 0;
    for ( p of json.personnages){  
        nbrePerso+=1;   
    }   
    indexBonneReponse = randomInt(nbrePerso); 
    jsonObject = json;
    console.log("La bonne réponse est :"+indexBonneReponse);
    return indexBonneReponse;
}





//Fonction qui lance le mode facile (en cours)
function LancementFacile(){
    document.getElementById("MODE FACILE").remove();
    nbEssais += 2;
} 





//Liste des personnages à proposer comme réponse
function GenerationChoix(json){
    let html = "<option>...</option>";
    for(let d of json.personnages){
        html += "<option>"+d.nom+"</option>";
    }
    $("#essai").append(html);
} 






//Affichage du personnage proposé à l'essai
function AfficherPersoEssais(){
    var select = document.getElementById('essai');
    console.log("changement affichage : perso tentative");
    document.getElementById("ImagePersoTentative").src = jsonObject.personnages[select.selectedIndex-1].image;
    $("#NbEssai").empty();
    document.getElementById("NbEssai").append("Nombre de tentatives restantes: "+nbEssais);
} 





//Test si le personnage proposé à l'essai est la bonne réponse et déduit le nombre d'essais restants
function TestPerso(){
    var select = document.getElementById('essai');
    console.log("Nombre d'essais restants: "+nbEssais);
    console.log("La réponse actuel est : "+select.selectedIndex-1);
    console.log("La bonne réponse est: "+indexBonneReponse);
    if ((select.selectedIndex-1 == indexBonneReponse)&&(nbEssais>0)){
        alert("Bravo ! Vous avez gagnez !");
    }else if (nbEssais==0){
        if (confirm("Fin du Jeu ! Perdu ! La bonne réponse était: "+jsonObject.personnages[indexBonneReponse].nom)){
            nbEssais = nbEssaisNormal;
        }
    }
    else{
        nbEssais--;
        if (nbEssais==0){
            if (confirm("Fin du Jeu ! Perdu ! La bonne réponse était: "+jsonObject.personnages[indexBonneReponse].nom)){
                nbEssais = nbEssaisNormal;
            }
        }
    }
    $("#NbEssai").empty();
    document.getElementById("NbEssai").append("Nombre de tentatives restantes: "+nbEssais);
}






//Intialise les questions que pourra poser le joueur (la 1ère liste déroulante)
function InitialisationQuestion(){
    $(document).ready(function() {
        var x = 0;
        var max_questions = 10;
        var div = $("#Questions");
        var add_button = $("#addquestion");
        $("#attr0").append("<option>...</option>");
        for(let a in jsonObject.personnages[0].attributs){
            let html1="";
            html1+="<option id='"+a+"'>"+a+"</option>";
                
            $("#attr0").append(html1);
        }
    
        $(add_button).click(function(e) {
            e.preventDefault();
            var html="<option>...</option>";
            if (x < max_questions) {
                x++;
                    for(let a in jsonObject.personnages[0].attributs){
                        html+="<option id='"+a+"'>"+a+"</option>";
                    }
                    $(div).append('<div><select id="c'+(x-1)+'">\n\t<option>ET</option>\n\t<option>OU</option>\n</select>\n<br>Est-ce que <select id="attr'+(x-1)+'" onchange="">'+html+'</select><select id="valeur'+(x-1)+'"></select>?<a href=# class=delete>supprimer</a></select></div>'); //add select     
                    $("#attr"+(x-1)).attr("onchange","selectVal("+(x-1)+")");
                    $("#valider").attr("onclick","traitement("+x+")");
            } else alert('Vous avez assez de questions là! Ca va oui non mais Oh! Vous vous croyez où ?')
        });
    
        $(div).on("click", ".delete", function(e) {
            e.preventDefault();
            $(this).parent('div').remove();
            x--;
            $("#valider").attr("onclick","traitement("+x+")");
        }); 
    });
} 







//Affiche les valeurs en options pour chaque attribut séléctionné (la 2nde liste déroulante)
function selectVal(i){
    var value=[]; 
    var html="";
    var cptValeur=0;
    var Selected;
    $("#valeur"+i+">option").remove();
    SelectedIndex = document.getElementById('attr'+i).selectedIndex;
    Selected=document.getElementById('attr'+i).options[SelectedIndex].value;
    for(let p of jsonObject.personnages){
        for(let a in p.attributs){
            if(Selected==a){ //si l'attribut selectionné correspond alors...   
                if(value.length==0){ //si le tableau est vide alors je rentre la valeur
                    for(valeur of p.attributs[a]){        
                        value.push(valeur);
                        html+="<option id='value"+cptValeur+"'>"+valeur+"</option>";
                        cptValeur++;
                    }
                } 
                else{
                    for(valeur of p.attributs[a]){
                        if(!value.includes(valeur)){ 
                            value.push(valeur);
                            html+="<option id='value"+cptValeur+"'>"+valeur+"</option>";
                            cptValeur++;   
                        }
                    } 
                } 
            } 
        }  
    }
    $("#valeur"+i).append(html);
}







//Logique des questions : rend une valeur booléenne
function traitement(nbQuestions){
    SelectedAttributs=$("#attr0").val();
    SelectedValue=$("#valeur0").val();
    let reponse = TraitementUneQuestion(SelectedAttributs,SelectedValue);
    //console.log("réponse finale pour une question : "+reponse);         
    if(nbQuestions > 1){ //pour plusieurs questions
        console.log("plusieurs questions");
        for(let i=1;i<nbQuestions;i++){
            SelectedAttributs=$("#attr"+i).val();
            SelectedValue=$("#valeur"+i).val();
            console.log(document.getElementById("c"+i));
            if(document.getElementById("c"+i).options[document.getElementById("c"+i).selectedIndex].value=="ET"){
                reponse=(reponse && TraitementUneQuestion(SelectedAttributs,SelectedValue));
                //console.log("Le ET de plusieurs questions "+reponse);
            }   
            else{
                reponse=(reponse ||  TraitementUneQuestion(SelectedAttributs,SelectedValue));
                //console.log("Le OU de plusieurs questions "+reponse);
            }         
        } 
    }
    console.log("réponse finale pour une question : "+reponse);
} 

function TraitementUneQuestion(SelectedAttributs,SelectedValue){
    reponse = false;
    for(let value of jsonObject.personnages[indexBonneReponse].attributs[SelectedAttributs]){
        reponse=(reponse ||  (value==SelectedValue));
    }
    return reponse
} 