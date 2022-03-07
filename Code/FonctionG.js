var nbAttribut=1;
function AjoutAttribut(){
    let html='<div id="div'+nbAttribut+'"><input type="text" id="attr'+nbAttribut+'"><input onclick="SupprAttribut('+nbAttribut+')" id="suppr'+nbAttribut+'" class="supprA" type="button" value="-"></br></div>';
    nbAttribut++;
    $(".listAttribut").append(html);
}
function SupprAttribut(indiceA){
    $("#div"+indiceA).remove();
    for(let i=indiceA+1;i<nbAttribut;i++){
        $("#attr"+i).attr("id","attr"+(i-1));
        $("#suppr"+i).attr("id","suppr"+(i-1));
        $("#div"+i).attr("id","div"+(i-1));
        $("#suppr"+i).attr("onclick","SupprAttribut("+(i-1)+")");
    }
    nbAttribut--;
}