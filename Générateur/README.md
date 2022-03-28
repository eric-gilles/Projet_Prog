# Projet_Prog
Générateur pour le jeu Qui-est-ce ? réalisé par le groupe S en L2 Informatique en 2022
Membres du groupe :
    - Éric GILLES (GrA)
    - Lisa SAVY (GrA)
    - Romain GALLERNE (GrA - CMI)
    - Morgan NAVEL (GrA - CMI)

Pour installer les fichiers :
    Récupérer le fichier .zip sur Moodle dans la zone de dépot du rendu du 28 mars,
    Extraire le fichier.

Pour lancer le générateur : 
    >   Ouvrir le fichier "Generateur.html" (qui se trouve dans le sous-dossier "Générateur") dans une page Internet.

Quelques explications sur le logiciel :
    >   Les images :
        Les images que vous utiliserez pour votre grille de jeu pourront être importées de deux manières :
            - soit via un URL (adresse d'une image en ligne),
            - soit en local en choisissant dans votre ordinateur l'image à importer.
        Nous vous conseillons de choisir des images au format "carré" sinon elles risquent d'être compressées. Si l'image ne vous convient plus, il n'est pas possible d'en changer quand elle est déjà importée, il vous faudra valider le personnage puis le supprimer pour le récréer.

    >   Le format des questions :
        Dans notre jeu Qui-est-ce? nous avons décidé d'utiliser un format fixe de question :
            - "Est-ce que ce personnage -attribut sélectionné- -valeur sélectionnée-?" (en mode normal),
            - "Est-ce que -aucun personnage/au moins un des personnage/les deux personnages- -attribut sélectionné- -valeur sélectionnée-?" (en mode double).
        Il vous est donc conseillé de prendre en compte ceci pour pouvoir créer des questions cohérentes.
        Voici quelques exemples tirés de nos JSON de test fournis auparavant pour vous aider à visualiser :
            - "Est-ce que au moins un des personnages |a/ont les yeux| |bleus|?"
            - "Est-ce que au moins un des personnages |a/ont les cheveux| |bruns|?"

    >   Les attributs :
        Tous les personnages auront les même paramètres qui doivent être entrés lors de la création du premier personnage, quand celui-ci sera créé les attributs seront figés (donc on ne pourra pas les modifier). La zone de saisie des attributs se situe sur la droite de la page en-dessous du logo. Il ne peut pas y avoir plus de 16 attributs et chaque attribut ne peuvent pas faire plus de 23 caractères. (choix purement abrbitraire afin d'imposer une limite au joueur)

    >   Les valeurs :
        Chaque attribut peut ou non avoir une valeur, voire même plusieurs. La zone de saisie des valeurs est en dessous du rendu des images, pour chaque zone de saisie de valeur l'attribut associé est affiché avant. Si vous souhaitez mettre plusieurs valeurs pour un attribut, il vous suffit de marquer vos différentes valeurs en les séparant par une virgule (exemple : |un uniforme,un katana| (il peut y avoir des espaces entre les mots composant une valeur mais pas après la virgule les séparant)).

    >   Créer et supprimer un personnage :
        Pour créer un personnage, il faut qu'il ait un nom, des valeurs d'attributs capable de l'identifier et qui le rende unique et il faut avoir importer une image. Si c'est le premier personnage qui est en train d'être créé, il faut que tous ses attributs aient une valeur non nulle. Il vous suffira en suite de cliquer sur le bouton "Créer le Personnage".
        Si une des conditions ci-dessus n'est pas respectée, une pop-up apparaîtra sur la page pour vous prévenir.
        Si tout va bien, le personnage se créera sans encombre.
        Tout personnage validé (où la création a bien réussi à se faire) pourra être supprimé en cliquant sur le petit logo de poubelle juste à côté de son nom en-dessous de l'image. ATTENTION : un personnage ne peut pas être modifier!

    >   Télécharger la grille : 
        Quand votre grille de personnages vous convient, il vous suffit de cliquer sur le bouton "TELECHARGER JSON" et votre grille au format .json sera téléchargée.