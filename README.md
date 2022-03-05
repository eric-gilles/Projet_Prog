# Projet_Prog
Jeu Qui-est-ce ? réalisé par le groupe S en L2 Informatique en 2022

Pour installer les fichiers :
    Récupérer le fichier .zip sur Moodle dans la zone de dépot du rendu du 6 mars;
    Extraire le fichier;

Pour lancer le jeu : 
    Ouvrir le fichier "QuiEstCe.html" (qui se trouve dans le sous-dossier "Code") dans une page Internet;
    Cliquer sur le bouton "Parcourir" et choisir un des trois fichiers json à disposition (json1.json, json2.json et json3.json);
    Cliquer sur le bouton "Importer" et le jeu sera opérationnel;

Quelques explications sur le jeu : 
    > La logique des questions et la suivante :
        Il n'y a pas de priorité du "ET" sur le "OU", la logique se fait dans l'ordre des questions.
        Exemple : ((Est-ce que ce personnage a les cheveux blonds? OU Est-ce que ce personnage a les yeux bleus?) ET Est-ce que ce personnage est une femme?)
            -> Les parenthèses indiquent l'ordre.

    > Le bouton "MODE FACILE" permet d'activer le mode Facile, c'est-à-dire :
        - affichage du nombre de cases à retourner en fonction de la question quand le joueur clique sur le bouton "ESTIMER",
        - cases qui se retournent automatiquement quand le joueur clique sur le bouton "VALIDER");
    Remarques : Ce mode peut être activé à n'importe quel moment mais il ne peut pas être activé quand le mode Double Personnage est déjà actif.

    > Le bouton "MODE DOUBLE PERSONNAGE" permet d'activer le mode Double Personnage, c'est-à-dire : 
        - le logiciel choisit un deuxième personnage au hasard que le joueur va choisir,
        - les réponses aux questions du joueur prennent en compte les deux personnages, même si un des deux a déjà été trouvé,
        - le nombre de tentatives pour trouver les personnages sont doublées (6 tentatives au lieu de 3);
    Remarques : Ce mode ne peut être activé qu'au tout début de la partie : si une première question a déjà été posée, ce mode sera grisé. Ce mode n'est pas compatible avec le mode Facile.
