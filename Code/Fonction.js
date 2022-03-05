// const { cp } = require("fs");
function randomInt(max) {
    return Math.floor(Math.random() * max);
}



var ModeDouble=false;
var persoCache1 = 0;
var persoCache2 = 0;
var jsonObject;
//On fixe le nombre d'essais du mode Normal
const nbEssaisNormal = 3;
var nbEssaisModeDouble=nbEssaisNormal*2;
var nbEssais = nbEssaisNormal;
var nbrePerso = 0;
var personnage1trouve=false;
var personnage2trouve=false;



//Choix du personnage caché, son index sera placé dans "persoCache1"
//Cette fonction ajoute aussi un variable "jsonObject" qui contient l'objet json parsé
function ChoixPersonnage(json){
    for ( p of json.personnages){  
        nbrePerso+=1;   
    }   
    persoCache1 = randomInt(nbrePerso); 
    jsonObject = json;
    console.log("La bonne réponse est :"+persoCache1);
    $("#valider").attr("onclick","traitementAffichage(1,"+persoCache1+"),RetournementAutomatique()");
    return persoCache1;
}

function ChoixPersonnage2(){
    do{
        persoCache2=randomInt(nbrePerso);
    }
    while(persoCache1==persoCache2)  
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
    if(jsonObject.personnages[select.selectedIndex-1] == null){
        document.getElementById("ImagePersoTentative").src = "";
    } 
    else{
        document.getElementById("ImagePersoTentative").src = jsonObject.personnages[select.selectedIndex-1].image;
    } 
    $("#NbEssai").empty();
    document.getElementById("NbEssai").append("Nombre de tentatives restantes: "+nbEssais);
} 





//Test si le personnage proposé à l'essai est la bonne réponse et déduit le nombre d'essais restants
function TestPerso(){
    var select = document.getElementById('essai');
    if(!ModeDouble){
        if ((select.selectedIndex-1 == persoCache1)&&(nbEssais>0)){
            alert("Bravo ! Vous avez gagnez !");
            location.reload()
        }else if (nbEssais==0){
            if (confirm("Fin du Jeu ! Perdu ! La bonne réponse était: "+jsonObject.personnages[persoCache1].nom)){
                nbEssais = nbEssaisNormal;
            }
        }
        else{
            nbEssais--;
        }
        $("#NbEssai").empty();
        document.getElementById("NbEssai").append("Nombre de tentatives restantes: "+nbEssais);
    } 
    else{
        if ((nbEssais>0)){
            if((select.selectedIndex-1) == persoCache1){
                personnage1trouve=true;
            }
            if((select.selectedIndex-1) == persoCache2){
                personnage2trouve=true;
            }
            // console.log(personnage2trouve && personnage1trouve);

            if(personnage1trouve && personnage2trouve){
                alert("Fin du jeu ! vous avez trouvé les deux personnages ! Bravo !");
                location.reload()
            }else{
                if(personnage1trouve || personnage2trouve){
                    alert("Vous avez trouvé un des personnages ! Bravo plus que 1 !");
                    nbEssais--;
                } 
            }
              
            
        }else if (nbEssais==0){
            if (confirm("Fin du Jeu ! Perdu ! Les bonnes réponses étaient: "+jsonObject.personnages[persoCache1].nom)+"et"+jsonObject.personnages[persoCache2].nom){
                nbEssais = nbEssaisNormal;
            }
        }
        
        $("#NbEssai").empty();
        document.getElementById("NbEssai").append("Nombre de tentatives restantes: "+nbEssais);
    } 
    
}






//Intialise les questions que pourra poser le joueur (la 1ère liste déroulante)
function InitialisationQuestion(){
    $(document).ready(function() {
        var x = 1;
        var max_questions = 10;
        var div = $("#Questions");
        var add_button = $("#addquestion");
        var firstTime=true;
        $("#attr0").append("<option>...</option>");
        for(let a in jsonObject.personnages[0].attributs){
            let html1="";
            html1+="<option id='"+a+"'>"+a+"</option>";
                
            $("#attr0").append(html1);
        }
    
        $(add_button).click(function(e) {
            e.preventDefault();
            var html="<option>...</option>";
            if(ModeDouble && firstTime){ //x doit revenir à la première question quand on change en mode double
                x=1;
                firstTime=false;
            }
            if (x < max_questions) {
                x++;
                for(let a in jsonObject.personnages[0].attributs){
                    html+="<option id='"+a+"'>"+a+"</option>";
                }
                if(ModeDouble){
                   $(div).append('<div><select id="c'+(x-1)+'">\n\t<option>ET</option>\n\t<option>OU</option>\n</select>\n<br>Est-ce que <select id="Predicat'+(x-1)+'"><option>...</option><option>au moins un des personnages</option><option>les deux personnages</option><option>aucun des personnages</option></select><select id="attr'+(x-1)+'" onchange="">'+html+'</select><select id="valeur'+(x-1)+'"></select>?<a href=# class=delete>supprimer</a></select></div>'); //add select
                } 
                else { 
                    let htmlBis = '<div> <select id="c'+(x-1)+'">'; //Création du select du ET | OU
                    htmlBis += '<option>ET</option> <option>OU</option> </select>'; //Création des options du ET | OU
                    htmlBis += '</br>Est-ce que ce/ces personnages <select id="attr'+(x-1)+'">'; //Création de la partie 1 de la question
                    htmlBis += html+'</select><select id="valeur'+(x-1)+'"></select> ?'; //Création de la partie 2 de la question
                    htmlBis += '<a href=# class=delete>supprimer</a> </select> </div>'; //Création du bouton de suppression
                    $(div).append(htmlBis); //add select
                } 
                $("#attr"+(x-1)).attr("onchange","selectVal("+(x-1)+")");
                if(ModeDouble){
                    $("#valider").attr("onclick","traitementQuestionsModeDouble("+x+")");
                } 
                else{ 
                    $("#valider").attr("onclick","traitementAffichage("+x+","+persoCache1+"),RetournementAutomatique()");
                } 
            } else alert('Vous avez assez de questions là! Ca va oui non mais Oh! Vous vous croyez où ?')
        });
    
        $(div).on("click", ".delete", function(e) {
            e.preventDefault();
            $(this).parent('div').remove();
            x--;
            if(ModeDouble){
                $("#valider").attr("onclick","traitementQuestionsModeDouble("+x+")");
            } 
            else { 
                $("#valider").attr("onclick","traitementAffichage("+x+","+persoCache1+"),RetournementAutomatique()");
            } 
        }); 
    });
} 



