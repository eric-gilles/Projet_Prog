$(document).ready(function() {
    var max_questions = 10;
    var div = $("#Questions");
    var add_button = $("#addquestion");

    var x = 1;
    $(add_button).click(function(e) {
        e.preventDefault();
        if (x < max_questions) {
            x++;
            $(div).append('<div><select>\n\t<option>ET</option>\n\t<option>OU</option>\n</select>\n<br><select id="attr"'+nbQuestion+'"></select><select id="attr2"></select><a href="#" class="delete">supprimer</a></select></div>'); //add select
        } else alert('Vous avez assez de questions là! Ca va oui non mais Oh! Vous vous croyez où ?')
    });

    $(div).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })
});
