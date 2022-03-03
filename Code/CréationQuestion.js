
var json2={
    "personnages": [
        { "son nom est": "Jeanne", "image":"avatar.jpg","attributs": { "ses cheveux sont": ["blonds"], "ses yeux sont": ["marrons"], "sa peau est": ["blanche"], "son sexe est": ["femme"], "ce personnage est": ["agé"] } },
        { "son nom est": "Margot", "image":"avatar.jpg","attributs": { "ses cheveux sont": ["rose", "bleu"], "ses yeux sont": ["noirs"], "sa peau est": ["blanche"], "son sexe est": ["femme"], "ce personnage est": ["jeune"] } },
        { "son nom est": "Robert", "image":"avatar.jpg","attributs": { "ses cheveux sont": ["blancs"], "ses yeux sont": ["marrons"], "sa peau est": ["noire"], "son sexe est": ["homme"], "ce personnage est": ["agé", "chauve"] } },
        { "son nom est": "George", "image":"avatar.jpg","attributs": { "ses cheveux sont": ["blonds"], "ses yeux sont": ["verts", "bleus"], "sa peau est": ["blanche"], "son sexe est": ["homme"], "ce personnage est": ["un enfant"] } }
    ]
};
var IndexPersonnage=ChoixPersonnage(json2);
var x = 1;
$(document).ready(function() {
    var max_questions = 10;
    var div = $("#Questions");
    var add_button = $("#addquestion");
    $.getJSON("http://localhost:8888/test.json", function(data){
        for(let a in data.personnages[0].attributs){
            let html1="";
            html1+="<option id="+a+">"+a+"</option>";
            
            $("#attr0").append(html1);
        }
    });

    $(add_button).click(function(e) {
        e.preventDefault();
        console.log(x);
        $.getJSON("http://localhost:8888/test.json", function(data){
            var html="";
            if (x < max_questions) {
                x++;
                    for(let a in data.personnages[0].attributs){
                        html+="<option id='"+a+"'>"+a+"</option>";
                    }
                    $(div).append('<div><select id="'+(x-1)+'">\n\t<option>ET</option>\n\t<option>OU</option>\n</select>\n<br>Est-ce que <select id="attr'+(x-1)+'" onchange="">'+html+'</select><select id="valeur'+(x-1)+'"></select>?<a href=# class=delete>supprimer</a></select></div>'); //add select     
                    $("#attr"+(x-1)).attr("onchange","selectVal("+(x-1)+")");
                    $("#valider").attr("onclick","traitement("+x+")");
            } else alert('Vous avez assez de questions là! Ca va oui non mais Oh! Vous vous croyez où ?')
        });
    });

    $(div).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
        $("#valider").attr("onclick","traitement("+x+")");
    }); 
});
function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function ChoixPersonnage(json){
    var nbrePerso = 0;
    for ( p of json.personnages){  
        nbrePerso+=1;   
    }    
    return randomInt(nbrePerso);
}
function selectVal(i){
    var value=[]; 
    var html="";
    var cptValeur=0;
    var Selected;
    $.getJSON("http://localhost:8888/test.json", function(data){
        $("#valeur"+i+">option").remove();
        Selected=$("#attr"+i).val();
        for(let p of data.personnages){
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
                        // console.log("testons: "); 
                        for(valeur of p.attributs[a]){
                            // console.log("Est ce que "+valeur+" est pas dans le tableau?");
                            // console.log(!value.includes(valeur));
                            if(!value.includes(valeur)){ 
                                // console.log("j'ajoute: "+valeur); 
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
    });
}
function getJSON(json){ //j'avais des problème sur le onclick pour avoir le json du coup j'ai fait ça (Romain tu te débrouilles pour m'envoyer le json :D ) c'était globalement les mêmes problèmes que pour choixPersonnage
    return json;
} 
//ça fonctionne à peu près, c'est bien mais pas ouf quand même
function traitement(nbQuestions){
    console.log(IndexPersonnage);
    let reponse=false;
    json=getJSON(json2);
    if(nbQuestions==1){ //pour une question
    SelectedAttributs=$("#attr0").val();
    SelectedValue=$("#valeur0").val();
        for(let p in json.personnages){
            if(p==IndexPersonnage){
                for(let a in json.personnages[p].attributs){
                    if(a==SelectedAttributs){
                        for(let value of json.personnages[p].attributs[a]){
                            reponse=reponse ||  (value==SelectedValue);   
                        } 
                    }
                } 
            }
        }
    console.log("réponse finale pour une question : "+reponse);
    /* VOUS VOYEZ CE TRUC BEN CA FONCTIONNE PAS !!
    if(reponse){
        $("reponse").append("VRAI");
    }
    else{
        $("reponse").append("FAUX");
    } */
         
    }
    else{ //pour plusieurs question 
        reponse=traitement2a2(0,1,json);
        let reponseInt=false;
        for(let i=2;i<nbQuestions;i++){
            SelectedAttributs=$("#attr"+i).val();
            SelectedValue=$("#valeur"+i).val();
            if($("#"+i).val()=="ET"){
                    for(let p in json.personnages){
                        if(p==IndexPersonnage){
                            for(let a in json.personnages[p].attributs){
                                if(a==SelectedAttributs){
                                    for(let value of json.personnages[p].attributs[a]){
                                        reponseInt=reponseInt ||  (value==SelectedValue);
                                    } 
                                reponse=reponse && reponseInt;
                                console.log("Le ET de plusieurs questions "+reponse);
                            }   
                        }
                    }
                }  
            }
            else{
                for(let p in json.personnages){
                    if(p==IndexPersonnage){
                        for(let a in json.personnages[p].attributs){
                            if(a==SelectedAttributs){
                                for(let value of json.personnages[p].attributs[a]){
                                    reponseInt=reponseInt ||  (value==SelectedValue);
                                } 
                            reponse=reponse ||  reponseInt;
                            console.log("Le OU de plusieurs questions "+reponse);
                            }
                        }
                    }
                }  
            }         
        }
        /* VOUS VOYEZ CE TRUC BEN CA FONCTIONNE TOUJOURS PAS !!
        if(reponse){
            $("reponse").append("VRAI");
        }
        else{
            $("reponse").append("FAUX");
        } */ 
    }
} 
//ça fonctionne pas mal ce truc en faite
function traitement2a2(indice1,indice2,json){
    let SelectedAttributs1=$("#attr"+indice1).val();
    let SelectedValue1=$("#valeur"+indice1).val();
    let SelectedAttributs2=$("#attr"+indice2).val();
    let SelectedValue2=$("#valeur"+indice2).val();
    let reponse=false;
    let reponseInt=false
        if($("#"+indice2).val()=="ET"){
            for(let p in json.personnages){
                if(p==IndexPersonnage){
                    for(let a in json.personnages[p].attributs){
                        if(a==SelectedAttributs){
                            for(let value of json.personnages[p].attributs[a]){
                                reponseInt=reponseInt ||  (value==SelectedValue1);   
                            } 
                        }
                    }
                    for(let a in json.personnages[p].attributs){
                        if(a==SelectedAttributs2){
                            for(let value of json.personnages[p].attributs[a]){
                                reponse=reponse ||  (value==SelectedValue2);                                    
                            }
                        }
                    }
                }
            }
        reponse=reponse&&reponseInt;        
    }
    else{
        for(let p in json.personnages){
            if(p==IndexPersonnage){
                for(let a in json.personnages[p].attributs){
                    if(a==SelectedAttributs1){
                        for(let value of json.personnages[p].attributs[a]){
                            reponseInt=reponseInt ||  (value==SelectedValue1);
                        }                           
                    }
                }
                for(let a in json.personnages[p].attributs){
                    if(a==SelectedAttributs2){
                        for(let value of json.personnages[p].attributs[a]){
                            reponseInt=reponseInt ||  (value==SelectedValue1);
                        }
                    }
                }
            }
        }
        reponse=reponse||reponseInt;
    }
    return reponse
}