//Construit les questions de la bonne façon pour jouer au Mode Double Personnage Caché
function ConstruitQuestionModeDouble(){
    $("#Questions").empty();
    let html="<div>Est-ce que <select id='Predicat0'><option>...</option><option>au moins un des personnages</option><option>les deux personnages</option><option>aucun des personnages</option></select><select id='attr0' onchange='selectVal(0)'><option>...</option></select><select id='valeur0'></div>";
    $("#Questions").append(html);    
    for(let a in jsonObject.personnages[0].attributs){
        html="";
        html+="<option id='"+a+"'>"+a+"</option>";    
        $("#attr0").append(html);
    }
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
                        html+="<option id='value"+i+"."+cptValeur+"'>"+valeur+"</option>";
                        cptValeur++;
                    }
                } 
                else{
                    for(valeur of p.attributs[a]){
                        if(!value.includes(valeur)){ 
                            value.push(valeur);
                            html+="<option id='value"+i+"."+cptValeur+"'>"+valeur+"</option>";
                            cptValeur++;   
                        }
                    } 
                } 
            } 
        }  
    }
    $("#valeur"+i).append(html);
}



//Fonction appellé lorsque l'on veut afficher le résultat de "traitement"
function traitementAffichage(nbQuestions,indexVerif){
    document.getElementById("boutonDouble").className = "disabled";
    document.getElementById("boutonDouble").onclick = "";
    let reponse = traitement(nbQuestions, indexVerif);
    $("#reponse").empty();
    if(reponse){
        $("#reponse").append("<p class='reponseOuiNon'>Oui</p>");
    }
    else{
        $("#reponse").append("<p class='reponseOuiNon'>Non</p>");
    } 
    return reponse
} 





//Logique des questions : rend une valeur booléenne
function traitement(nbQuestions,indexVerif){
    SelectedAttributs=$("#attr0").val();
    SelectedValue=$("#valeur0").val();
    let reponse = TraitementUneQuestion(SelectedAttributs,SelectedValue,indexVerif);       
    if(nbQuestions > 1){ //pour plusieurs questions
        for(let i=1;i<nbQuestions;i++){
            SelectedAttributs=$("#attr"+i).val();
            SelectedValue=$("#valeur"+i).val();
            if(document.getElementById("c"+i).options[document.getElementById("c"+i).selectedIndex].value=="ET"){
                reponse=(reponse && TraitementUneQuestion(SelectedAttributs,SelectedValue,indexVerif));
            }   
            else{
                reponse=(reponse ||  TraitementUneQuestion(SelectedAttributs,SelectedValue,indexVerif));
            }         
        } 
    }
    return reponse;
} 






//Permet de traiter la valeur booléenne d'une unique question
function TraitementUneQuestion(SelectedAttributs,SelectedValue,indexVerif){
    reponse = false;
    for(let value of jsonObject.personnages[indexVerif].attributs[SelectedAttributs]){
        reponse=(reponse ||  (value==SelectedValue));
    }
    return reponse
}



function LancementFacile(){
    ModeFacile = true;
    document.getElementById("MODE FACILE").className = "disabled";
    document.getElementById("boutonDouble").className = "disabled";
    document.getElementById("MODE FACILE").onclick = "";
    document.getElementById("boutonDouble").onclick = "";
    nbEssais += 2;
    $("#NbEssai").empty();
    document.getElementById("NbEssai").append("Nombre de tentatives restantes: "+nbEssais);
    console.log("Activation mode facile");
    $("#ZoneQuestion").append('<input type="button" id="estimer" value="ESTIMER" onclick="Estimation()">');
} 




