# IA Frigo Recettes

Une application qui prend en photo le contenu du réfrigérateur et propose des idées de recettes adaptées aux ingrédients détectés.

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
