var x = 1;
$(document).ready(function() {
    
    var max_questions = 10;
    var div = $("#Questions");
    var add_button = $("#addquestion");
    var nbAttr=0;
    var x = 1;
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
            $(div).append('<div><select>\n\t<option>ET</option>\n\t<option>OU</option>\n</select>\n<br>Est-ce que <select id="attr"'+x+'" onchange="selectVal()">'+html+'</select><select id="value"'+x+'></select>?<a href="#" class="delete">supprimer</a></select></div>'); //add select
        } else alert('Vous avez assez de questions là! Ca va oui non mais Oh! Vous vous croyez où ?')
    });
}); 

    $(div).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });   
});
function selectVal(){ 
    var value=[]; 
    var html="";
    var cptValeur=0;
    var Selected;
    $.getJSON("http://localhost:8888/test.json", function(data){
        for(let i=0;i<x;i++){ //on boucle sur le nombre de question que l'on a
            $("#valeur"+i+">option").remove();
            Selected=$("#attr"+i).val(); 
            for(let p of data.personnages){
                for(let a in p.attributs){
                    if(Selected==a){ //si l'attribut selectionné correspond alors...
                        
                        if(value.length==0){ //si le tableau est vide alors je rentre la valeur
                            for(valeur of p.attributs[a]){
                                
                                value.push(valeur);
                                html+="<option id=valeur"+i+">"+valeur+"</option>";
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
                                    html+="<option id=valeur"+cptValeur+">"+valeur+"</option>";
                                    cptValeur++;
                                }
                            } 
                        } 
                    } 
                }  
            }
            $("#valeur"+i).append(html);
        }
    });
}

