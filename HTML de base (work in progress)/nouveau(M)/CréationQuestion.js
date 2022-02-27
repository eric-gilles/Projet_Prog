
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
            $(div).append('<div><select>\n\t<option>ET</option>\n\t<option>OU</option>\n</select>\n<br>Est-ce que <select id="attr"'+x+'">'+html+'</select><select id="value"'+x+'></select>?<a href="#" class="delete">supprimer</a></select></div>'); //add select
        } else alert('Vous avez assez de questions là! Ca va oui non mais Oh! Vous vous croyez où ?')
    });
}); 

    $(div).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });
    //prend toutes les valeurs possibles pour l'attribut selectionné :
    var value=[]; 
    var html="";
    $.getJSON("http://localhost:8888/test.json", function(data){
        for(let i=0;i<x;i++){ //on boucle sur le nombre de question que l'on a
            var Selected=$("#attr"+i).val(); 
            for(let p in data.personnages){
                for(let a in data.personnages[p].attributs){
                    if(Selected==a){
                        console.log("Tableau Vide? réponse ->")
                        console.log(value.length==0);
                        if(value.length==0){
                            
                            value.push(data.personnages[p].attributs[a]);
                            html+="<option id=valeur"+i+">"+data.personnages[p].attributs[a]+"</option>";
                        }
                        else{ 
                            console.log("testons: "); 
                            // for(let k in value){
                            //     console.log(k);
                            //     console.log(value[k]+"!="+data.personnages[p].attributs[a]+"?");
                                console.log("appartient pas?"+data.personnages[p].attributs[a]);
                                console.log(!value.includes(data.personnages[p].attributs[a]));
                                if(!value.includes(data.personnages[p].attributs[a])){ 
                                    console.log("j'ajoute: "+data.personnages[p].attributs[a]); 
                                    value.push(data.personnages[p].attributs[a]);
                                    html+="<option id=valeur"+i+">"+data.personnages[p].attributs[a]+"</option>";
                                }      
                            // }
                        } 
                    }
                    // console.log(value);
                    $("valeur"+i).append(html); 
                }  
            }
        }

    });
     
});

