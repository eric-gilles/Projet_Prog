function genererChoix(){
    $.getJSON("http://localhost:8888/json", function(data) {
        let htmla, htmlv = "<select>";
        for (let a in data){
            htmla+="<option>"+a+"</option>";
        }
        htmla+="</select>";
        $("#attr1").append(htmla);
        for (let v of data){
            htmlv+="<option>"+v+"</option>";
        }
        htmlv+="</select>";
        $("#attr2").append(htmlv);
    });
}