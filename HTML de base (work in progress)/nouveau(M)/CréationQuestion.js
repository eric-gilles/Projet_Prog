var x = 1;
var PersonnageRandom=getNumber();
$(document).ready(function() {
    
    var max_questions = 10;
    var div = $("#Questions");
    var add_button = $("#addquestion");
    var nbAttr=0;
    var x = 1;
    var value=[]; 
    var cptValeur=0;
    var Selected;
    $.getJSON("http://localhost:8888/test.json", function(data){
        for(let a in data.personnages[0].attributs){
            let html1="";
            html1+="<option id="+a+">"+a+"</option>";
            nbAttr++;
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
                    html+="<option id="+a+">"+a+"</option>";
                    nbAttr++;
                }
            
            $(div).append('<div><select>\n\t<option>ET</option>\n\t<option>OU</option>\n</select>\n<br>Est-ce que <select id="attr"'+(x-1)+'" onchange="'+selectVal(x-1)+'">'+html+'</select><select id="value"'+(x-1)+'></select>?<a href="#" class="delete">supprimer</a></select></div>'); //add select     
        } else alert('Vous avez assez de questions là! Ca va oui non mais Oh! Vous vous croyez où ?')
    });
}); 

    $(div).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });
    $("#valider").on('click',function(){
        traitement(x);
    });   
});
//ça fonctionne mais par contre ne fonctionne pas si on ajoute des questions (elle n'affiche pas les valeurs de l'attributs selectionné) :'(
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
                            html+="<option id=value"+i+">"+valeur+"</option>";
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
                                html+="<option id=value"+cptValeur+">"+valeur+"</option>";
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
//tout ce qui a ici ne fonctionne pas ;
// function nbPersonnage(){
    
//     $.getJSON("http://localhost:8888/test.json", function(data){
//         return data.personnages.length;
//     });
     

       
// }
// function getNumber() {
//     var minNumber = 0; // le minimum
//     var maxNumber = nbPersonnage(); // le maximum
//     console.log(nbPersonnage());
//     var randomnumber = Math.floor(Math.random() * (maxNumber -minNumber+ 1) + minNumber); // la fonction magique
    
//     return randomnumber;
// }
// function traitement(nbQuestions){
//     let reponse=false;
//     if(nbQuestions==1){
//         SelectedAttributs=$("attr0").val();
//         SelectedValue=$("valeur0").val();
//         $.getJSON("http://localhost:8888/test.json", function(data){
//             for(let p in data.personnages){
//                 console.log("allo");
//                 console.log(p==PersonnageRandom+"allo");
//                 if(p==PersonnageRandom){
//                     for(let a in data.personnages[p].attributs){
//                         if(data.personnages[p].attributs[a]==SelectedAttributs){
//                             reponse=data.personnages[p].attributs[a].includes(SelectedValue);
//                             return null;  
//                         } 
//                     }
//                 }
//             }  
//         });
//         $("#reponse").append(reponse); 
//     } 
// } 


