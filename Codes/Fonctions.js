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

function ligneCol(nombre) {
    let v1 = 1,
        v2 = 1;
    let html = "<table>";
    while (v1 * v2 < nombre) {
        if ((v1 + 1) * (v1) < v1 * (v2 + 1)) {
            v1 += 1;
        } else { v2 += 1 }
    }
    let max = Math.max(v1, v2);
    let min = Math.min(v1, v2);
    let compteur = 0;
    console.log([max, min]);
    for (let index = 0; index < min; index++) {
        html += "<tr>";
        for (let index = 0; index < max; index++) {
            if (compteur < nombre) {
                html += "<td><img src='avatar.jpg'></td>";
                compteur++;
            }
        }
        html += "</tr>";
    }
    $("#Personnages").append(html);
}


let txt = '{ "personnages": [' +
    '{ "nom": "Jeanne", "attributs": { "ses cheveux sont": ["blonds"], "ses yeux sont": ["marrons"], "sa peau est": ["blanche"], "son sexe est": ["femme"], "ce personnage est": ["agé"] } },' +
    '{ "nom": "Margot", "attributs": { "ses cheveux sont": ["rose", "bleu"], "ses yeux sont": ["noirs"], "sa peau est": ["blanche"], "son sexe est": ["femme"], "ce personnage est": ["jeune"] } },' +
    '{ "nom": "Robert", "attributs": { "ses cheveux sont": ["blancs"], "ses yeux sont": ["marrons"], "sa peau est": ["noir"], "son sexe est": ["homme"], "ce personnage est": ["agé", "chauve"] } },' +
    '{ "nom": "George", "attributs": { "ses cheveux sont": ["blonds"], "ses yeux sont": ["verts", "bleus"], "sa peau est": ["blanche"], "son sexe est": ["homme"], "ce personnage est": ["un enfant"] }}]}';

let texte = fs.readFileSync('./test.json', 'utf8');
json = JSON.parse(texte);
console.log(json);
let html = "<select id='attr1'>";
console.log(json.personnages);
for (o of json.personnages) {
    html += "<option>" + o.nom + "</option>";
}
var res = 10;
html += "</select>";
document.getElementById("question1").innerHTML = html;
//$("#attr1").append(html);