//Renvoi un tableau contenant tout les éléments pour lequel la valeur est fausse
function TabFaux(){
    let tab = []; 
    let max_questions = 10;
    let nbQuestions = 0;
    for(let i=0;i<max_questions;i++){
        if (document.getElementById("attr"+i) != null){
            nbQuestions += 1;
        } 
    }
    let reponseBonIndex = traitement(nbQuestions,persoCache1);
    console.log("reponseBonIndex: "+reponseBonIndex);
    for(let index in jsonObject.personnages){
        console.log(jsonObject.personnages[index].nom+": "+traitement(nbQuestions,index));
        if(traitement(nbQuestions,index) == !(reponseBonIndex)){
            if(!(tab.includes(index))){
                tab.push(index);
            }    
        } 
    } 
    console.log(tab);
    return tab;
} 



//Fonction qui retoruner automatiquement les images dans le mode facile
function RetournementAutomatique(){
    if(ModeFacile){ 
        let tabFaux = TabFaux();
        for(let value of tabFaux){
            if(document.getElementById(value).src != 'https://raw.githubusercontent.com/eric-gilles/Projet_Prog/main/images/back.jpg'){
                changeImage(value,jsonObject.personnages[value].image,'https://raw.githubusercontent.com/eric-gilles/Projet_Prog/main/images/back.jpg');
            } 
        } 
    } 
} 


//Fonction qui indique à l'avance le nombre de case qui seront retournés dans le mode facile
function Estimation(){
    if(ModeFacile){
        let tabFaux = TabFaux();
        let compteur = 0;
        for(let value of tabFaux){
            if(document.getElementById(value).src != 'https://raw.githubusercontent.com/eric-gilles/Projet_Prog/main/images/back.jpg'){
                compteur += 1;
            } 
        } 
        if ($("#NbRetire") != null){
            $("#NbRetire").remove();
        } 
        $("#ZoneQuestion").append("<p id='NbRetire'> Cette questions retirera "+compteur+" éléments</p>");
    } 
} 




//Logique des questions pour le Mode Double: rend une valeur booléenne
function traitementQuestionsModeDouble(nbQuestions){
    let SelectedAttributs=$("#attr0").val();
    let SelectedValue=$("#valeur0").val();
    let SelectedPredicat=$("#Predicat0").val();
    let reponse=TraitementUneQuestionModeDouble(SelectedPredicat,SelectedAttributs,SelectedValue);
    
    if(nbQuestions > 1){ //pour plusieurs questions
        for(let i=1;i<nbQuestions;i++){
            SelectedAttributs=$("#attr"+i).val();
            SelectedValue=$("#valeur"+i).val();
            SelectedPredicat=$("#Predicat"+i).val();
            if(document.getElementById("c"+i).options[document.getElementById("c"+i).selectedIndex].value=="ET"){
                reponse=(reponse && TraitementUneQuestionModeDouble(SelectedPredicat,SelectedAttributs,SelectedValue));
            }   
            else{
                reponse=(reponse ||  TraitementUneQuestionModeDouble(SelectedPredicat,SelectedAttributs,SelectedValue));
            }         
        } 
    }
    $("#reponse").empty();
    if(reponse){
        $("#reponse").append("VRAI");
    }
    else{
        $("#reponse").append("FALSE");
    } 
    
    console.log("réponse finale pour une question : "+reponse);
}  




//Traite une seule question en mode Double
function TraitementUneQuestionModeDouble(SelectedPredicat,SelectedAttributs,SelectedValue){
    let reponse=false;
    if(SelectedPredicat=="aucun des personnages"){
        reponse= (TraitementUneQuestion(SelectedAttributs,SelectedValue,persoCache1)==false) && (TraitementUneQuestion(SelectedAttributs,SelectedValue,persoCache2)==false);
    }
    else if(SelectedPredicat=="au moins un des personnages"){
        reponse= (TraitementUneQuestion(SelectedAttributs,SelectedValue,persoCache1)|| TraitementUneQuestion(SelectedAttributs,SelectedValue,persoCache2));
    }
    else{
        reponse= (TraitementUneQuestion(SelectedAttributs,SelectedValue,persoCache1) && TraitementUneQuestion(SelectedAttributs,SelectedValue,persoCache2));
    }
    return reponse;
} 




//active le mode double personnage (qui désactive le mode facile)
function LancementDoublePersonnages(){
    document.getElementById("MODE FACILE").className = "disabled";
    document.getElementById("MODE FACILE").onclick = "";
    document.getElementById("boutonDouble").className = "disabled";
    document.getElementById("boutonDouble").onclick = "";
    ChoixPersonnage2();
    console.log("Personnage caché 1 :"+persoCache1);
    console.log("Personnage caché 2 :"+persoCache2);
    ModeDouble=true;
    $("#valider").attr("onclick","traitementQuestionsModeDouble(1)");
    nbEssais=nbEssaisModeDouble;
    $("#NbEssai").empty();
    $("#NbEssai").append("Nombre de tentatives restantes: "+nbEssais);

    
}