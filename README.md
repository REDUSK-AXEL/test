# IA Frigo Recettes

Une application qui prend en photo le contenu du réfrigérateur et propose des idées de recettes adaptées aux ingrédients détectés.

## Statut du projet

Ce dépôt décrit le concept et la feuille de route. Aucune application téléchargeable n’est encore disponible.

## Comment l’utiliser aujourd’hui

Pour l’instant, il n’y a rien à installer. Vous pouvez toutefois :

- Utiliser ce document comme **brief** pour un prototype.
- Lancer un **MVP** en suivant les étapes ci-dessous.

## Objectif

Simplifier la planification des repas et réduire le gaspillage alimentaire en suggérant des recettes à partir des ingrédients disponibles.

## Fonctionnalités clés (MVP)

- **Scan du frigo** : prise de photo depuis l’application.
- **Détection d’ingrédients** : reconnaissance d’objets et de produits alimentaires.
- **Suggestions de recettes** : propositions adaptées aux ingrédients détectés.
- **Filtres** : préférences alimentaires (végétarien, sans gluten, etc.).
- **Liste de courses** : ingrédients manquants pour une recette donnée.

## Parcours utilisateur (exemple)

1. L’utilisateur ouvre l’application et prend une photo de son frigo.
2. L’IA détecte les ingrédients et affiche la liste reconnue.
3. L’utilisateur confirme/édite la liste.
4. L’application propose des recettes classées par pertinence.
5. L’utilisateur sélectionne une recette et obtient les étapes de préparation.

## Pistes techniques

- **Vision** : modèle de détection d’objets (ex. YOLO, Detectron2).
- **Backend** : service qui mappe les ingrédients à des recettes.
- **Frontend** : mobile (iOS/Android) ou web responsive.
- **Données recettes** : API publique ou base interne.

## Prochaines étapes

- Définir le scope du MVP (app mobile ou web).
- Prototyper la reconnaissance d’ingrédients.
- Tester l’expérience utilisateur avec un petit panel.

## Idée de roadmap MVP (téléchargeable ensuite)

1. **MVP Web** : upload d’une photo + détection d’ingrédients + suggestions.
2. **Validation** : tests utilisateurs + correction des erreurs de détection.
3. **App mobile** : caméra intégrée + compte utilisateur.
4. **Publication** : store iOS/Android ou PWA installable.

## Exemple de stack minimale (pour un prototype rapide)

- **Front** : Next.js ou React + composant upload photo.
- **Backend** : API Python (FastAPI) pour l’inférence.
- **Vision** : modèle pré‑entraîné (YOLOv8) adapté aux aliments.
- **Recettes** : base interne ou API publique.
